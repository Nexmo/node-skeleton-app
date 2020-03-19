require('dotenv').config({path: __dirname + '/.env'})
const app = require('express')()
const bodyParser = require('body-parser')
const Nexmo = require('nexmo')

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))


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
  const text = 'This is a test SMS of my Nexmo Node.js skeleton app.'

  nexmo.message.sendSms(process.env.FROM_NUMBER, process.env.TO_NUMBER, text, (err, responseData) => {
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
