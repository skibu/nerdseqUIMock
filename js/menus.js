// JS for all menus

// Makes the specified row the active one. The menuObject manages the currentRow param.
// rowNum param is zero based.
function menuSelectRow(rowNum, menuObject) {
    // If haven't used menu before then set rowNum and currentRow properly
    if (menuObject.currentRow === null || rowNum === null) {
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
    const currentEditableElement = editableCells[menuObject.currentRow];
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