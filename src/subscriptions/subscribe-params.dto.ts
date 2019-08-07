import { ApiModelProperty } from "@nestjs/swagger";

export class SubscribeParamsDto {
  @ApiModelProperty()
  enabled: boolean;
}