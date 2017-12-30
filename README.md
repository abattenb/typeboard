# Typeboard

> A tool for comparing typefaces and glyphs.

[https://abattenb.github.io/typeboard](https://abattenb.github.io/typeboard/)

## Features

* Compare typeface glyphs
* Compare relative widths of typefaces
* See type set in and against specific colors

## Future Goals

* Favorite typefaces
* Manage typeface collections
* Favorite colors
* Share type and color combinations
* User login

## FAQ

### Why did you make this?
I needed a fast way to compare glyphs between typefaces.

### Why are colors' opacity set to 0.996?
It's a hack to make sure the inverse text selection background is not overwritten by Chrome defaults.
At an opacity of 1, Chrome applies it's own more opaque value, but a custome value of 255/266 works.

## Your random color generator made an unreadable combination.
That mean's it's working! "Safe" color generators often end up producing very samey palettes.
You just might find your new favorite combination, have fun with it!

## Build Guide

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### Local API Keys

If you want to run a local instance of Typeboard, you're going to need to add
your own local api keys for Google Fonts API.

* Go to [Google API keys](https://console.developers.google.com/apis/) and apply for a Google Fonts API key
* Create a local key with no restrictions
* __Add the path `config/localkeys.js` to your .gitignore__
* Create a new file `localkeys.js` in `config`
* **Add the path `config/localkeys.js` to your .gitignore (just checking..)**
* In `localkeys.js` add the follow code where 'XXXX-XXXX' is your local key:
``` javascript
module.exports = {
  'googleFont': 'XXXX-XXXX'
};
```
* Rebuild project
