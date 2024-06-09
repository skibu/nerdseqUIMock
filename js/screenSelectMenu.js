function displayScreenSelectMenu() {
     makeMenuVisible(screenSelectMenuObject);
}

let screenSelectMenuObject = {
    elementId: 'screenSelectMenu',
    
    /* There is no context menu for the Screen Select Menu so do nothing */
    displayContextMenu: function() {
    },

};