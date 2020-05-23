import Observable from "./observable.js";

class InputManager extends Observable {
  constructor() {
    super();

    document.addEventListener("keyup", ({ keyCode }) => {
      if (keyCode > 64 && keyCode < 91) {
        let key = String.fromCharCode(keyCode);
        let state = {};
        state[key] = false;

        this.setState(state);
      }
    });

    document.addEventListener("keydown", ({ keyCode }) => {
      if (keyCode > 64 && keyCode < 91) {
        let key = String.fromCharCode(keyCode);
        let state = {};
        state[key] = true;

        this.setState(state);
      }
    });
  }
}

export default new InputManager();
