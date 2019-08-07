import { AwsService } from '../aws/aws.service';
import { CreateMessageDto } from './create-message.dto';
import { Controller, Body, Post } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('messages')
@Controller('messages')
export class MessageController {
  constructor(private readonly AwsService: AwsService) {}

  @Post()
  sendMessage(@Body() body: CreateMessageDto): any {
    this.AwsService.sendMessage(body.token, body.arn, body.message);
    return 'message send';
  }
}
