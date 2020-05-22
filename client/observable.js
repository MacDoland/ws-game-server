class Observable {

    constructor() {
        this.dependants = [];
        this.state = {};
    }

    getState() {
        return { ...this.state };
    }

    setState(state) {
        Object.assign(this.state, state)
        this.dependants.forEach(dependant => dependant.notify(this.state));
    }

    subscribe(observer) {
        this.dependants.push(observer);
    }

    unsubscribe(observer) {
        this.dependants = this.dependants.filter(dependant != observer);
    }

}

export default Observable;