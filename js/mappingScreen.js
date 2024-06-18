/* For the Mapping screen */
function displayMappingScreen(pattern) {
    makeScreenVisible(mappingObject);
}

let mappingObject = {
  elementId: 'mappingScreen',

  /* Displays the context menu for the Pattern Screen */
  displayContextMenu: function() {
    makeScreenVisible('mappingScreenContextMenu');
  },

  leftArrowClicked: function(shift) {
    alert('mappingScreen left arrow clicked shift=' + shift);
  },
  
  rightArrowClicked: function(shift) {
    alert('mappingScreen right arrow clicked shift=' + shift);
  },
  
  upArrowClicked: function(shift) {
    alert('mappingScreen up arrow clicked shift=' + shift);
  },
  
  downArrowClicked: function(shift) {
    alert('mappingScreen down arrow clicked shift=' + shift);
  },

  upClicked: function(shift) {
    alert('mappingScreen up clicked shift=' + shift);
  },

  downClicked: function(shift) {
    alert('mappingScreen down clicked shift=' + shift);
  },

  okClicked: function(shift) {
    alert('mappingScreen ok clicked shift=' + shift);
  },    
}