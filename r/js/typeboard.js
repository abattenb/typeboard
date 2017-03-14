/**
 * Type Board
 * Created by Andrew on 3/7/2017.
 *
 * So far IE11 is out.
 */

//TODO: Redo clearing of settings
//TODO: Random color function
//TODO: Letter Spacing adjustment
//TODO: Line-height adjustment
//TODO: Header + paragraph


'use strict';
Typeboard = (function () {


//Typeboard Variables
    var typeColumnArray = [];
    var settings = [];
    var init_settings = {
        "theme" : "theme_black_white",
        "fontSize" : "1",
        "fontWeight" : "400",
        "italic" : "normal",
        "sampleText" : "Sphinx of black quartz, judge my vow.",
        "numberColumns" : 3 //Going to be the typeface id array
    };



    //http://stackoverflow.com/a/2117523
    var genColumnID = function(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    //Adds a new Type Column to the right
    var addCharMapColumn = function() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var columnId = genColumnID();
                var columnCharMap = document.createElement('div');
                columnCharMap.className = 'type_column';
                columnCharMap.innerHTML = xhttp.responseText;
                columnCharMap.setAttribute('column_id', columnId); //Not perfectly unique
                typeColumnArray.push(columnId);
                document.getElementById('char_board').appendChild(columnCharMap);
            }
        }
        xhttp.open("GET", "../typeboard/charmap.html", true);
        xhttp.send();
    }

    //Remove the parent column with class 'type_column'
    var removeTypeColumn = function(childObj) {
        var testObj = childObj.parentElement;
        while(!testObj.classList.contains('type_column')) {
            testObj = testObj.parentNode;
        }
        testObj.remove();
    }

    //Update Settings cookie with current settings
    var updateSettings = function(settingsKey, settingsValue){
        //Set dymanically new value based on key, if found
        if (settings.hasOwnProperty(settingsKey)) {
            settings[settingsKey] = settingsValue;
        }
        //Update cookie
        document.cookie = JSON.stringify(settings);
        //console.log(settings);
    }


    //Clears settings cookie
    var clearSettings = function() {
        document.cookie = '';
        loadSettings();
    }

    //If Settings cookie doesnt exist, create
    var checkSettingsExist = function(){
        if(document.cookie == '' || document.cookie == null) {
            settings = init_settings;
            document.cookie = JSON.stringify(settings);
        }
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
        document.getElementById('fontSize').value = settings.fontSize;
        updateSettings("fontSize", size);
    }

    //Updates font weight, from 100 - 900
    var updateWeight = function(weight) {
        document.getElementById('type_board').style.setProperty('--font-weight', weight, null);
        document.getElementById('output_weight').innerHTML = String(weight);
        document.getElementById('fontWeight').value = settings.fontWeight;
        updateSettings("fontWeight", weight);
    }


    //Loads settings from local cookie if exists
    //Inits app data with settings
    var loadSettings = function(){
        //If no settings, create
        checkSettingsExist();

        //Load and Apply cookie settings to app
        settings = JSON.parse(document.cookie);

        updateItalics(settings.italic);         //Italic
        updateSize(settings.fontSize);          //Font-Size
        updateSample(settings.sampleText);      //Sample Text
        updateTheme(settings.theme);            //Theme
        updateWeight(settings.fontWeight);      //Font Weight

    }






    var init = function () {
        //Loads settings from cookie
        loadSettings();
        addCharMapColumn();
        addCharMapColumn();
        addCharMapColumn();

        console.log("Typeboard init successful!");
    };


    return {
        init:init,
        loadSettings:loadSettings,
        removeTypeColumn:removeTypeColumn,
        updateSize:updateSize,
        updateWeight:updateWeight,
        updateSample:updateSample,
        updateTheme:updateTheme,
        toggleItalics:toggleItalics,
        addCharMapColumn:addCharMapColumn,
        clearSettings:clearSettings

    };
}());
var Typeboard = Typeboard || {};
