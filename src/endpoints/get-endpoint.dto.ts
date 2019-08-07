import { ApiModelProperty } from "@nestjs/swagger";

export class GetEndpointsDto {
  @ApiModelProperty()
  arn: string;
}