class StateMachine {
    constructor(states) {
        this.empty = {
            render: function () { },
            update: function () { },
            processAI: function () { },
            enter: function () { },
            exit: function () { }
        };
        this.states = states;
        this.current = this.empty;
        this.currentStateName = ""
    }
    change(stateName, params) {
        if (!this.states.hasOwnProperty(stateName))
            throw Messages.StateDoesNotExists;

        this.current.exit();
        this.current = new this.states[stateName](this);        
        this.currentStateName = stateName
        this.current.enter(params);
    }
    update(params) {
        this.current.update(params);
    }
    render() {
        this.current.render();
    }
    processAI(params) {
        this.current.processAI(params);
    }
}


