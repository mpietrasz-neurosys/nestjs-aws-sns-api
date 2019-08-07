import { ApiModelProperty } from "@nestjs/swagger";

export class UnsubscribeDto {
  @ApiModelProperty()
  arn: string;
}