import { AwsService } from './aws/aws.service';
import { Module } from '@nestjs/common';
import { MessagesModule } from './messages/messages.module';
import { AwsModule } from './aws/aws.module';
import { EndpointModule } from './endpoints/endpoint.module';
import { SubscriptionModule } from './subscriptions/subscription.module';

@Module({
  imports: [MessagesModule, AwsModule, EndpointModule, SubscriptionModule],
  controllers: [],
  providers: [AwsService],
})
export class AppModule {}
