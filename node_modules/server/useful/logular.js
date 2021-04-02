
const assert = require('assert');

Object.defineProperty(global, '__stack', {
    get: function() {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack) {
            return stack;
        };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});

class Logular {
    static TRACE = 0;
    static DEBUG = 1;
    static INFO = 2;
    static WARN = 3;
    static ERROR = 4;
    static FATAL = 5;

    static NAMES = { 0: "TRACE", 1: "DEBUG", 2: "INFO ", 3: "WARN ", 4: "ERROR", 5: "FATAL" };

    constructor(level, prefix) {
        assert(level >= Logular.TRACE <= Logular.FATAL);
        this.level = level;
        this.prefix = prefix;
    }

    log(level, message) {
        const frame = this.getTrace(__stack[1]);
        this.doLog(frame, level, message);
    }

    trace(message) { 
        const frame = this.getFrame(__stack[1]);
        this.doLog(frame, Logular.TRACE, message); 
    }
    info(message) { 
        const frame = this.getFrame(__stack[1]);
        this.doLog(frame, Logular.INFO, message); 
    }
    debug(message) { 
        const frame = this.getFrame(__stack[1]);
        this.doLog(frame, Logular.DEBUG, message); 
    }
    warn(message) { 
        const frame = this.getFrame(__stack[1]);
        this.doLog(frame, Logular.WARN, message); 
    }
    error(message) { 
        const frame = this.getFrame(__stack[1]);
        this.doLog(frame, Logular.ERROR, message); 
    }
    fatal(message) { 
        const frame = this.getFrame(__stack[1]);
        this.doLog(frame, Logular.FATAL, message); 
    }

    getFrame(stack) {
        const now = new Date();
        return {
            file: stack.getFileName().replace(this.prefix, '...'),
            lineno: stack.getLineNumber(),
            timestamp: now.toLocaleDateString() + " " + now.toLocaleTimeString()
        }
    }
    
    doLog(frame, level, message) {
        if (level >= this.level) {
            console.log(`${frame.timestamp} [${Logular.NAMES[level]}] : ${message} in ${frame.file}:${frame.lineno}`);
        }
    }
}

let defaultLogger = new Logular(Logular.WARN, 'C:\\Users\\afs\\git\\passport-authentication-example');

module.exports = {
    Logular: Logular,
    defaultLogger: defaultLogger
};