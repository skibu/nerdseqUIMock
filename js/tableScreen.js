/* For the Table Screen */
function displayTableScreen(pattern) {
    makeScreenVisible(tableObject);
}

let tableObject = {
  elementId: 'tableScreen',

  /* Displays the context menu for the Screen */
  displayContextMenu: function() {
    makeScreenVisible("tableScreenContextMenu");
  },

  leftArrowClicked: function(shift) {
    alert('tableScreen left arrow clicked shift=' + shift);
  },
  
  rightArrowClicked: function(shift) {
    alert('tableScreen right arrow clicked shift=' + shift);
  },
  
  upArrowClicked: function(shift) {
    alert('tableScreen up arrow clicked shift=' + shift);
  },
  
  downArrowClicked: function(shift) {
    alert('tableScreen down arrow clicked shift=' + shift);
  },

  upClicked: function(shift) {
    alert('tableScreen up clicked shift=' + shift);
  },

  downClicked: function(shift) {
    alert('tableScreen down clicked shift=' + shift);
  },

  okClicked: function(shift) {
    alert('tableScreen ok clicked shift=' + shift);
  },    
}