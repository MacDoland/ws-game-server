const config = require('./config');

const Logger = (colour = config.consoleColours.white) => {

    return {
        log: (...args) => {
            if(typeof(console) !== 'undefined') {

                if(args.length > 0){
                    args.unshift(colour);
                    args.splice(2, 0, config.consoleColours.white);
                }

                console.log(...args);
            }
        }
    }
}

module.exports = Logger;