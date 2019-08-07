import { ApiModelProperty } from "@nestjs/swagger";

export class SubscribeRequestDto {
  @ApiModelProperty()
  arn: string;
}