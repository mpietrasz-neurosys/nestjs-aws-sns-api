import { CreateEndpointDto } from './create-endpoint.dto';
import { Controller, Post, Body, Query, Get, Param } from '@nestjs/common';
import { AwsService } from '../aws/aws.service';
import { GetEndpointsDto } from './get-endpoint.dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('endpoints')
@Controller('endpoints')
export class EndpointController {
  constructor(private readonly service: AwsService) {}

  @Post('/')
  createEndpoint(@Body() body: CreateEndpointDto) {
    return this.service.createEndpoint(body.token);
  }
  
  @Get('/:arn')
  listEndpoints(@Param() body: GetEndpointsDto) {
    return this.service.getApplicationEndpoints(body.arn);
  }
}
