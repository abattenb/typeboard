
export const log = (message, type) => {
  /* eslint-disable no-console */
  /* eslint-disable no-param-reassign */
  type = type.toLowerCase();
  switch (type) {
    case 'ok':
      console.log('%c[ OK ]', 'color: lime', message);
      break;
    case 'warn':
      console.log('%c[WARN]', 'color: Gold', message);
      break;
    case 'fail':
      console.log('%c[FAIL]', 'color: OrangeRed', message);
      break;
    default:
      console.log(message);
  }
};

export const logo = () => {
  /* eslint-disable no-console */
  console.log(`%c                  /)              /)'
  _/_      __   _  (/_ __ __  __  _(/ 
  (__(_/_ /_)__(/_/_) (_)(_(_/ (_(_(_ 
    .-/.-/                            
  (_/(_/                             `, 'color: white');
};
