/* For the Patch screen */
function displayPatchScreen(pattern) {
    makeScreenVisible(patchObject);
}

let patchObject = {
  elementId: 'patchScreen',

  /* Displays the context menu for the Pattern Screen */
  displayContextMenu: function() {
    makeScreenVisible("patchScreenContextMenu");
  },

  leftArrowClicked: function(shift) {
    alert('patchScreen left arrow clicked shift=' + shift);
  },
  
  rightArrowClicked: function(shift) {
    alert('patchScreen right arrow clicked shift=' + shift);
  },
  
  upArrowClicked: function(shift) {
    alert('patchScreen up arrow clicked shift=' + shift);
  },
  
  downArrowClicked: function(shift) {
    alert('patchScreen down arrow clicked shift=' + shift);
  },

  upClicked: function(shift) {
    alert('patchScreen up clicked shift=' + shift);
  },

  downClicked: function(shift) {
    alert('patchScreen down clicked shift=' + shift);
  },

  okClicked: function(shift) {
    alert('patchScreen ok clicked shift=' + shift);
  },    
}