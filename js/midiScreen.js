/* For the Midi screen */
function displayMidiScreen(pattern) {
    makeScreenVisible(midiObject);
}

let midiObject = {
  elementId: 'midiScreen',

  /* Displays the context menu for the Pattern Screen */
  displayContextMenu: function() {
    makeScreenVisible('midiScreenContextMenu');
  },

  leftArrowClicked: function(shift) {
    alert('midiScreen left arrow clicked shift=' + shift);
  },
  
  rightArrowClicked: function(shift) {
    alert('midiScreen right arrow clicked shift=' + shift);
  },
  
  upArrowClicked: function(shift) {
    alert('midiScreen up arrow clicked shift=' + shift);
  },
  
  downArrowClicked: function(shift) {
    alert('midiScreen down arrow clicked shift=' + shift);
  },

  upClicked: function(shift) {
    alert('midiScreen up clicked shift=' + shift);
  },

  downClicked: function(shift) {
    alert('midiScreen down clicked shift=' + shift);
  },

  okClicked: function(shift) {
    alert('midiScreen ok clicked shift=' + shift);
  },    
}