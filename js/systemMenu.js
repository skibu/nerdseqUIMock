/* JS for the System Menu */
function displaySystemMenu() {
    // Initialize object
    Menus.initialize(systemMenuObject);
    
    Menus.makeVisible(systemMenuObject);
}

let systemMenuObject = {
    elementId: 'systemMenu',

    // 1 based since row 0 is the header
    currentRow: null,

    // For handling scrolling
    rows: null,  // Array of the html tr elements to be hidden or made visible. Does not include header or help rows.
    rowNumOfFirstVisibleRow: 0,   
    VISIBLE_ROWS: 16,

    /* Initializes the UI with all the editable values, setting them to their default value.
       Called automatically at initialization by menuInitialize() */
    initialize: function() {
        this.handleScreensaverChange();
        this.handleAutosaveScreensaveChange();
        this.handleAutoloadProjectChange();
        this.handleShowBackupFolderChange();
        this.handleKeyPressDelayChange();
        this.handleKeyHoldRepeatChange();
        this.handleNavigationWrapChange();
        this.handleAutoGateOnNoteChange();
        this.handleAutoGateTimeoutChange();
        this.handleAutoFillInTriggerChange();
        this.handleAutoRemoveTriggerChange();
        this.handleVideoExpanderChange();
        this.handleDefaultTriggerTypeChange();
    },

    screensaver: 5, // default
    getScreensaver: function() { return this.screensaver; },
    getScreensaverStr: function() { return this.screensaver == 0 ? 'Off' : this.screensaver + ' minutes'},
    handleScreensaverChange: function(increment, shiftKey) {
        // if not initializing
        if (typeof increment === 'number') {
            // Limit the value and store it
            let screensaver = this.screensaver + (shiftKey ? 5*increment : increment);
            this.screensaver = Math.min(Math.max(screensaver, 0), 60);
        }
    
        // Update UI. Using className since there could be several elements that need to be updated
        $('.screensaver').html(this.getScreensaverStr());
    },

    autosaveScreensave: false, // default
    getAutosaveScreensave: function() { return this.autosaveScreensave; },
    getAutosaveScreensaveStr: function() { return this.autosaveScreensave ? 'On' : 'Off'; },
    handleAutosaveScreensaveChange: function(increment, shiftKey) { 
        // if not initializing
        if (typeof increment === 'number') {
            // Store it
            this.autosaveScreensave = !this.autosaveScreensave; 
        }
    
        // Update UI. Using className since there could be several elements that need to be updated
        $('.autosaveScreensave').html(this.getAutosaveScreensaveStr());
    },
        
    autoloadProject: true, // default
    getAutoloadProject: function() { return this.autoloadProject; },
    getAutoloadProjectStr: function() { return this.autoloadProject ? 'On' : 'Off'; },
    handleAutoloadProjectChange: function(increment, shiftKey) { 
        // if not initializing
        if (typeof increment === 'number') {
            // Store it
            this.autoloadProject = !this.autoloadProject; 
        }
    
        // Update UI. Using className since there could be several elements that need to be updated
        $('.autoloadProject').html(this.getAutoloadProjectStr());
    },

    showBackupFolder: false, // default
    getShowBackupFolder: function() { return this.showBackupFolder; },
    getShowBackupFolderStr: function() { return this.showBackupFolder ? 'On' : 'Off'; },
    handleShowBackupFolderChange: function(increment, shiftKey) { 
        // if not initializing
        if (typeof increment === 'number') {
            // Store it
            this.showBackupFolder = !this.showBackupFolder; 
        }
    
        // Update UI. Using className since there could be several elements that need to be updated
        $('.showBackupFolder').html(this.getShowBackupFolderStr());
    },

    keyPressDelay: 200, // default
    getKeyPressDelay: function() { return this.keyPressDelay; },
    getKeyPressDelayStr: function() { return this.keyPressDelay + ' msec'},
    handleKeyPressDelayChange: function(increment, shiftKey) {
        // if not initializing
        if (typeof increment === 'number') {
            // Limit the value and store it
            let keyPressDelay = this.keyPressDelay + (shiftKey ? 100*increment : 10*increment);
            this.keyPressDelay = Math.min(Math.max(keyPressDelay, 30), 4000);
        }
    
        // Update UI. Using className since there could be several elements that need to be updated
        $('.keyPressDelay').html(this.getKeyPressDelayStr());
    },
    
    keyHoldRepeat: 50, // default
    getKeyHoldRepeat: function() { return this.keyHoldRepeat; },
    getKeyHoldRepeatStr: function() { return this.keyHoldRepeat + ' msec'},
    handleKeyHoldRepeatChange: function(increment, shiftKey) {
        // if not initializing
        if (typeof increment === 'number') {
            // Limit the value and store it
            let keyHoldRepeat = this.keyHoldRepeat + (shiftKey ? 10*increment : 2*increment);
            this.keyHoldRepeat = Math.min(Math.max(keyHoldRepeat, 20), 4000);
        }
    
        // Update UI. Using className since there could be several elements that need to be updated
        $('.keyHoldRepeat').html(this.getKeyHoldRepeatStr());
    },

    navigationWrap: false, // default
    getNavigationWrap: function() { return this.navigationWrap; },
    getNavigationWrapStr: function() { return this.navigationWrap ? 'On' : 'Off'; },
    handleNavigationWrapChange: function(increment, shiftKey) { 
        // if not initializing
        if (typeof increment === 'number') {
            // Store it
            this.navigationWrap = !this.navigationWrap; 
        }
    
        // Update UI. Using className since there could be several elements that need to be updated
        $('.navigationWrap').html(this.getNavigationWrapStr());
    },

    autoGateOnNote: true, // default
    getAutoGateOnNote: function() { return this.autoGateOnNote; },
    getAutoGateOnNoteStr: function() { return this.autoGateOnNote ? 'On' : 'Off'; },
    handleAutoGateOnNoteChange: function(increment, shiftKey) { 
        // if not initializing
        if (typeof increment === 'number') {
            // Store it
            this.autoGateOnNote = !this.autoGateOnNote; 
        }
    
        // Update UI. Using className since there could be several elements that need to be updated
        $('.autoGateOnNote').html(this.getAutoGateOnNoteStr());
    },

    autoGateTimeout: 4, // default
    getAutoGateTimeout: function() { return this.autoGateTimeout; },
    getAutoGateTimeoutStr: function() { return this.autoGateTimeout + ' msec'}, // NOTE: not certain units is msec
    handleAutoGateTimeoutChange: function(increment, shiftKey) {
        // if not initializing
        if (typeof increment === 'number') {
            // Limit the value and store it
            let autoGateTimeout = this.autoGateTimeout + increment;
            this.autoGateTimeout = Math.min(Math.max(autoGateTimeout, 1), 64);
        }
    
        // Update UI. Using className since there could be several elements that need to be updated
        $('.autoGateTimeout').html(this.getAutoGateTimeoutStr());
    },

    autoFillInTrigger: false, // default
    getAutoFillInTrigger: function() { return this.autoFillInTrigger; },
    getAutoFillInTriggerStr: function() { return this.autoFillInTrigger ? 'On' : 'Off'; },
    handleAutoFillInTriggerChange: function(increment, shiftKey) { 
        // if not initializing
        if (typeof increment === 'number') {
            // Store it
            this.autoFillInTrigger = !this.autoFillInTrigger; 
        }
    
        // Update UI. Using className since there could be several elements that need to be updated
        $('.autoFillInTrigger').html(this.getAutoFillInTriggerStr());
    },

    autoRemoveTrigger: false, // default
    getAutoRemoveTrigger: function() { return this.autoRemoveTrigger; },
    getAutoRemoveTriggerStr: function() { return this.autoRemoveTrigger ? 'On' : 'Off'; },
    handleAutoRemoveTriggerChange: function(increment, shiftKey) { 
        // if not initializing
        if (typeof increment === 'number') {
            // Store it
            this.autoRemoveTrigger = !this.autoRemoveTrigger; 
        }
    
        // Update UI. Using className since there could be several elements that need to be updated
        $('.autoRemoveTrigger').html(this.getAutoRemoveTriggerStr());
    },

    defaultTriggerType: 64, // default
    getDefaultTriggerType: function() { return this.defaultTriggerType; },
    getDefaultTriggerTypeStr: function() { return (this.defaultTriggerType < 0x10 ? '0' : '') + this.defaultTriggerType.toString(16).toUpperCase() + ' (hex)'; }, 
    handleDefaultTriggerTypeChange: function(increment, shiftKey) {
        // if not initializing
        if (typeof increment === 'number') {
            // Limit the value and store it
            let defaultTriggerType = this.defaultTriggerType + (shiftKey ? 16*increment : increment);
            this.defaultTriggerType = Math.min(Math.max(defaultTriggerType, 0), 0xFE);
        }
    
        // Update UI. Using className since there could be several elements that need to be updated
        $('.defaultTriggerType').html(this.getDefaultTriggerTypeStr());
    },

    incrementClockOut: function(increment) { 
        // if not initializing
        if (typeof increment === "number") {
            // Limit the value and store it
            let clockOutIndex = this.getClockOutIndex() + increment;
            clockOutIndex = Math.min(Math.max(clockOutIndex, 0), this.clockOutValues.length-1);
            this.clockOut = this.clockOutValues[clockOutIndex];
        }
        
        // Update UI. Using className since there could be several elements that need to be updated
        $('.clockOut').html(this.getClockOut());
    },

    videoExpander: 'Off', // default
    videoExpanderValues: ['Off', 'USB', 'Clone ==>'],
    getVideoExpanderIndex: function() { return this.videoExpanderValues.indexOf(this.videoExpander); },
    getVideoExpander: function() { return this.videoExpander; },
    handleVideoExpanderChange: function(increment, shiftKey) {
        // if not initializing
        if (typeof increment === 'number') {
            // Limit the value and store it
            let videoExpanderIndex = this.getVideoExpanderIndex() + increment;
            videoExpanderIndex = Math.min(Math.max(videoExpanderIndex, 0), this.videoExpanderValues.length-1);
            this.videoExpander = this.videoExpanderValues[videoExpanderIndex];
        }
        
        // Update UI. Using className since there could be several elements that need to be updated
        $('.videoExpander').html(this.getVideoExpander());
    },

    
    /* Handles incrementing or decrementing the curreent editable value */
    upOrDownClicked: function(increment, shiftKey) {
        // Determine current editable value and its ID.
        const id = Menus.idOfEditableElement(this);

        // Handle depending on ID of the current editable value
        switch(id) {
            case 'screensaver':
                this.handleScreensaverChange(increment, shiftKey);
                break;
            case 'autosaveScreensave':
                this.handleAutosaveScreensaveChange(increment, shiftKey);
                break;
            case 'autoloadProject':
                this.handleAutoloadProjectChange(increment, shiftKey);
                break;
            case 'showBackupFolder':
                this.handleShowBackupFolderChange(increment, shiftKey);
                break;
            case 'keyPressDelay':
                this.handleKeyPressDelayChange(increment, shiftKey);
                break;
            case 'keyHoldRepeat':
                this.handleKeyHoldRepeatChange(increment, shiftKey);
                break;
            case 'navigationWrap':
                this.handleNavigationWrapChange(increment, shiftKey);
                break;
            case 'autoGateOnNote':
                this.handleAutoGateOnNoteChange(increment, shiftKey);
                break;
            case 'autoGateTimeout':
                this.handleAutoGateTimeoutChange(increment, shiftKey);
                break;
            case 'autoFillInTrigger':
                this.handleAutoFillInTriggerChange(increment, shiftKey);
                break;
            case 'autoRemoveTrigger':
                this.handleAutoRemoveTriggerChange(increment, shiftKey);
                break;
            case 'defaultTriggerType':
                this.handleDefaultTriggerTypeChange(increment, shiftKey);
                // Update help info since it should change when value changes
                this.displayDefaultTriggerTypeHelp();
                break;
            case 'videoExpander':
                this.handleVideoExpanderChange(increment, shiftKey);
                break;
            default:
                alert("systemMenu.js error: Don't have list of values for id=" + id);
                return null;
        }
    },

    
    displayDefaultTriggerTypeHelp: function() {
        const type = this.getDefaultTriggerType();

        // For special cases
        switch (type) {
            case 0:
                Menus.helpStr('Gate off', this);
                return;
            case 0xE0:
                Menus.helpStr('One step long Gate', this);
                return;
            case 0xED:
                Menus.helpStr('Special Ratcheting 1001 for step', this);
                return;
            case 0xEE:
                Menus.helpStr('Special Ratcheting  001111 for step', this);
                return;
            case 0xEF:
                Menus.helpStr('Special Ratcheting 110011 for step', this);
                return;
            case 0xFD:
                Menus.helpStr('Toggles the output', this);
                return;
            case 0xFE:
                Menus.helpStr('Turns output on', this);
                return;
        }
        // If first hex digit is zero
        if (type >= 0x01 && type <= 0x0F) {
            Menus.helpStr('Triggers off/on ' + (type*5) + 'msec', this);
            return;
        }

        // If first hex digit set but second digit zero
        if (type > 0 && type <= '0xD0' && type % 16 == 0) {
            Menus.helpStr('Triggers on/off for ' + (5*type/16) + ' msec', this);
            return;
        }

        // If both first and second hex digits are set, but not a special high value
        if (type >= 0x11 && type <= 0xCF) {
            // First digit is 5msec of trigger length. Second digit is number of repetions.
            // 22 triggers ON/OFF/ON/OFF/ON/OFF fast (10ms pulses) 
            // 23 triggers ON/OFF/ON/OFF/ON/OFF/ON/OFF fast (10 ms pulses) 
            // 52 triggers ON/OFF/ON/OFF slower (25ms pulses)
            const trigLength = 5 * Math.floor(type / 16);
            const pulses = (type % 16) + 1;
            Menus.helpStr('Trigger ' + pulses + ' pulses of ' + trigLength + ' msec', this);
            return;
        }
        
        // For larger values
        if (type >= 0xD0 && type <= 0xDF) {
            Menus.helpStr('Trigger ' + (type - 0xD0 + 1) + ' ticks long', this);
            return;
        }

        if (type >= 0xE1 && type <= 0xE8) {
            Menus.helpStr('Ratcheting ' + (type-0xE0) + 'x', this);
            return;            
        }

        if (type >= 0xE9 && type <= 0xEC) {
            Menus.helpStr('Odd ratcheting ' + (type-0xE8) + 'x', this);
            return;            
        }

        if (type >= 0xF0 && type <= 0xF3) {
            Menus.helpStr('Random length within random range ' + (type-0xF0), this);
            return;            
        }

        if (type >= 0xF4 && type <= 0xF7) {
            Menus.helpStr('Random ratcheting within random range ' + (type-0xF4), this);
            return;            
        }

        // Haven't configured yet
        Menus.helpStr('Trigger type is complicated', this);
    },

    
    /* Updates help info. Called by Menus.selectRow(). */
    newRowSelected: function() {
        this.scrollScreenIfNeeded();
        
         // Determine current editable value and its ID.
        const id = Menus.idOfEditableElement(this);

        // Handle depending on ID of the current editable value
        switch(id) {
            case 'screensaver':
                Menus.helpStr('Idle time till screensaver used', this);
                break;
            case 'autosaveScreensave':
                Menus.helpStr('Saves project when times out', this);
                break;                
            case 'autoloadProject':
                Menus.helpStr('Autoload last project at startup', this);
                break;
            case 'keyPressDelay':
                Menus.helpStr('Time till key repeats', this);
                break;
            case 'keyHoldRepeat':
                Menus.helpStr('How fast key repeats', this);
                break;
            case 'navigationWrap':
                Menus.helpStr('If cursor should wrap at end', this);
                break;
            case 'autoGateOnNote':
                Menus.helpStr('Auto adds gate when note created', this);
                break;
            case 'autoGateTimeout':
                Menus.helpStr('Msec till autogate on again', this);
                break;
            case 'autoFillInTrigger':
                Menus.helpStr('Auto creates 40msec trigger', this);
                break;
            case 'autoRemoveTrigger':
                Menus.helpStr('Undocumented in manual!', this);
                break;
            case 'defaultTriggerType':
                this.displayDefaultTriggerTypeHelp();
                break;
            case 'videoExpander':
                Menus.helpStr('Setup of Video Expander module', this);
                break;
            case 'closeMenu':
                Menus.helpStr('[OK] or [<-] to close', this);
                break;
            default:
                Menus.helpStr('', this);
        }
    },

    
    /* After cursor is moved then need to possibly scroll the screen */
    scrollScreenIfNeeded: function() {
        let newRow = this.currentRow;

        // Determine the html editable rows if haven't done so yet
        if (!this.rows) {
            const allRowsInMenu = $('#' + this.elementId + ' tr');
            
            this.rows = new Array(allRowsInMenu.length - 2);
            for (i=0; i<this.rows.length; ++i) {
                this.rows[i] = allRowsInMenu[i+1];

                // Only first few rows should be visible
                if (i >= this.VISIBLE_ROWS) {
                    this.rows[i].style.display = 'none';
                }
            }
        }

        // If need to scroll down
        if (newRow >= this.rowNumOfFirstVisibleRow + this.VISIBLE_ROWS) {
          // Scroll down. First determine how many rows to scroll
          let newRowOfFirstVisibleRow = newRow - this.VISIBLE_ROWS + 1;
        
          // Hide the top rows that were visible but no longer should be
          for (var row = this.rowNumOfFirstVisibleRow; row < newRowOfFirstVisibleRow; ++row) {
            // Hide that row
            let rowToHide = this.rows[row];
            rowToHide.style.display = 'none';
          }
        
          // Make visible the bottom rows that were not visible but now should be
          for (var row = this.rowNumOfFirstVisibleRow + this.VISIBLE_ROWS; row <= newRow; ++row) {
            // Make that row visible
            let rowToHide = this.rows[row];
            rowToHide.style.display = 'table-row';  
          }          
            
          // Remember where scrolled to
          this.rowNumOfFirstVisibleRow = newRowOfFirstVisibleRow; 
        } else if (newRow < this.rowNumOfFirstVisibleRow) {
          // scroll up
          let newRowOfFirstVisibleRow = newRow;
        
          // Hide the bottom rows
          for (var row = newRow + this.VISIBLE_ROWS; row < this.rowNumOfFirstVisibleRow + this.VISIBLE_ROWS; ++row) {
            // Hide that row
            let rowToHide = this.rows[row];
            rowToHide.style.display = 'none';
          }
        
          // Make visible the top rows
          for (var row = newRow; row < this.rowNumOfFirstVisibleRow; ++row) {
            // Make that row visible
            let rowToHide = this.rows[row];
            rowToHide.style.display = 'table-row';  
          }
            
          // Remember where scrolled to
          this.rowNumOfFirstVisibleRow = newRowOfFirstVisibleRow;             
        }

        // Update UI to indicate whether can scroll sequences window
        this.displayScrollingHints(this.rowNumOfFirstVisibleRow);
    },

    
    /* For displaying info indicating whether can scroll up or down */
    displayScrollingHints: function(rowNumOfFirstVisibleRow) {
        // Get dimensions of the titleRow and the helpRow
        const titleRow = $('#' + this.elementId + ' .titleRow')[0];
        var titleRowRect = titleRow.getBoundingClientRect();

        const helpRow = $('#' + this.elementId + ' .helpRow')[0];
        var helpRowRect = helpRow.getBoundingClientRect();

        // Determine how much height is available, where the top should be, and what the height of scrollbar should be
        const MARGIN = 5; // Want a bit of space
        const availableHeight = helpRowRect.top - titleRowRect.bottom - 2*MARGIN;
        
        const top = (titleRowRect.bottom - titleRowRect.top) + MARGIN + (this.rowNumOfFirstVisibleRow / this.rows.length) * availableHeight;
        const height = availableHeight * this.VISIBLE_ROWS / this.rows.length;

        // Set the top and height of scrollbar
        const scrollbar = $('#' + this.elementId + ' .scrollbar')[0];
        scrollbar.style.top = top + 'px';
        scrollbar.style.height = height + 'px';
        
        // Display borders appropriately depending on whether cqn scroll up
        if (rowNumOfFirstVisibleRow != 0)
          titleRow.classList.add('menuBorderIndicatingCanScrollUp');
        else
          titleRow.classList.remove('menuBorderIndicatingCanScrollUp');
        
        // on whether can scroll down
        if (rowNumOfFirstVisibleRow < this.rows.length - this.VISIBLE_ROWS)
          helpRow.classList.add('menuBorderIndicatingCanScrollDown');
        else
          helpRow.classList.remove('menuBorderIndicatingCanScrollDown');
    },

    
    /* Scroll down */
    upArrowClicked: function(shiftKey) {
        Menus.selectRow(this.currentRow - 1, this);        
    },

    /* Scroll up */
    downArrowClicked: function(shiftKey) {
        Menus.selectRow(this.currentRow + 1, this);
    },

    /* Hide the menu and have the last screen get UI events */
    leftArrowClicked: function(shiftKey) {
        Menus.handlePossibleCloseMenu(this);
        
        closeMenuAndRestoreScreen(this);
    },

    rightArrowClicked: function(shiftKey) { 
        Menus.handlePossibleCloseMenu(this);
    }, 

    /* Increment the editable value */
    upClicked: function(shiftKey) { this.upOrDownClicked(1, shiftKey); },

    /* Decrement the editable value */
    downClicked: function(shiftKey) { this.upOrDownClicked(-1, shiftKey); },

    /* If on Close Menu row then will close the menu. Otherwise does nothing */
    okClicked: function(shiftKey) { 
        Menus.handlePossibleCloseMenu(this);
    },
};