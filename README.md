# Push-notification
nestJS + Cordova

## NESTJS API

```bash
git clone git@github.com:mpietrasz-neurosys/nestjs-aws-sqs-api.git api
```

## CORDOVA APPLICATION
```bash
git clone git@github.com:mpietrasz-neurosys/cordova-aws-sns.git ui
```

## POST INSTALLATION

### API
```bash
cd api
npm install
npm run start
```

### UI
```bash
cd ui
npm install
cordova platform add android@6.3.0 //I've done it only for android platform
cordova build android
cordova run android
```

## PRE-REQUIREMENTS
Use [ngrok](https://ngrok.com/) for exposing you local env

Expose you local api to to access api from device.

Open directory with installed ngrok and type
```bash
./ngrok http 3000
```
![ngork](https://github.com/mpietrasz-neurosys/nestjs-aws-sqs-api/blob/master/assets/img/ngork.png?raw=true)

it will expose you localhost:3000 into something similar: http://07c1729f.ngrok.io

Additional on [http://127.0.0.1:4040](http://127.0.0.1:4040) you can watch all requests with request params and responses

## CODE-REQUIREMENTS
Go to ui directory and edit
`www/js/api.js`
In line `#1` edit API_URL from ngrok endpoint

# API
[API](http://localhost:3000) is available on http://localhost:3000

[SWAGGER](http://localhost:3000/api) is available on http://localhost:3000/api

With swagger You can simulate message sending, fetching devices and enable/disable subscription

Available endpoints in swagger
* `POST /messages` send message to device
* `POST /endpoints` add endpoint
* `GET /endpoints/{arn}` fetch all available endpoints
* `PATCH /subscriptions/{arn}` update subscription - set disable or enabled based on parameter `enabled`

## DICTIONARY
- `arn` Amazon Resource Names

# USABILITY
Create project in [https://console.firebase.google.com](https://console.firebase.google.com) and download google-services.json from FCB General settings tab

![firebase cloud messaging](https://github.com/mpietrasz-neurosys/nestjs-aws-sqs-api/blob/master/assets/img/fcb-general.png?raw=true)

Copy this file to you ui `/platforms/android` directory with the same name `google-service.json`

Next open `/www/js/index.js` file and serach for this fragment:
```javascript
  const push = PushNotification.init({
      android: {
          senderID: 921201619887
      },
      browser: {
          pushServiceURL: 'https://push-notifications-a6429.firebaseio.com'
      },
  });
```
replace senderID, and pushServiceURL.

`SenderID` and `PushServiceURL` can be fetched from `google-service.json` file in the top of the page:
```json
{
  "project_info": {
    "project_number": "921201619887",
    "firebase_url": "https://push-notifications-a6429.firebaseio.com",
    "project_id": "push-notifications-a6429",
    "storage_bucket": "push-notifications-a6429.appspot.com"
  }
}
```
copy `project_number` and `firebase_url`

Next open [https://console.aws.amazon.com](https://console.aws.amazon.com)

and create SNS (Simple Notification Service)

Next in left menu (Push notification), add new platform application. Select Firebase Cloud Messaging (FCM) in the type of application.
Also the API KEY is stored in FCB admin panel.

![push notification](https://github.com/mpietrasz-neurosys/nestjs-aws-sqs-api/blob/master/assets/img/push-notification.png?raw=true)


Each platform has own ARN endpoint

![arn platform settings](https://github.com/mpietrasz-neurosys/nestjs-aws-sqs-api/blob/master/assets/img/arn-platform.png?raw=true)

Copy platform ARN endpoint to api config file located in `src/config.ts`, replace `arn_url`

From browser url also copy region code `us-east-1` for example and replace `region` in `config.ts` file

`config.ts` file has additional two fields that needs to be filled `access_key_id` and `secret_access_key`
This can be copied from aws Security Credentials page. Open Access keys and click on Create New Access Key. Replace values

When application is configured, run cordova application with `cordova run android`

When ui starts, new endpoint is created on AWS SNS service.

![endpoints in AWS SNS panel](https://github.com/mpietrasz-neurosys/nestjs-aws-sqs-api/blob/master/assets/img/endpoints.png?raw=true)

Each device has token, and ARN. Each device can be disabled, enabled.

When there is multiple connected devices, list all of them in swagger 

[http://localhost:3000/api/#/endpoints/get_endpoints__arn_](http://localhost:3000/api/#/endpoints/get_endpoints__arn_)
required parameter is `arn` which is platform ARN (not device arn)

API url `/endpoints/{arn}` will return all available devices.

By running [http://localhost:3000/api/#/subscriptions/patch_subscriptions__arn_](http://localhost:3000/api/#/subscriptions/patch_subscriptions__arn_)
each device can be enabled or disabled.

Send `device arn` in path paremeter and `body`:
```json
{
  "enabled": boolean
}
```
`true` for enable, `false` for disable device

When device is enabled, send message to this device with

[http://localhost:3000/api/#/messages/post_messages](http://localhost:3000/api/#/messages/post_messages)
and body:
```json
{
  "token": "string",
  "arn": "string",
  "message": "string"
}
```
`token` and `arn` can be taken from AWS SNS panel, or previous url `/endpoints/{arn}`

## UI APPLICATION

Application will send device token to API on init.

`Device ARN` will be stored in local storage (normally this should be fetch only first time, and on second login this arn and token should be stored also in db)

Application allows to subscribe / unsubscribe on successfull initialization.

![device view](https://github.com/mpietrasz-neurosys/nestjs-aws-sqs-api/blob/master/assets/img/device.png?raw=true)

When device is disabled then the message wont be send.

## @TODO

- [ ] Tests
- [ ] Dtos & Interfaces
- [ ] Adjust structure
- [ ] Prompt to enable/disable notification
- [ ] Send device token to AWS on user login not on application init
- [ ] Disable token when user logout
- [ ] Connect api with some admin panel to send messages
- [ ] Allow multiple message sending
- [ ] a lot more
- [ ] ... to be continued