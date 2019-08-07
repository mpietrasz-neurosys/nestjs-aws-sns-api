import { Controller, Put, Body, Patch, Query, Param } from '@nestjs/common';
import { UnsubscribeDto } from './unsubscribe.dto';
import { AwsService } from '../aws/aws.service';
import { SubscribeRequestDto } from './subscribe-request.dto';
import { ApiUseTags } from '@nestjs/swagger';
import { SubscribeParamsDto } from './subscribe-params.dto';

@ApiUseTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly service: AwsService) {}
  
  @Patch('/:arn')
  async subscribe(@Param() params: SubscribeRequestDto, @Body() body: SubscribeParamsDto) {
    return await this.service.subscribe(params.arn, body.enabled);
  }
}
