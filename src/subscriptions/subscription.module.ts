import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { AwsModule } from '../aws/aws.module';
import { AwsService } from '../aws/aws.service';

@Module({
  imports: [AwsModule],
  controllers: [SubscriptionController],
  providers: [AwsService]
})
export class SubscriptionModule {}
