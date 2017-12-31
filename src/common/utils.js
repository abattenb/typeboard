// TODO: Error checking and all that...

// Accepts one or two parameters:
//  log(message)
//  log(message, type)
// Where type can be "ok, warn, fail" or any other string
export const log = (...args) => {
  /* eslint-disable no-console */
  /* eslint-disable no-param-reassign */

  let type = '';
  const message = args[0];
  if (args.length === 2) {
    type = args[1].toLowerCase();
  }
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

// Prints the Typeboard logo
export const logo = () => {
  /* eslint-disable no-console */
  console.log(`%c                    /)              /)
  _/_      __   _  (/_ __ __  __  _(/ 
  (__(_/_ /_)__(/_/_) (_)(_(_/ (_(_(_ 
    .-/.-/                            
  (_/(_/                             `, 'color: white');
};
