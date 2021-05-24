# Vonage Node.js Skeleton Application

<img src="https://developer.nexmo.com/assets/images/Vonage_Nexmo.svg" height="48px" alt="Nexmo is now known as Vonage" />

This repository is an Express application to test and debug your Vonage credentials and environment. Utilize this application to test that your API credentials are in working order. And to examine the event webhook data you receive when Vonage receives API requests from your account.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)


* [Requirements](#requirements)
* [Installation and Usage](#installation-and-usage)
  * [API Credentials](#api-credentials)
  * [Using ngrok](#using-ngrok)
  * [Running the Application](#running-the-application)
* [Contributing](#contributing)
* [License](#license)

## Requirements

This application requires that you have the following installed locally:

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [body-parser](https://github.com/expressjs/body-parser)
* [Vonage Node.js SDK](https://www.npmjs.com/package/@vonage/server-sdk)

Additionally, to test your Vonage account, you must have a Vonage account. You can create a Vonage account for free or manage your Vonage account details at the [Vonage Dashboard](https://dashboard.nexmo.com).

## Installation and Usage

You can run this application by first cloning this repository locally:

```bash
git clone git@github.com:Nexmo/node-skeleton-app.git
```

Alternatively, you could also first fork your copy of this repository to your GitHub profile and then clone your forked copy.

Once you have downloaded a local copy, change into the directory of the application in your terminal. You can now set up the application for your Vonage account.

### API Credentials

To test your API credentials, rename the provided `.env.example` file to `.env` and supply the values for the following environment variable keys:

* VONAGE_API_KEY=
* VONAGE_API_SECRET=
* FROM_NUMBER=
* TO_NUMBER=

The `VONAGE_API_KEY` and `VONAGE_API_SECRET` are to be provided with your API key and secret, respectively. The `FROM_NUMBER` is the number you wish the test SMS message to originate from. For example, this could be your [Vonage provisioned virtual phone number](https://developer.nexmo.com/numbers/overview). The `TO_NUMBER` is the number you wish to send the test SMS message to. This could be your cell phone number.

As always, make sure not to commit your sensitive API credential data to any public version control. If you are using Git, you can add the `.env` file to your `.gitignore` file to ensure that it is not committed.

### Using ngrok

To test the incoming webhook data from Vonage, the Vonage API needs an externally accessible URL to send that data to. Commonly used service for development and testing is ngrok. The service provides you with an externally available web address that creates a secure tunnel to your local environment. The [Vonage Developer Platform](https://developer.nexmo.com/concepts/guides/testing-with-ngrok) has a guide to getting started with testing with ngrok.

Once you have your ngrok URL, you can enter your [Vonage Dashboard](https://dashboard.nexmo.com) and supply it as the `EVENT URL` for any Vonage service that sends event data via a webhook. A good test case is creating a Voice application and providing the ngrok URL in the following format as the event URL:

`#{ngrok URL}/webhooks/event`

You can then call your Vonage Voice application. With your skeleton application running, you can observe the webhook data being received in real-time for the diagnosis of any issues and testing of your Vonage account.

### Running the Application

Once you have your API credentials incorporated and your ngrok setup ready, you can go ahead and use this skeleton app. To start the application's server, run the following from the command line inside the directory of the app:

```bash
npm start
```

You can test that your credentials work by sending a test SMS by navigating to `https://localhost:3000/test-sms` in your browser or by sending a cURL GET request to that URL. If you configured your `TO_NUMBER` to be your number, you should receive a text message shortly after that says: "This is a test SMS of my Vonage Node.js skeleton app.".

The skeleton app is also capable of receiving Vonage API webhook data. As mentioned in the [Using ngrok](#using-ngrok) section above, a good candidate for that test is a Vonage Voice application. From within your Vonage dashboard you can create a Vonage Voice application, provision a Vonage virtual phone number and then link that number to your Voice application. Once you have ensured that your new Voice application's `EVENT URL` is `#{ngrok URL}/webhooks/event`, you can then give your Vonage number a phone call. You should see the webhook data in your console in real time. For example, data for a ringing phone call will look like this:

```
{
  from: '447481731234',
  to: '447451271234',
  uuid: '952eecad46c941f10d77aafcacfb944e',
  conversation_uuid: 'CON-ad9231ee-445c-4866-87d5-4a8e2d3edfe9',
  status: 'ringing',
  direction: 'inbound',
  timestamp: '2020-03-19T18:47:52.829Z'
}
```

You can close your application at any time by holding down the CTRL and C keys on your keyboard.

## Contributing

We ❤️ contributions from everyone! [Bug reports](https://github.com/Nexmo/node-skeleton-app/issues), [bug fixes](https://github.com/Nexmo/node-skeleton-app/pulls), and feedback on the application is always appreciated. Look at the [Contributor Guidelines](https://github.com/Nexmo/node-skeleton-app/blob/master/CONTRIBUTING.md) for more information and please follow the [GitHub Flow](https://guides.github.com/introduction/flow/index.html).

## License

This project is under the [MIT License](LICENSE)
