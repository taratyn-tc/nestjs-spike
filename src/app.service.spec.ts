import { AppService } from './app.service';

describe('AppService', () => {
  describe('getHello', () => {
    let appService: AppService | null = null;
    beforeEach(() => {
      appService = new AppService();
      return () => {
        appService = null;
      };
    });
    it('should return "Hello World!"', () => {
      // Act
      const result = appService!.getHello();
      // Assert
      expect(result).toBe('Hello World!');
    });
    it('should return the parameter provided', () => {
      const who = 'NestJS';
      const result = appService!.getHello(who);
      expect(result).toBe(`Hello ${who}!`);
    });
    it('should return "Hello World!" when the parameter is an empty string', () => {
      const who = '';
      const result = appService!.getHello(who);
      expect(result).toBe('Hello World!');
    });
  });
});
