import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect().catch(error => {
      console.error('Error connecting to the database', error.message, error.stack);
      process.exit(1);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect().catch(error => {
      console.error('Error disconnecting from the database', error.message, error.stack);
    });
  }
}