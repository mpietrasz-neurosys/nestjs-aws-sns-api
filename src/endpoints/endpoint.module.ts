import { Module } from '@nestjs/common';
import { EndpointController } from './endpoint.controller';
import { AwsService } from '../aws/aws.service';
import { AwsModule } from '../aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [EndpointController],
  providers: [AwsService]
})
export class EndpointModule {}
