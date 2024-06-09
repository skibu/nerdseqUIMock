function displayProjectMenu() {
    currentScreen = projectMenuObject;
    makeScreenVisible("projectMenu");
}

let projectMenuObject = {
  /* There is no context menu for the Project Menu so do nothing */
  displayContextMenu: function() {
  },
};