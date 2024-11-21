const isProduction = process.env.NODE_ENV === 'production';

const logger = {
  log: (message?: any, ...optionalParams: any[]) => {
    if (!isProduction) {
      // eslint-disable-next-line no-console
      console.log(message, ...optionalParams);
    }
  },
  error: (message?: any, ...optionalParams: any[]) => {
    // eslint-disable-next-line no-console
    console.error(message, ...optionalParams);
  },
  warn: (message?: any, ...optionalParams: any[]) => {
    if (!isProduction) {
      // eslint-disable-next-line no-console
      console.warn(message, ...optionalParams);
    }
  },
  info: (message?: any, ...optionalParams: any[]) => {
    if (!isProduction) {
      // eslint-disable-next-line no-console
      console.info(message, ...optionalParams);
    }
  },
};

export default logger;
