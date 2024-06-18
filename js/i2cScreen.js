/* For the I2c screen */
function displayI2cScreen(pattern) {
    makeScreenVisible(i2cObject);
}

let i2cObject = {
  elementId: 'i2cScreen',

  /* Displays the context menu for the Pattern Screen */
  displayContextMenu: function() {
    makeScreenVisible('i2cScreenContextMenu');
  },

  leftArrowClicked: function(shift) {
    alert('i2cScreen left arrow clicked shift=' + shift);
  },
  
  rightArrowClicked: function(shift) {
    alert('i2cScreen right arrow clicked shift=' + shift);
  },
  
  upArrowClicked: function(shift) {
    alert('i2cScreen up arrow clicked shift=' + shift);
  },
  
  downArrowClicked: function(shift) {
    alert('i2cScreen down arrow clicked shift=' + shift);
  },

  upClicked: function(shift) {
    alert('i2cScreen up clicked shift=' + shift);
  },

  downClicked: function(shift) {
    alert('i2cScreen down clicked shift=' + shift);
  },

  okClicked: function(shift) {
    alert('i2cScreen ok clicked shift=' + shift);
  },    
}