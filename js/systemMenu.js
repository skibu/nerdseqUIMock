function displaySystemMenu() {
    currentScreen = systemMenuObject;
    makeScreenVisible("systemMenu");
}

let systemMenuObject = {
  /* There is no context menu for the System Menu so do nothing */
  displayContextMenu: function() {
  },
};