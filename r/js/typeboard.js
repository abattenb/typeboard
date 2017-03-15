/**
 * Type Board
 * Created by Andrew on 3/7/2017.
 *
 * So far IE11 is out.
 */


//TODO: Redo the way cookies are handled (path, expire)
//TODO: Save random colors into palette
//TODO: Letter Spacing adjustment
//TODO: Line-height adjustment
//TODO: Header + paragraph
//TODO: Handling async delays on ajax loads
//TODO: Refactor removeTypeColumn into removeTypeface



//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//TODO: RESTRICT GOOGLE API KEY BEFORE SHARING
//TODO: RESTRICT GOOGLE API KEY BEFORE SHARING
//TODO: RESTRICT GOOGLE API KEY BEFORE SHARING
//TODO: RESTRICT GOOGLE API KEY BEFORE SHARING
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

'use strict';
Typeboard = (function () {

    //Typeboard Variables

    var key = 'AIzaSyBbtvvx9DFYu8-CbOHPTaBOdQVT-P_zg9Q';
    var settings = [];
    var gFontsList = [];
    var charmap;


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
    var addTypeface = function (typeface) {
        var typeId = genColumnID();
        var typeElement = JSON.parse('{"id": "' + typeId + '","typeface" : "' + typeface + '"}');
        settings.typeArray.push(typeElement);

        updateSettings('typeArray', settings.typeArray);
        addTypeColumn(typeId, typeface);
        addSample(typeId);
    }

    //Adds a new Type Column to the DOM on the right
    var addTypeColumn = function(columnId, typeface) {
        var columnCharMap = document.createElement('div');
        columnCharMap.innerHTML = charmap;
        columnCharMap.className = 'type_column';
        columnCharMap.getElementsByTagName('h2')[0].innerHTML = typeface;
        columnCharMap.setAttribute('type_id', columnId);
        columnCharMap.style.fontFamily = typeface;

        document.getElementById('char_board').appendChild(columnCharMap);
    }

    //Remove the parent column with class 'type_column'
    var removeTypeColumn = function(childObj) {
        var parentObj = childObj.parentElement;
        while(!parentObj.classList.contains('type_column')) {
            parentObj = parentObj.parentNode;
        }
        var typeId = parentObj.getAttribute('type_id');
        //Returns everything but the entry with the ID
        settings.typeArray = settings.typeArray.filter(function (e){return e.id !== typeId});
        updateSettings('typeArray', settings.typeArray);

        parentObj.remove();
        removeSample(typeId);
    }

    //Update Settings cookie with current settings
    var updateSettings = function(settingsKey, settingsValue){
        //Set dynamically new value based on key, if found
        if (settings.hasOwnProperty(settingsKey)) {
            settings[settingsKey] = settingsValue;
        }
        //Update cookie
        document.cookie = JSON.stringify(settings);
        //console.log(settings);
    }

    //Clears settings cookie
    var clearSettings = function() {
        for(var i = 0; i < settings.typeArray.length; i++){
            var type_id = settings.typeArray[i].id;
            //Clears type columns DOM
            document.querySelector('#char_board').innerHTML = '';
            //Clears samples
            document.querySelector('#text_board pre').innerHTML = '';
        }
        
        //clear cookie
        document.cookie = '';
        //clear random color settings
        document.getElementsByTagName('body')[0].style = '';
        loadSettings();
    }

    //If Settings cookie doesnt exist, gen cookie, initial settings
    var checkSettingsExist = function(){
        if(document.cookie == '' || document.cookie == null) {

            var init_settings = {
                "typeArray" : [
                    //{
                    //    "id": 0,
                    //    "typeface" : "Arial"
                    //}
                ],
                "theme" : "theme_black_white",
                "fontSize" : "1",
                "fontWeight" : "400",
                "italic" : "normal",
                "sampleText" : "Sphinx of black quartz, judge my vow."
            };

            //Seeds with Arial, Times New Roman
            init_settings.typeArray.push(JSON.parse('{"id": "' + genColumnID() + '","typeface" : "Arial"}'));
            init_settings.typeArray.push(JSON.parse('{"id": "' + genColumnID() + '","typeface" : "Times New Roman"}'));
            init_settings.typeArray.push(JSON.parse('{"id": "' + genColumnID() + '","typeface" : "Courier"}'));
            //settings.typeArray.push(JSON.parse('{"id": "' + genColumnID() + '","typeface" : "Arial"}'));
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

    var addSample = function(type_id){
        var sampleElement = document.createElement('div');
        sampleElement.className = 'text_sample';
        sampleElement.setAttribute('type_id', type_id);
        sampleElement.style.fontFamily = settings.typeArray.filter(function (e){return e.id == type_id})[0].typeface;
        sampleElement.innerHTML = settings.sampleText;
        document.querySelector('#text_board pre').appendChild(sampleElement);
    }
    
    var removeSample = function(type_id){
        document.querySelector("#text_board [type_id='" + type_id + "'").remove();
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

        var numTypefaces = settings.typeArray.length;
        for(var i = 0; i < numTypefaces; i++) {
            //Loads type columns into DOM
            addTypeColumn(settings.typeArray[i].id, settings.typeArray[i].typeface);
            //Loads samples into DOM  
            addSample(settings.typeArray[i].id)
        }
    }

    //TODO: Implement better color random function
    //TODO: Add 'unwind' function to get previous random
    //Casts the three main colors with a random hex
    //DANGEROUS, YOU MAY NEVER SEE THOSE COLORS AGAIN!!!
    //http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript
    var randomColors = function(){
        var textColor = "#" + Math.random().toString(16).slice(-6).toString();
        var backgroundColor =  "#" + Math.random().toString(16).slice(-6).toString();
        var accentColor = "#" + Math.random().toString(16).slice(-6).toString();
        document.getElementsByTagName('body')[0].style.setProperty('--text-color', textColor, null);
        document.getElementsByTagName('body')[0].style.setProperty('--background-color', backgroundColor, null);
        document.getElementsByTagName('body')[0].style.setProperty('--accent-color', accentColor, null);
    }


    //Gets the current type list through Google Fonts API
    var loadGFontsList = function(){
        var url = "https://www.googleapis.com/webfonts/v1/webfonts?key=" + key;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                gFontsList = JSON.parse(xhttp.responseText).items;
            }
        }
        xhttp.open("GET", url, true);
        xhttp.send();
    }


    var init = function () {
        //Loads settings from cookie
        loadGFontsList();
        loadCharMap();

        //https://goodies.pixabay.com/javascript/auto-complete/demo.html
        new autoComplete({
            selector: 'input[id="typeDropdown"]',
            minChars: 1,
            source: function(term, suggest){
                term = term.toLowerCase();
                var choices = gFontsList;
                var matches = [];
                for (var i = 0; i < choices.length; i++)
                    if (~choices[i].family.toLowerCase().indexOf(term)) matches.push(choices[i].family);
                suggest(matches);},
            onSelect: function(e, term, item){
                var typeName = item.getAttribute('data-val');
                addTypeface(typeName);
                document.getElementById('typeDropdown').value = "";
            }
        });


        setTimeout(function() {
            loadSettings();
            console.log("                  /)              /)");
            console.log("_/_     __    _  (/_ ____   __  _(/ ");
            console.log("(__(_/_ /_)__(/_/_) (_)(_(_/ (_(_(_ ");
            console.log("  .-/.-/                            ");
            console.log(" (_/(_/                             ");
            console.log(gFontsList.length + " Google fonts loaded.")
            console.log("Typeboard init successful!");





        }, 500);



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
        clearSettings:clearSettings,
        randomColors:randomColors

    };
}());
var Typeboard = Typeboard || {};
