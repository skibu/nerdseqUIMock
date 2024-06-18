/* For the ScaleQuantize screen */
function displayScaleQuantizeScreen(pattern) {
    makeScreenVisible(scaleQuantizeObject);
}

let scaleQuantizeObject = {
  elementId: 'scaleQuantizeScreen',

  /* Displays the context menu for the Pattern Screen */
  displayContextMenu: function() {
    makeScreenVisible('scaleQuantizeScreenContextMenu');
  },

  leftArrowClicked: function(shift) {
    alert('scaleQuantizeScreen left arrow clicked shift=' + shift);
  },
  
  rightArrowClicked: function(shift) {
    alert('scaleQuantizeScreen right arrow clicked shift=' + shift);
  },
  
  upArrowClicked: function(shift) {
    alert('scaleQuantizeScreen up arrow clicked shift=' + shift);
  },
  
  downArrowClicked: function(shift) {
    alert('scaleQuantizeScreen down arrow clicked shift=' + shift);
  },

  upClicked: function(shift) {
    alert('scaleQuantizeScreen up clicked shift=' + shift);
  },

  downClicked: function(shift) {
    alert('scaleQuantizeScreen down clicked shift=' + shift);
  },

  okClicked: function(shift) {
    alert('scaleQuantizeScreen ok clicked shift=' + shift);
  },    
}