'use strict';




window.addEventListener('load', function() {
    //Start Typeboard
    Typeboard.init();


    //
    // Init Eventlisteners
    //

    //Remove Column
    document.getElementById('char_board').addEventListener('click', function(event) {
        if (event.target.classList.contains('column_remove')) {
            event.preventDefault();
            Typeboard.removeTypeColumn(event.target);
        }
    });


    //Font Size slider
    document.getElementById('fontSize').addEventListener('input', function(){
        Typeboard.updateSize(this.value);
    }, false);

    //Font Weight slider
    document.getElementById('fontWeight').addEventListener('input', function(){
        Typeboard.updateWeight(this.value);
    }, false);

    //Sample Textarea
    document.getElementById('text_input').addEventListener('input', function(){
        Typeboard.updateSample(this.value);
    }, false);

    //Theme
    document.getElementById('themeSelector').addEventListener('input', function(){
        Typeboard.updateTheme(this.value);
    }, false);


    //Italics
    document.getElementById('toggleItalics').addEventListener('change', function(){
        Typeboard.toggleItalics(this.checked);
    }, false);

    ////Add Typeface
    //document.getElementById('addCharMapRow').addEventListener('click', function(){
    //    Typeboard.addTypeColumn();
    //}, false);

    //Random color theme
   document.getElementById('random').addEventListener('click', function(){
       Typeboard.randomColors();
    }, false);

    //Clear Settings
   document.getElementById('clearSettings').addEventListener('click', function(){
       Typeboard.clearSettings();
    }, false);


});