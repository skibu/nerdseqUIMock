/* For the InputRecord screen */
function displayInputRecordScreen(pattern) {
    makeScreenVisible(inputRecordObject);
}

let inputRecordObject = {
  elementId: 'inputRecordScreen',

  /* Displays the context menu for the Pattern Screen */
  displayContextMenu: function() {
    makeScreenVisible('inputRecordScreenContextMenu');
  },

  leftArrowClicked: function(shift) {
    alert('inputRecordScreen left arrow clicked shift=' + shift);
  },
  
  rightArrowClicked: function(shift) {
    alert('inputRecordScreen right arrow clicked shift=' + shift);
  },
  
  upArrowClicked: function(shift) {
    alert('inputRecordScreen up arrow clicked shift=' + shift);
  },
  
  downArrowClicked: function(shift) {
    alert('inputRecordScreen down arrow clicked shift=' + shift);
  },

  upClicked: function(shift) {
    alert('inputRecordScreen up clicked shift=' + shift);
  },

  downClicked: function(shift) {
    alert('inputRecordScreen down clicked shift=' + shift);
  },

  okClicked: function(shift) {
    alert('inputRecordScreen ok clicked shift=' + shift);
  },    
}