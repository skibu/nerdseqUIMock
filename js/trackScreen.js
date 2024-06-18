/* For the Track screen */
function displayTrackScreen(pattern) {
    makeScreenVisible(trackObject);
}

let trackObject = {
  elementId: 'trackScreen',

  /* Displays the context menu for the Pattern Screen */
  displayContextMenu: function() {
    makeScreenVisible('trackScreenContextMenu');
  },

  leftArrowClicked: function(shift) {
    alert('trackScreen left arrow clicked shift=' + shift);
  },
  
  rightArrowClicked: function(shift) {
    alert('trackScreen right arrow clicked shift=' + shift);
  },
  
  upArrowClicked: function(shift) {
    alert('trackScreen up arrow clicked shift=' + shift);
  },
  
  downArrowClicked: function(shift) {
    alert('trackScreen down arrow clicked shift=' + shift);
  },

  upClicked: function(shift) {
    alert('trackScreen up clicked shift=' + shift);
  },

  downClicked: function(shift) {
    alert('trackScreen down clicked shift=' + shift);
  },

  okClicked: function(shift) {
    alert('trackScreen ok clicked shift=' + shift);
  },    
}