import { ApiModelProperty } from "@nestjs/swagger";

export class CreateMessageDto {
  @ApiModelProperty()
  readonly token: string;

  @ApiModelProperty()
  readonly arn: string;

  @ApiModelProperty()
  readonly message: string;
}