function displayProjectMenu() {
    makeMenuVisible(projectMenuObject);
}

let projectMenuObject = {
    elementId: 'projectMenu',
    
    /* There is no context menu for the Project Menu so do nothing */
    displayContextMenu: function() {
    },

    upArrowClicked: function() {alert('up');},
    downArrowClicked: function() {alert('down');},
    
    leftArrowClicked: function() {
        // Hide the menu and have the last screen get UI events
        closeMenuAndRestoreScreen(this);
    },

    rightArrowClicked: function() {alert('right');}, 
};