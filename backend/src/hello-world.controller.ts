import { Controller, Get } from '@nestjs/common';

@Controller()
export class HelloWorldController {
  @Get()
  getHello(): string {
    console.log('Handling GET request to return Hello World message');
    try {
      const message = 'Hello World';
      return message;
    } catch (error) {
      console.error('Error in getHello:', error.message, error.stack);
      throw error;
    }
  }
}