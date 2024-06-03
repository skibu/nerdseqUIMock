/* For the Pattern screen */
function pattern(shiftKey) {
    currentScreen = patternObject;
    makeScreenVisible("patternTable");
}

let patternObject = {
    NOTHING_YET: 0,

    leftArrowClicked: function(shift) {
      alert('patternScreen left arrow clicked shift=' + shift);
    },
    
    rightArrowClicked: function(shift) {
      alert('patternScreen right arrow clicked shift=' + shift);
    },
    
    upArrowClicked: function(shift) {
      alert('patternScreen up arrow clicked shift=' + shift);
    },
    
    downArrowClicked: function(shift) {
      alert('patternScreen down arrow clicked shift=' + shift);
    },

    upClicked: function(shift) {
      alert('patternScreen up clicked shift=' + shift);
    },

    downClicked: function(shift) {
      alert('patternScreen down clicked shift=' + shift);
    },

    okClicked: function(shift) {
      alert('patternScreen ok clicked shift=' + shift);
    },    
}