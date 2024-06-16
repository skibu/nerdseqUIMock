/* For the Automate screen */
function displayAutomateScreen(pattern) {
    makeScreenVisible(automateObject);
}

let automateObject = {
  elementId: 'automateScreen',

  /* Displays the context menu for the Pattern Screen */
  displayContextMenu: function() {
    makeScreenVisible("automateScreenContextMenu");
  },

  leftArrowClicked: function(shift) {
    alert('automateScreen left arrow clicked shift=' + shift);
  },
  
  rightArrowClicked: function(shift) {
    alert('automateScreen right arrow clicked shift=' + shift);
  },
  
  upArrowClicked: function(shift) {
    alert('automateScreen up arrow clicked shift=' + shift);
  },
  
  downArrowClicked: function(shift) {
    alert('automateScreen down arrow clicked shift=' + shift);
  },

  upClicked: function(shift) {
    alert('automateScreen up clicked shift=' + shift);
  },

  downClicked: function(shift) {
    alert('automateScreen down clicked shift=' + shift);
  },

  okClicked: function(shift) {
    alert('automateScreen ok clicked shift=' + shift);
  },    
}