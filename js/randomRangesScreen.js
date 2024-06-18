/* For the RandomRanges screen */
function displayRandomRangesScreen(pattern) {
    makeScreenVisible(randomRangesObject);
}

let randomRangesObject = {
  elementId: 'randomRangesScreen',

  /* Displays the context menu for the Pattern Screen */
  displayContextMenu: function() {
    makeScreenVisible('randomRangesScreenContextMenu');
  },

  leftArrowClicked: function(shift) {
    alert('randomRangesScreen left arrow clicked shift=' + shift);
  },
  
  rightArrowClicked: function(shift) {
    alert('randomRangesScreen right arrow clicked shift=' + shift);
  },
  
  upArrowClicked: function(shift) {
    alert('randomRangesScreen up arrow clicked shift=' + shift);
  },
  
  downArrowClicked: function(shift) {
    alert('randomRangesScreen down arrow clicked shift=' + shift);
  },

  upClicked: function(shift) {
    alert('randomRangesScreen up clicked shift=' + shift);
  },

  downClicked: function(shift) {
    alert('randomRangesScreen down clicked shift=' + shift);
  },

  okClicked: function(shift) {
    alert('randomRangesScreen ok clicked shift=' + shift);
  },    
}