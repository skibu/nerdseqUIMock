// JS for all menus

// Makes the specified row the active one. The menuObject manages the currentRow param.
function menuSelectRow(rowNum, menuObject) {
    // If haven't used menu before then set
    if (!menuObject.currentRow) {
        // If rowNum not set just use first eleemnt of menu
        if (!rowNum)
            rowNum = 1;

        // Set currentRow to 2 so that it is different from rowNum so that classes get set
        menuObject.currentRow = 2;
    } else {
        // currentRow already set so use it if rowNum not specified
        if (!rowNum)
            rowNum = menuObject.currentRow;
    }
    
    // Get the row html elements of the table
    const rowElements = $('#' + menuObject.elementId + ' tr');

    // Limit row number to valid range of 1 <> numberOfRows-1
    rowNum = Math.min(rowElements.length - 2, Math.max(1, rowNum));

    // If row is changing then ...
    if (rowNum != menuObject.currentRow) {
        // array of editable cells doesn't include first tr. Therefore ues zero based index
        const editableCells = rowElements.find('.editable');
                    
        // Restore the previously selected row to its initial look
        rowElements[menuObject.currentRow].classList.remove('menuSelectedItem');
        const currentEditableElement = editableCells[menuObject.currentRow-1];
        currentEditableElement.classList.remove('selected');
        
        // Select the new row
        menuObject.currentRow = rowNum;
        rowElements[menuObject.currentRow].classList.add('menuSelectedItem');
        const newEditableElement = editableCells[menuObject.currentRow-1];
        newEditableElement.classList.add('selected');

        // Let the menu know that new row selected so can display help info or something
        if (menuObject.newRowSelected)
            menuObject.newRowSelected();
    }
}
    
/* Displays specified string in the help element */
function menuHelpStr(str, menuObject) {
  // If blank string used that can cause the html element to resize. Therefore use
  // '&nbsp;' for that situation
  const strToUse = (str == null || str === '') ? '&nbsp;' : str;

  $('#' + menuObject.elementId + ' .help').html(strToUse); 
}

function menuInitialize (menuObject) {
    // Make sure a row is highlighted
    menuSelectRow(null, menuObject);
}


/* Returns id of the html element that is currently being edited */
function menuIdOfEditableElement(menuObject) {
    // Determine current editable value and its ID.
    const rowElements = $('#' + menuObject.elementId + ' tr');
    const editableCells = rowElements.find('.editable');
    const currentEditableElement = editableCells[menuObject.currentRow-1];
    const id = currentEditableElement.id;
    return id;        
}

/* Handles when OK button clicked for menu */
function menuOkClicked(shiftKey, menuObject) { 
    const id = menuIdOfEditableElement(menuObject);
    if (id === 'closeMenu') {
        // So that next time Project menu opened won't still be selecting the Close Window buttonn
        menuSelectRow(1, menuObject);
        
        closeMenuAndRestoreScreen(menuObject);
    }
}