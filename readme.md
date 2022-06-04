# SQM-Link

## Начало работы

Для работы с проектом требутся установленный [_Node.js_](https://nodejs.org/en/download/) и [_Yarn_](https://classic.yarnpkg.com/lang/en/docs/install/)

__Установка зависимостей__

```sh
yarn
```


__Сборка проекта__

```sh
yarn build:all
```

Результат сборки помещается в каталог _`build`_

Подробнее о возможных вариантах сборки в разделе [_процесс-сборки_](#buildjs)


__Запуск сервера для разработки__

```sh
yarn serve
```



## Процесс сборки

### Просто

1. Скрипт из _`package.json`_ вызывает [_`build.js`_](#buildjs), указывая под какие МРФ осуществляется сборка
2. [_`build.js`_](#buildjs) для каждого выбранного МРФ вызвает webpack, передавая МРФ через [`--env`](https://webpack.js.org/api/cli/#environment-options)
3. webpack препроцессирует _`source/config.js`_, предоставляя конфигурацию для сборки под выбранный МРФ
4. webpack препроцессирует импортируемые страницами файлы из _`asset/config`_, оставляя в клиентском коде только сведения относящиеся к выбранному МРФ
5. объединяет JS-модули в один файл, отдельно извлекает стили в CSS-файл и помещает их с сгенерированным _`index.html`_ в _`build/<выбранный МРФ>`_


### Не просто

#### Почему так

РТК отказал в предоставлении сервера, указав следюущую модель распространения и доставки: собранная версия сайта отправляется самим РТК в МРФ и размещается в сетевой папке, откуда открывается пользователями

Большое количество контента, скорее всего, будет регулярно редактироваться (в т. ч. не-разработчиками), лучше всего разместить в отдельных конфигурационных файлах

Отсутствие хотя бы сервера статики вынуждает включать весь контент в сборку. Использование динамической загрузки из файловой системы (пусть и с сетевой папки) затрудняется enforcememt'ом CORS со стороны браузеров, настройки которых в РТК не регулируются пользователями

Включение в сборку таких сведений как логины/пароли и других конфиденциальный данных, специфичных для каждого отдельного МРФ, вынуждает делать отдельную сборку для каждого МРФ так, чтобы результат сборки не содержал данные других МРФ

Также РТК запросил сборку [премиум-версии](#словарик), позволяющую осуществлять навигацию между МРФ

При этом большая часть компонентов (специфичными, в основном, являются только данные) проекта являются общими для всех МРФ

Параметризированная сборка при перечисленных обстоятельствах кажется единственным возможным решением

> Предложения по переходу на готовые решения, позволяющие выполнять аналогичную сборку, приветствуются


#### webpack

Сборкой занимается webpack, однако webpack 5 не поддерживает несколько [output'ов](https://webpack.js.org/configuration/output/), что вынуждает каким-либо образом [запускать](#buildjs) его несколько раз, передавая в конфигурацию webpack информацию о том, какая сборка требуется

Список МРФ, под которые осуществляется сборка, расположен в _`branches.js`_

Для запроса [премиум-версии](#словарик) webpack'у в качествве выбранного МРФ передаётся `super`

Также в _`webpack.config.js`_ заданы [алиасы](https://webpack.js.org/configuration/resolve/#resolvealias), позволяющие писать для импорты модулей, не зависящие от их взаимного расположения 

- [документация webpack](https://webpack.js.org/concepts/)
- [справка по конфигурации webpack](https://webpack.js.org/configuration/)


#### _`build.js`_

Самописный примитивнейший негибкий таскраннер. Отвечает за запуск webpack и передачу ему через [`--env`](https://webpack.js.org/api/cli/#environment-options) информации о требующейся сборке

`node build.js --help` (`yarn run help`) - выводит справку по возможностям запуска

`node build.js serve` (`yarn serve`) - запускает сервер для разработки (собирается версия со всеми МРФ)

`node build.js build --help` - справка по возможностям запуска сборки

`node build.js build --branch <branch>` (`yarn build --branch <branch>`) - сборка под указанный МРФ

`node build.js build --super` (`yarn build:super`) - сборка [премиум-версии](#словарик)

`node build.js build --branches` (`yarn build:branches`) - сборки под каждый МРФ

`node build.js build --all` (`yarn build:all`) - сборки под каждый МРФ и [премиум-версия](#словарик)


#### Передача конфигурации в выполняемый код

> Приветствуются предложения по улучшению этого процесса

Для некоторых компонентов программ необходимо знать, какая сборка была запущена (например, для определения маршруртов по умолчанию, включения/отключения навигации между МРФ)

Подобные сведения устанавливаются в _`source/config.js`_ плагином [_DefinePlugin_](https://webpack.js.org/plugins/define-plugin/), значения подставляемых параметров указаываются в _`webpack.config.js`_


#### Изоляция МРФ-специфичных данных

> Приветствуются предложения по улучшению этого процесса

Для исключения из сборки данных не относящихся к ней МРФ необходимо использовать препроцессинг. Стандартный импорт не подходит, поскольку приводит к включению (пусть и неиспользуемых) данных в выполняемый код, предоставляемый клиентам

Для препроцессинга используется [_NormalModuleReplacementPlugin_](https://webpack.js.org/plugins/normal-module-replacement-plugin), подменяющий один ресурс (в данном случае - .js-файл) на альтернативный

Подмена происходит следующим образом: компонент импортирует пустой (до начала сборки) JS-модуль, который в процессе сборки заменяется модуль с таким же именем файла, расположенном в директории `./<branch>` относительно заменяемого модуля, где `<branch>` - указанный МРФ для сборки или (`super`)

[_NormalModuleReplacementPlugin_](https://webpack.js.org/plugins/normal-module-replacement-plugin) в своей конфигурации требует указывать регулярное выражение для определения заменяемых модулей, что может быть неудобно в сравнении с перечислением названий модулей, поэтому _`webpack-helpers.js`_ содержит функцию `replacements` для генерации замен вида `config/<module>/<module>.js` -> `config/<module>/<branch>/<module>.js` на основании переданных `<branch>` (МРФ) и `<module>` - название модуля (например, _`systems`_ - для списка ссылок на инфосистемы)

__Пример__ подмены модуля:

_`config/systems/systems.js`_ при сборке для МРФ Северо-Запад заменится на `config/systems/north-west/systems.js`


##### Организация конфигурационных файлов

Из написанного выше следует требование к организации файлов конфигурации модуля _`<module>`_ следующим образом:

```
config
 ┗ <module>
    ┣ north-west
    ┃ ┗ <module>.js
    ┣ volga
    ┃ ┗ <module>.js
    ┣ <другие МРФ>
    ┃ ┗ <module>.js
    ┗ super
      ┗ <module>.js
```

_`<module>.js`_ является стандартным ES модулем и может содержать runtime код или статические импорты

_`<module>.js`_ в _`super`_, как правило, содержит импорты _`<module>.js`_ других МРФ

> Наличие файла _`config/<module>/module.js`_ не обязательно



## Файловая структура проекта

```
sqm-link
 ┣ asset
 ┣ source
 ┣ .gitignore
 ┣ branches.js
 ┣ build.js
 ┣ package.json
 ┣ readme.md
 ┣ webpack-helpers.js
 ┣ webpack.config.js
 ┗ yarn.lock
```

|   |   |
| - | - |
| [_`asset`_](#asset) | Статические ассеты (шрифты, изображения), файлы конфигурации приложения |
| [_`source`_](#source) | Исходный код (логика работы приложения, компоненты, стили) |
| _`.gitignore`_ | Указывает, какие файлы не должны отслеживаться [_Git_](https://git-scm.com/) |
| _`branches.js`_ | Cписок МРФ, под которые доступна сборка |
| _`build.js`_ | Велосипед-таскраннер с интерфейсом командной строки для запуска [_webpack_](https://webpack.js.org/) при [сборке](#процесс-сборки) нескольких версий проекта под разные МРФ |
| _`package.json`_ | Основная информация о проекте, список зависимостей |
| _`readme.md`_ | Читаешь его прямо сейчас |
| _`webpack-helpers.js`_ | Генераторы частей конфигурации webpack |
| _`webpack.config.js`_ | Конфигурация [_webpack_](https://webpack.js.org/) для сборки проекта под МРФ, переданный через параметр [`--env`](https://webpack.js.org/api/cli/#environment-options) |
| _`yarn.lock`_ | Сведения обо всех транзитивных зависимостях, включая версии пакетов, с которыми проект гарантированно собирается |

__*`yarn.lock`* не удалять, не редактировать руками__

> Предложения по замене непотребства _`build.js`_ приветствуются

`webpack.config.js` cодержит:
- [пути разрешения импортов](https://webpack.js.org/configuration/resolve/)
- [правила обработки](https://webpack.js.org/configuration/module/#modulerules) попадающих в сборку файлов
- конфигурацию [сервера для разработки](https://webpack.js.org/configuration/dev-server/)
- передачу части конфигурации в клиентский код ([_DefinePlugin_](https://webpack.js.org/plugins/define-plugin/))
- предоставление клиентскому коду доступа к данным только выбранного МРФ ([_NormalModuleReplacementPlugin_](https://webpack.js.org/plugins/normal-module-replacement-plugin/))

Подробнее о конфигурировании в [документации webpack](https://webpack.js.org/configuration/)

Подробнее о процессе сборки [тут](#процесс-сборки)


### _`source`_

```
source
 ┣ component
 ┃ ┗ app.vue
 ┣ page
 ┣ style
 ┣ util
 ┣ config.js
 ┣ main.js
 ┣ page-template.html
 ┗ router.js
```

|   |   |
| - | - |
| _`component`_ | Компоненты, используемые для построения страниц (разделены по соответствующим каталогам), элементы пользовательского интерфейса |
| _`app.vue`_ | Компонент-шаблон страниц |
| _`page`_ | Компоненты страниц (Контакты, Главная, Инфосистемы и пр.) |
| _`style`_ | Общие стили, константы (цветовая палитра, используемые шрифты, используемые в компонентах цвета) |
| _`util`_ | Вспомогательные средства, не относящиеся к конкретному компоненту/страницу |
| _`config.js`_ | [Получает](#передача-конфигурации-в-выполняемый-код) частичную информацию о конфигурации сборки (маршрут по умолчанию, поддержка навигации между МРФ, выбранный МРФ) |
| _`main.js`_ | Отвечает за [создание _Vue_ инстанса](https://vuejs.org/guide/essentials/application.html), его монтирование и подключение роутинга |
| _`page-template.html`_ | Шаблон HTML-документа, в который будет [монтироваться](https://vuejs.org/guide/essentials/application.html#mounting-the-app) приложение (в качестве содрежимого _`div`_ с id `app-mountpoint`) |
| _`router.js`_ | Создаёт инстанс [_vue-router_](https://router.vuejs.org/), включает описание доступных для навигации машрутов |


### _`asset`_

```
asset
 ┣ config
 ┣ font
 ┗ image
```

|   |   |
| - | - |
| _`config`_ | Используемые приложением данные МРФ (разбиты по каталогам по регионам) |
| _`font`_ | Шрифты |
| _`image`_ | Изображения |


#### _`config`_

- шаблоны форм и описание элементов ввода параметров форм
- логины/пароли для страницы конфигуратора
- ссылки на инфосистемы

__См. [организация конфигурационных файлов](#организация-конфигурационных-файлов)__



## Словарик

- __РТК__ - Ростелеком
- __МРФ__ - Макрорегиональный филиал (наибольшее подразделение РТК по географическому признаку)
- __премиум-версия__ - версия сборки проекта, содержащей информацию со всех МРФ и позволяющей навигацию между МРФ


## TODO

подумать насчёт создания маршрутов от конфига (запрет ходить в другие МРФ) в routes.js 

сконфигурировать eslint
