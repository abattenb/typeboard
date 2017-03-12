/**
 * Type Board
 * Created by Andrew on 3/7/2017.
 *
 * So far IE11 is out.
 */
'use strict';


//Todo: Increase/Decrease font weight (100-900)
//Todo: Redo clearing of settings


//Global Variables          I know, I know
var typeColumnArray = [];
var typeSize = "1"; //in REM

var settings = {
    "theme" : "theme_white",
    "fontSize" : "1",
    "fontWeight" : "400",
    "italic" : false,
    "sampleText" : "Sphinx of black quartz, judge my vow.",
    "numberColumns" : 3 //Going to be the typeface id array
};


//Adds a new Type Column to the right
function addCharMapColumn() {
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
    xhttp.open("GET", "../charmap.html", true);
    xhttp.send();
}

//http://stackoverflow.com/a/2117523
function genColumnID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}


//Remove the parent column with class 'type_column'
function removeTypeColumn(childObj) {
    var testObj = childObj.parentElement;
    while(!testObj.classList.contains('type_column')) {
        testObj = testObj.parentNode;
    }
    testObj.remove();
}



//Update Settings cookie with current settings
function updateSettings(settingsKey, settingsValue){
    //Set dymanically new value based on key, if found
    if (settings.hasOwnProperty(settingsKey)) {
        settings[settingsKey] = settingsValue;
    }
    //Update cookie
    document.cookie = JSON.stringify(settings);
}



//Toggles italics
function toggleItalics() {
    updateSettings("italic", !settings.italic);
    //TODO: check toggle status first
    document.getElementById('type_board').classList.toggle('italics');
}

//Clears settings cookie
//TODO: clear settings
function clearSettings() {
    document.cookie = '';
}

//If Settings cookie doesnt exist, create
function checkSettingsExist(){
    if(document.cookie == "" || document.cookie == null) {
        document.cookie = JSON.stringify(settings);
    }
}

//Updates font size
function updateSize(size){

    document.getElementById('type_board').style.setProperty('--column-font-size', size + 'rem', null);
    document.getElementById('output_size').innerHTML = String(size + 'rem');
    document.getElementById('fontSize').value = settings.fontSize;

    updateSettings("fontSize", size);

}


//Updates all the sample texts
function updateSample(text_value){
    var sample_text = document.getElementsByClassName('text_sample');
    for(var i = 0; i < sample_text.length; i++){
        sample_text[i].innerHTML = text_value;
    }
    document.getElementById('text_input').innerHTML = text_value;
    updateSettings("sampleText", text_value);
}

//Loads settings from local cookie if exists
//Inits app data with settings
function loadSettings(){
    //If no settings, create
    checkSettingsExist();

    //Apply cookie settings to app
    settings = JSON.parse(document.cookie);

    //Italic
    //TODO: Update italics?
    if(settings.italic){
        document.getElementById('type_board').classList.toggle('italics');
    }

    //Font-Size
    updateSize(settings.fontSize);

    //Sample Text
    updateSample(settings.sampleText);

    //Theme
    updateTheme(settings.theme);

    console.log(settings);
}


//Changes CSS theme
function updateTheme(newTheme){
    var options = document.getElementById('theme').getElementsByTagName('option');

    //Remove all selected attributes
    for(var i = 0; i < options.length; i++) {
        options[i].removeAttribute('selected');
    }

    document.getElementsByTagName('body')[0].className = "theme " + newTheme;
    document.getElementById('theme').querySelector('[value=' + newTheme + ']').setAttribute('selected', '');

    updateSettings('theme', newTheme);
    console.log(settings);
}


window.addEventListener('load', function() {

    //Load settings from cookie
    loadSettings();


    //Init Columns
    addCharMapColumn();
    addCharMapColumn();
    addCharMapColumn();
    

    //
    // Init Eventlisteners
    //

    //Remove Column
    document.getElementById('char_board').addEventListener('click', function(event) {
        if (event.target.classList.contains('column_remove')) {
            event.preventDefault();
            removeTypeColumn(event.target);
        }
    });


    //Font Size slider
    document.getElementById('fontSize').addEventListener('input', function(){
        updateSize(this.value);
    }, false);

    //Sample Textarea
    document.getElementById('text_input').addEventListener('input', function(){
        updateSample(this.value);
    }, false);

    //Theme
    document.getElementById('theme').addEventListener('input', function(){
        updateTheme(this.value);
    }, false);


    //Italics
    document.getElementById('toggleItalics').addEventListener('click', function(){
        toggleItalics();
    }, false);

    //Add Typeface
    document.getElementById('addCharMapRow').addEventListener('click', function(){
       addCharMapColumn();
    }, false);



    //Settings
   document.getElementById('clearSettings').addEventListener('click', function(){
       clearSettings();
    }, false);
   //document.getElementById('updateSettings').addEventListener('click', function(){
   //    updateSettings();
   // }, false);


});