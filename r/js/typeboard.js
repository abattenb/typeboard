/**
 * Type Board
 * Created by Andrew on 3/7/2017.
 *
 * So far IE11, Edge is out.
 */


//TODO: Google Analyics + Domain
//TODO: Handling async delays on ajax loads
//TODO: Test

//TODO: Favorites/Hide Type
//TODO: Browse type
//TODO: Generate CSS code
//TODO: Save random colors into palette
//TODO: Add 'unwind' function to get previous random
//TODO: Add direct color adjustment
//TODO: Figure out build tools

//TODO: Generate share url + read from url
//TODO: Add local typefaces to dropdown list?

//TODO: Header + paragraph
//TODO: Line-height adjustment



//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//TODO: RESTRICT GOOGLE API KEY BEFORE SHARING
//TODO: RESTRICT GOOGLE API KEY BEFORE SHARING
//TODO: RESTRICT GOOGLE API KEY BEFORE SHARING
//TODO: RESTRICT GOOGLE API KEY BEFORE SHARING
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

'use strict';
Typeboard = (function () {

    //Typeboard Variables

    var key = 'AIzaSyBbtvvx9DFYu8-CbOHPTaBOdQVT-P_zg9Q';
    var settings = {};
    var gFontsList = [];
    var charmap;

    //Used to both seed initial typefaces and prevent calling font APIs
    var localTypefaces = ['Arial', 'Times New Roman', 'Courier'];



    /* ==========================================================================
     Add / Remove Typefaces
     ========================================================================== */

    //http://stackoverflow.com/a/2117523
    var genColumnID = function(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    var loadCharMap = function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                charmap = xhttp.responseText;
            }
        }
        xhttp.open("GET", "../typeboard/charmap.html", true);
        xhttp.send();
    }

    //Generates an id and adds the typeface to the user settings
    var addTypeface = function (typeId, typeface) {
        //Generate a new typeface id
        //var typeId = genColumnID();

        //Creates a new typeface entry for settings
        var oldArray = settings.typeArray;
        var typeElement = JSON.parse('{"id": "' + typeId + '","typeface" : "' + typeface + '"}');
        oldArray.push(typeElement);

        //Updates settings
        updateSettings('typeArray', oldArray);


        //Creates a type control button on side pane
        var typeControl = document.createElement('li');
        typeControl.innerHTML = typeface;
        typeControl.setAttribute('type_id', typeId);
        typeControl.style.fontFamily = typeface;

        //Creates remove type button
        var removeType = document.createElement('button');
        removeType.innerHTML = 'X';
        removeType.setAttribute('remove_type_id', typeId);

        document.querySelector('#type_list ul').appendChild(typeControl).appendChild(removeType);

        //Adds type column to DOM
        addTypeColumn(typeId, typeface);

        //Adds type sample to DOM
        addSample(typeId, typeface);

        //Fetches typeface from Google fonts using WebFont
        getGFont(typeface);
    }

    //Fetches a typeface from Google Fonts with all weights and styles
    //Excludes local typefaces
    var getGFont = function(typeface){
        if(!localTypefaces.includes(typeface)){
            var completeFamily = typeface;
            completeFamily = completeFamily + ':100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i';

            WebFont.load({
                google: {
                    families: [completeFamily]
                }
            });
        }

    }

    //Removes a typeface
    var removeTypeface = function (typeId){
        //Returns everything but the entry with the ID
        var newArray = settings.typeArray.filter(function (e){return e.id !== typeId});
        updateSettings('typeArray', newArray);

        //Remove from sample
        removeSample(typeId);

        //Remove from type column
        removeTypeColumn(typeId);

        //Remove button
        document.querySelector("#type_list [type_id='" + typeId + "']").remove();

    }

    //Adds a new Type Column to the DOM on the right
    var addTypeColumn = function(typeId, typeface) {
        var columnCharMap = document.createElement('div');
        columnCharMap.innerHTML = charmap;
        columnCharMap.className = 'type_column';
        columnCharMap.getElementsByTagName('h2')[0].innerHTML = typeface;
        columnCharMap.setAttribute('type_id', typeId);
        columnCharMap.style.fontFamily = typeface;
        document.getElementById('char_board').appendChild(columnCharMap);
    }

    //Remove the parent column with class 'type_column'
    var removeTypeColumn = function(typeId) {
        document.querySelector("#char_board [type_id='" + typeId + "'").remove();
    }

    var addSample = function(typeId, typeface){
        var sampleElement = document.createElement('div');
        sampleElement.className = 'text_sample';
        sampleElement.setAttribute('type_id', typeId);
        sampleElement.style.fontFamily = typeface;
        sampleElement.innerHTML = settings.sampleText;
        document.querySelector('#text_board pre').appendChild(sampleElement);
    }

    var removeSample = function(typeId){
        document.querySelector("#text_board [type_id='" + typeId + "'").remove();
    }




    /* ==========================================================================
     Updates
     ========================================================================== */

    //Update Settings cookie with current settings
    var updateSettings = function(settingsKey, settingsValue){
        //Set dynamically new value based on key, if found
        if (settings.hasOwnProperty(settingsKey)) {
            settings[settingsKey] = settingsValue;
        }
        //Update cookie
        cookie.set("settings", JSON.stringify(settings), {expires: 100});
        //console.log(settings);
    }

    //Clears settings cookie
    var clearSettings = function() {
        //Clears type columns DOM
        document.querySelector('#char_board').innerHTML = '';
        //Clears samples
        document.querySelector('#text_board pre').innerHTML = '';
        //Clears type list
        document.querySelector('#type_list ul').innerHTML = '';
        //Clears settings
        settings = '';
        //clear cookie
        cookie.empty();
        //clear random color settings
        document.getElementsByTagName('body')[0].style = '';
        //Clears output CSS
        document.querySelector('#output').innerHTML = '';
    }

    //Changes CSS theme
    var updateTheme = function(newTheme){
        var group = document.getElementById('themeSelector').getElementsByTagName('optgroup');
        //Loop through optgroup tags
        for(var i = 0; i < group.length; i++) {
            var option = group[i].getElementsByTagName('option');
            //Remove all selected attributes on option tag
            for(var j = 0; j < option.length; j++){
                option[j].removeAttribute('selected');
            }
        }
        document.getElementsByTagName('body')[0].style = '';
        document.getElementsByTagName('body')[0].className = "theme " + newTheme;

        var themeOption = document.getElementById('themeSelector').querySelector('[value=' + newTheme + ']');
        if(themeOption){
            themeOption.setAttribute('selected', '')
        }
        updateSettings('theme', newTheme);
    }

    //Updates all the sample texts
    var updateSample = function(text_value){
        var sample_text = document.getElementsByClassName('text_sample');
        for(var i = 0; i < sample_text.length; i++){
            sample_text[i].innerHTML = text_value;
        }
        document.getElementById('text_input').innerHTML = text_value;
        updateSettings("sampleText", text_value);
    }


    //Toggles Pro Mode
    var togglePro = function (proChecked) {
        updatePro(proChecked);
        cookie.set("pro", proChecked, {expires: 100});
    }

    //Update Pro Mode checkbox
    var updatePro = function(pro) {
        //Sets the checkbox
        if (pro.toString() === 'true'){
            document.getElementById('togglePro').checked = true;
        } else {
            document.getElementById('togglePro').checked = false;
        }

        document.getElementsByTagName('body')[0].setAttribute("pro-mode", pro);

        //document.getElementById('type_board').style.setProperty('--font-style', italic, null);
    }


    //Reads italic toggle state boolean from checkbox
    var toggleItalics = function (italicChecked){
        italicChecked ? updateItalics('italic') : updateItalics('normal');
    }

    //Update italics, accepts 'italic' or 'normal'
    var updateItalics = function(italic) {
        //Sets the checkbox
        if (italic == 'normal'){
            document.getElementById('toggleItalics').checked = false;
        } else {
            document.getElementById('toggleItalics').checked = true;
        }
        document.getElementById('type_board').style.setProperty('--font-style', italic, null);
        updateSettings("italic", italic);
    }

    //Updates font size
    var updateSize = function(size){
        document.getElementById('type_board').style.setProperty('--column-font-size', size + 'rem', null);
        document.getElementById('output_size').innerHTML = String(size + 'rem');
        document.getElementById('fontSize').value = size;
        updateSettings("fontSize", size);
    }

    //Updates font weight, from 100 - 900
    var updateWeight = function(weight) {
        document.getElementById('type_board').style.setProperty('--font-weight', weight, null);
        document.getElementById('output_weight').innerHTML = String(weight);
        document.getElementById('fontWeight').value = weight;
        updateSettings("fontWeight", weight);
    }

    //Updates letter-spacing, from -10 to 10
    var updateLetterspacing = function(letterspacing) {
        document.getElementById('type_board').style.setProperty('--letter-spacing', letterspacing + 'rem', null);
        document.getElementById('output_letterspacing').innerHTML = String(letterspacing + 'rem');
        document.getElementById('letterSpacing').value = letterspacing;
        updateSettings("letterSpacing", letterspacing);
    }


    //Casts the three main colors with a random rgba
    //Recommend using 0.996 for alpha for text selection hack
    var randomColors = function(){
        var textColor = randomRGBA(0.996);
        var backgroundColor =  randomRGBA(0.996);
        var accentColor = randomRGBA(0.996);
        document.getElementsByTagName('body')[0].style.setProperty('--text-color', textColor, null);
        document.getElementsByTagName('body')[0].style.setProperty('--background-color', backgroundColor, null);
        document.getElementsByTagName('body')[0].style.setProperty('--accent-color', accentColor, null);
    }

    //Accepts an opacity value
    //Returns a random RGBA formatted for CSS
    var randomRGBA = function(opacity){
        var red = Math.floor(Math.random() * 257);
        var green = Math.floor(Math.random() * 257);
        var blue = Math.floor(Math.random() * 257);
        return "rgba(" + red + ", " + green + ", " + blue + ", " + opacity + ")";
    }

    var randomTypeface = function() {
        var random = Math.floor(Math.random() * (gFontsList.length + 1 ));
        addTypeface(genColumnID(),gFontsList[random].family);
    }


    //Gets the current type list through Google Fonts API
    var loadGFontsList = function(callback){
        var url = "https://www.googleapis.com/webfonts/v1/webfonts?key=" + key;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if(this.status == 200) {
                    gFontsList = JSON.parse(xhttp.responseText).items;
                    console.log(gFontsList.length + " Google fonts loaded.");
                    callback(true);
                } else {
                    console.log("STATUS CODE: " + this.status);
                    callback(false);
                }
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();
    };

    //Toggles open and close the mobile menu
    var toggleMenu = function () {
        var toggleClass = document.getElementsByTagName('aside')[0].className;
        document.getElementsByTagName('aside')[0].className  = (toggleClass == 'open') ? '' : 'open';
        document.getElementsByTagName('aside')[0].scrollTop = 0;
    }


    //Loads settings from local cookie if exists
    //Inits app data with settings
    var loadSettings = function(){
        //If no settings cookie, create with default
        if(cookie("settings") == '' || cookie("settings") == {} || cookie("settings") == null) {
            settings = {
                "typeArray" : [],
                "theme" : "theme_black_white",
                "fontSize" : "1",
                "fontWeight" : "400",
                "letterSpacing" : "0",
                "italic" : "normal",
                "sampleText" : "Sphinx of black quartz, judge my vow."
            };
            //Seeds with Arial, Times New Roman, Courier
            for(var i = 0; i < localTypefaces.length; i++){
                addTypeface(genColumnID(), localTypefaces[i]);
            }

            cookie.set("settings", JSON.stringify(settings), {expires: 180});

        } else {

            //Cookie found, load and Apply cookie settings to app
            try {
                settings = JSON.parse(cookie("settings"));
            } catch (e) {
                console.log(e);
                clearSettings();
            }


            //Clear out typefaces to read to DOM
            var temp_settings = settings.typeArray;
            settings.typeArray = [];

            //Adds typeface elements into DOM
            for(var i = 0; i < temp_settings.length; i++) {
                addTypeface(temp_settings[i].id, temp_settings[i].typeface);
            }

        }

        if (cookie("pro") == '' || cookie("pro") == null) {
            cookie.set("pro", false, {expires: 100});
        }

        updatePro(cookie("pro"));

        //Update app with settings
        updateItalics(settings.italic);                 //Italic
        updateSize(settings.fontSize);                  //Font-Size
        updateSample(settings.sampleText);              //Sample Text
        updateTheme(settings.theme);                    //Theme
        updateWeight(settings.fontWeight);              //Font Weight
        updateLetterspacing(settings.letterSpacing);    //Letterspacing

    }


    var init = function () {

        //Feature detection of CSS Variables
        var browserCanUseCssVariables = function() {
            return window.CSS && window.CSS.supports && window.CSS.supports('--fake-var', 0);
        }
        if (!browserCanUseCssVariables()){
            document.getElementById('featureDetection').className = '';
            document.getElementById('featureDetection').getElementsByTagName('button')[0].addEventListener('click', function(){
                document.getElementById('featureDetection').className = 'hidden';
            });
        }

        loadCharMap();

        //Fetches Google Fonts list
        loadGFontsList(function(response){
            //Once GFonts is loaded, init AutoComplete
            if(response){
                try {
                    //https://goodies.pixabay.com/javascript/auto-complete/demo.html
                    new autoComplete({
                        selector: 'input[id="typeDropdown"]',
                        minChars: 2,
                        source: function(term, suggest){
                            term = term.toLowerCase();
                            var choices = gFontsList;
                            var matches = [];
                            for (var i = 0; i < choices.length; i++)
                                if (~choices[i].family.toLowerCase().indexOf(term)) matches.push(choices[i].family);
                            suggest(matches);},
                        onSelect: function(e, term, item){
                            var typeName = item.getAttribute('data-val');
                            addTypeface(genColumnID(), typeName);
                            document.getElementById('typeDropdown').value = "";
                        }
                    });
                } catch (e) {
                    console.log("AutoComplete failed to init.");
                    console.log(e);
                }

                //Load settings after GFonts loaded
                loadSettings();
            }
        });


        console.log("                  /)              /)");
        console.log("_/_      __   _  (/_ __ __  __  _(/ ");
        console.log("(__(_/_ /_)__(/_/_) (_)(_(_/ (_(_(_ ");
        console.log("  .-/.-/                            ");
        console.log(" (_/(_/                             ");

    };


    return {
        init:init,
        loadSettings:loadSettings,
        togglePro:togglePro,
        removeTypeface:removeTypeface,
        updateSize:updateSize,
        updateWeight:updateWeight,
        updateLetterspacing:updateLetterspacing,
        updateSample:updateSample,
        updateTheme:updateTheme,
        toggleItalics:toggleItalics,
        clearSettings:clearSettings,
        randomColors:randomColors,
        randomTypeface:randomTypeface,
        toggleMenu:toggleMenu

    };
}());
var Typeboard = Typeboard || {};
