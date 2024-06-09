function displayScreenSelectMenu() {
    currentScreen = screenSelectMenuObject;
    makeScreenVisible("screenSelectMenu");
}

let screenSelectMenuObject = {
  /* There is no context menu for the Screen Select Menu so do nothing */
  displayContextMenu: function() {
  },

};