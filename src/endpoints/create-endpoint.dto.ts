import { ApiModelProperty } from "@nestjs/swagger";

export class CreateEndpointDto {
  @ApiModelProperty()
  token: string;
}