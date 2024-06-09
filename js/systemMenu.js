function displaySystemMenu() {
     makeMenuVisible(systemMenuObject);
}

let systemMenuObject = {
    elementId: 'systemMenu',
    
    /* There is no context menu for the System Menu so do nothing */
    displayContextMenu: function() {
    },
};