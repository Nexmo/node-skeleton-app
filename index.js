require('dotenv').config({path: __dirname + '/.env'})
const app = require('express')()
const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET
})

app
  .route('/webhooks/event')
  .get(eventWebhook)
  .post(eventWebhook)

app
  .route('/sms')
  .get(sendSms)
  .post(sendSms)

function eventWebhook(request, response) {
  const params = Object.assign(request.query, request.body)
  console.log(params)
  response.status(204).send()
}

function sendSms(request, response) {
  const text = 'This is a test SMS of my Vonage Node.js skeleton app.'

  vonage.message.sendSms(process.env.FROM_NUMBER, process.env.TO_NUMBER, text, (err, responseData) => {
    if (err) {
      response.status(404).send(err)
    } else {
      if (responseData.messages[0]['status'] === "0") {
        response.status(200).send({status: "Message sent successfully."})
      } else {
        response.status(500).send({status: `Message failed with error: ${responseData.messages[0]['error-text']}`})
      }
    }
  })

}

app.listen(process.env.PORT || 3000)
