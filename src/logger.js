import pino from 'pino';

const logger = pino({
    browser: {
        serialize: true,
        asObject: true,
        transmit: {
            send: (level, logEvent) => {
                console.log(`${level}:`, logEvent);
            },
        },
    },
});

export default logger;