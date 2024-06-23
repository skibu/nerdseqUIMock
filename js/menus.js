// JS for all menus

let Menus = {
    /* A menu is different because want to still display the screen underneath it to
       convey that will be returning to that screen when done with the menu. Therefore
       doesn't first hide all screens. But should hide all menus */
    makeVisible: function(uiObject) {
        currentUiObject = uiObject;
        
        // Hide any other menus that are being displayed (but don't hide screens)
        var allMenus = $(".menuContainer");
        Array.from(allMenus).forEach(function(domTable) { 
            domTable.style.visibility = "hidden";});
    
        // Make the element with the specified id visible
        const menu = $("#" + uiObject.elementId)[0];
        menu.style.visibility = "visible";
    },

    // Makes the specified row the active one. The menuObject manages the currentRow param.
    // rowNum param is zero based.
    selectRow: function(rowNum, menuObject) {
        // If initializing (rowNum is null) then don't need to do anything
        if (rowNum  === null && menuObject.currentRow !== null)
            return;
            
        // If haven't used menu before then set rowNum and currentRow properly
        if (menuObject.currentRow === null) {
            // Select first row (rowNum is zero based)
            rowNum = 0;
    
            // Set currentRow to 1 so that it is different from rowNum so that classes get set
            menuObject.currentRow = 1;
        }
        
        // Get the row html elements of the table. Note that this includes the header.
        const rowElements = $('#' + menuObject.elementId + ' tr');
    
        // Limit row number to valid range of 0 <> numberOfRows-3 (the header and help rows don't count)
        rowNum = Math.min(rowElements.length - 3, Math.max(0, rowNum));
    
        // If row is changing then ...
        if (rowNum != menuObject.currentRow) {
            // array of editable cells doesn't include first tr. Therefore uses zero based index
            const editableCells = rowElements.find('.editable');
                        
            // Restore the previously selected row to its initial look
            rowElements[menuObject.currentRow+1].classList.remove('menuSelectedItem');
            const currentEditableElement = editableCells[menuObject.currentRow];
            currentEditableElement.classList.remove('selected');
            
            // Select the new row
            menuObject.currentRow = rowNum;
            rowElements[menuObject.currentRow+1].classList.add('menuSelectedItem');
            const newEditableElement = editableCells[menuObject.currentRow];
            newEditableElement.classList.add('selected');
    
            // Let the menu know that new row selected so can display help info or something
            if (menuObject.newRowSelected)
                menuObject.newRowSelected();
        }
    },
    
    MAX_HELP_STR_LENGTH: 33,
    
    /* Displays specified string in the help element. Can display 33 ir 34 characters */
    helpStr: function(str, menuObject) {
        // If blank string used that can cause the html element to resize. Therefore use
        // '&nbsp;' for that situation
        const strToUse = (str == null || str === '') ? '&nbsp;' : str;
    
        // Want to know if a help str has been defined that is too long
        if (strToUse.length > Menus.MAX_HELP_STR_LENGTH)
            alert('Warning: Menu help str "' + strToUse + '" is longer than limit of ' + MAX_HELP_STR_LENGTH + ' chars');
            
        $('#' + menuObject.elementId + ' .help').html(strToUse); 
    },
    
    initialize: function(menuObject) {
        // Make sure a row is highlighted
        Menus.selectRow(null, menuObject);
    
        // Call the objects initialize function if there is one defined
        if (menuObject.initialize)
            menuObject.initialize();
    },
    
    
    /* Returns id of the html element that is currently being edited */
    idOfEditableElement: function(menuObject) {
        // Determine current editable value and its ID.
        const rowElements = $('#' + menuObject.elementId + ' tr');
        const editableCells = rowElements.find('.editable');
        const currentEditableElement = editableCells[menuObject.currentRow];
        const id = currentEditableElement.id;
        return id;        
    },
    
    /* Handles when Close Menu item selected */
    handlePossibleCloseMenu: function(menuObject) { 
        const id = Menus.idOfEditableElement(menuObject);
        if (id === 'closeMenu') {
            // So that next time Project menu opened won't still be selecting the Close Window buttonn
            Menus.selectRow(0, menuObject);
            
            closeMenuAndRestoreScreen(menuObject);
        }
    },
};