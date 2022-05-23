import { execSync } from 'child_process'

import { Command, Option } from 'commander'

import branches from './branches.js'


const runCommand = (command) =>
    execSync(`yarn ${command}`, { stdio: 'inherit' })


const program = new Command()
program.command('serve')
    .description('запустить сервер для разработки')
    .action(() =>
        runCommand('webpack serve --mode development --env branch=super'))
program.command('build')
    .description('собрать проект для отправки пользователям')
    .addOption(new Option(
        '--all', 'все МРФы и премиум-версия')
        .conflicts([ 'branches', 'super', 'branch' ]))
    .addOption(new Option(
        '--branches', 'все МРФы')
        .conflicts([ 'all', 'super', 'branch' ]))
    .addOption(new Option(
        '--super', 'премиум-версия')
        .conflicts([ 'all', 'branches', 'branch' ]))
    .addOption(new Option(
        '--branch <branch>', 'выбранный МРФ ')
        .choices(branches)
        .conflicts([ 'all', 'branches', 'super' ]))
    .action((args) => {

      const possibleTargets = {
        all: [ ...branches, 'super' ],
        branches: branches,
        super: [ 'super' ],
        branch: [ args.branch ]
      }

      const targets = Object.entries(possibleTargets)
          .reduce((acc, [ option, targets ]) =>
              acc ?? (args[option] ? targets : undefined), undefined)

      if (targets === undefined) {
        console.error('не указаны цели сборки')
        return
      }

      targets.forEach((target) =>
          runCommand(`webpack --mode production \
              --env branch=${target}`))
    })
program .parse()
