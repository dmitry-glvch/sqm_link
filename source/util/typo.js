import Typograf from 'typograf'


const typograf = new Typograf({
  locale: [ 'ru', 'en-US' ]
})


export default (s) => typograf.execute(s)
