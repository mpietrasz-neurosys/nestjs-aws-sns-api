import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import config from '../config'

@Injectable()
export class AwsService {
  queueUrl: string;

  constructor() {
    this.queueUrl = config.arn_url;

    AWS.config.update({
      accessKeyId: config.access_key_id,
      secretAccessKey: config.secret_access_key,
      region: config.region
    });
  }

  private getSnsClient() {
    return new AWS.SNS();
  }

  public async getApplicationAttributes() {
    var sns = this.getSnsClient();

    const params = {
      PlatformApplicationArn: config.arn_url,
    }

    try {
      return await sns.getPlatformApplicationAttributes(params).promise();
    } catch (err) {
      return err.message;
    }
  }

  async createEndpoint (token: string) {
    var sns = this.getSnsClient();

    const params = {
      PlatformApplicationArn: config.arn_url,
      Token: token,
    };

    try {
      const response = await sns.createPlatformEndpoint(params).promise();

      return {
        arn: response.EndpointArn
      };
    } catch (err) {
      return err.message;
    }
  }

  async getApplicationEndpoints (arn: string) {
    var sns = this.getSnsClient();

    const params = {
      PlatformApplicationArn: arn,
    };

    try {
      return await sns.listEndpointsByPlatformApplication(params).promise();
    } catch (err) {
      return err.message;
    }
  }

  async unsubscribe (arn: string) {
    var sns = this.getSnsClient();

    const params = {
      EndpointArn: arn,
      Attributes: {
        Enabled: "false",
      },
    };

    try {
      return await sns.setEndpointAttributes(params).promise();
    } catch (err) {
      return err.message;
    }
  }

  async subscribe (arn: string, enabled: boolean) {
    var sns = this.getSnsClient();

    const params = {
      EndpointArn: arn,
      Attributes: {
        Enabled: String(enabled),
      },
    };

    try {
      return await sns.setEndpointAttributes(params).promise();
    } catch (err) {
      return err.message;
    }
  }

  sendMessage(token: string, arn: string, message: string) {
    var sns = this.getSnsClient();

    var payload: any = {
      GCM: {
        "data": {
          "title": "My Title",
          "message": message,
          "key1": "data 1",//additional data that can be retrieve in cordova app
        },
      },
    };
  
    // first have to stringify the inner APNS object...
    payload.GCM = JSON.stringify(payload.GCM);
    // then have to stringify the entire message payload
    payload = JSON.stringify(payload);
  
    sns.publish({
      Message: payload,
      MessageStructure: 'json',
      TargetArn: arn
    }, function(err, data) {
      if (err) {
        console.log(err.stack);
        return;
      }
    });
  }
}
