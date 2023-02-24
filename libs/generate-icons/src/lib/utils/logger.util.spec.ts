import { Logger } from './logger.util';

describe('Logger', () => {
  it('should create instance', () => {
    const logger = new Logger();
    expect(logger).toBeDefined();
  });

  describe('warn', () => {
    it('should log warn', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation();
      const logger = new Logger('info');
      logger.warn('Test');
      expect(logSpy).toHaveBeenCalled();
    });
  });

  describe('info', () => {
    it('should not log when disabled', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation();
      const logger = new Logger('disabled');
      logger.info('Test');
      expect(logSpy).not.toHaveBeenCalled();
    });

    it('should log info', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation();
      const logger = new Logger();
      logger.info('Test');
      expect(logSpy).toHaveBeenCalled();
    });
  });

  describe('debug', () => {
    it('should log debug', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation();
      const logger = new Logger('debug');
      logger.debug('Test');
      expect(logSpy).toHaveBeenCalled();
    });

    it('should not log debug when info', () => {
      const logSpy = jest.spyOn(console, 'log').mockImplementation();
      const logger = new Logger('info');
      logger.debug('Test');
      expect(logSpy).not.toHaveBeenCalled();
    });
  });
});
