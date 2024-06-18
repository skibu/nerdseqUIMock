/* For the Envelope screen */
function displayEnvelopeScreen(pattern) {
    makeScreenVisible(envelopeObject);
}

let envelopeObject = {
  elementId: 'envelopeScreen',

  /* Displays the context menu for the Pattern Screen */
  displayContextMenu: function() {
    makeScreenVisible('envelopeScreenContextMenu');
  },

  leftArrowClicked: function(shift) {
    alert('envelopeScreen left arrow clicked shift=' + shift);
  },
  
  rightArrowClicked: function(shift) {
    alert('envelopeScreen right arrow clicked shift=' + shift);
  },
  
  upArrowClicked: function(shift) {
    alert('envelopeScreen up arrow clicked shift=' + shift);
  },
  
  downArrowClicked: function(shift) {
    alert('envelopeScreen down arrow clicked shift=' + shift);
  },

  upClicked: function(shift) {
    alert('envelopeScreen up clicked shift=' + shift);
  },

  downClicked: function(shift) {
    alert('envelopeScreen down clicked shift=' + shift);
  },

  okClicked: function(shift) {
    alert('envelopeScreen ok clicked shift=' + shift);
  },    
}