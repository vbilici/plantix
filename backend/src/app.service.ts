import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    try {
      const message = 'OK!';
      return message;
    } catch (error:any) {
      console.error('Error in Helath:', error.message, error.stack);
      throw error;
    }
  }
}
