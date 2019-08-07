import { AwsModule } from '../aws/aws.module';
import { AwsService } from '../aws/aws.service';
import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';

@Module({
  imports: [AwsModule],
  controllers: [MessageController],
  providers: [AwsService],
})
export class MessagesModule {}
