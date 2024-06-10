/* Data that defines a project */

let _project = {
    /* Initializes all the elements in the UI that display project data */
    updateUI: function() {
        this.setName();
        this.setTempo();
        this.setMainClockIndex();
    },
        
    name: null,
    getName: function() { return this.name; },
    getNameStr: function() { return this.name ? this.name : 'unnamed'; },
    // Sets name of project and updates UI
    setName: function(name) { 
        if (name)
            this.name = name; 

        // Update UI. Since there are multiple places where projectName displayed need to use class name
        $('.projectName').html(this.getNameStr());
    },
    
    tempo: 128,
    getTempo: function() { return this.tempo; },
    getTempoStr: function() { return this.tempo + ' BPM'; },
    // Sets the tempo and updates the UI
    setTempo: function(tempo) { 
        if (tempo) {
            // Limit the value and store it
            tempo = Math.min(Math.max(tempo, 1), 1000);
            this.tempo = tempo; 
        }

        // Update UI. Using className .tempo since there are several
        $('.tempo').html(this.getTempo());
    },

    swing: null,
    getSwingStr: function() { return this.swing ? this.swing : '---'; },
    setSwingStr: function(swing) { this.swing = swing; },
    
    mainClockIndex: 6,
    mainClockValues: [1, 2, 4, 8, 16, 32, 64],
    getMainClockIndex: function() { return this.mainClockIndex; },
    getMainClockStr: function() { return this.mainClockValues[this.mainClockIndex]; },
    setMainClockIndex: function(mainClockIndex) {
        if (typeof mainClockIndex === "number" && mainClockIndex >= 0) {
            // Limit the value and store it
            mainClockIndex = Math.min(Math.max(mainClockIndex, 0), this.mainClockValues.length-1);
            this.mainClockIndex = mainClockIndex;
        }
        
        // Update UI. Using className .mainClock since there could be several 
        $('.mainClock').html(this.getMainClockStr());
    },

    liveCuePoints: 16,
    getLiveCuePoints: function() { return this.liveCuePoints; },
    setLiveCuePoints: function(liveCuePoints) { this.liveCuePoints = liveCuePoints; },
    
    clockIn: 'Internal',
    getClockIn: function() { return this.clockIn; },
    setClockIn: function(clockIn) { this.clockIn = clockIn; },

    clockOut: '1/16',
    getClockOut: function() { return this.clockOut; },
    setClockOut: function(clockOut) { this.clockOut = clockOut; },

    transpose: null,
    setTranspose: function(transpose) { this.transpose = transpose; },
    getTransposeStr: function() { return this.transpose ? this.transpose : '--- > ---'},
    
    scale: '00:Chromatic',
    setScaleStr: function(scale) { this.scale = scale; },

    editing: true,
    getEditing: function() { return this.editing; },
    getEditingStr: function() { return this.editing ? 'on' : 'off'; },
};