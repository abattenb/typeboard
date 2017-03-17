'use strict';


window.addEventListener('load', function() {
    //Start Typeboard
    Typeboard.init();


    //
    // Init Eventlisteners
    //

    //Remove Typeface
    document.getElementById('type_list').addEventListener('click', function(event) {
        if (event.target.hasAttributes('type_id')) {
            Typeboard.removeTypeface(event.target.getAttribute('type_id'));
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

    //Letterspacing slider
    document.getElementById('letterSpacing').addEventListener('input', function(){
        Typeboard.updateLetterspacing(this.value);
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

    //Random color theme
    document.getElementById('random_colors').addEventListener('click', function(){
       Typeboard.randomColors();
    }, false);

    //Random color theme
    document.getElementById('random_typeface').addEventListener('click', function(){
       Typeboard.randomTypeface();
    }, false);

    //Clear Settings
   document.getElementById('clearSettings').addEventListener('click', function(){
       Typeboard.clearSettings();
       Typeboard.loadSettings();
    }, false);


});