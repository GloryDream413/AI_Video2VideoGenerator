const express = require('express')
const app = express()
const port = 7777
const cors = require('cors')
const axios = require('axios')

app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));

async function getPredictionStatus (id) {
  const response = await axios.get(
    'https://api.replicate.com/v1/predictions/' + id,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token r8_5hdsTcr9XS7R8MraiV33ohfHZrFUOVF35l4HR`
      }
    }
  )
  const prediction = response.data
  return prediction
}

async function createPrediction (infile, frame_rate, horizontal_resolution) {
  const response = await axios.post(
    'https://api.replicate.com/v1/predictions',
    {
      version:
        '11095c67166f44781a9274969e75bae32ef7896bc17cb5d95732aa63e7d1b86e',
      input: { infile : infile, frame_rate: frame_rate, horizontal_resolution: horizontal_resolution }
    },
    {
      headers: {
        Authorization: `Token r8_5hdsTcr9XS7R8MraiV33ohfHZrFUOVF35l4HR`,
        'Content-Type': 'application/json'
      }
    }
  )
  const prediction = response.data
  console.log(prediction);
  return prediction
}

app.post('/getImage', async (req, res) => {
  let infile = req.body.infile
  let frame_rate = req.body.frame_rate
  let horizontal_resolution = req.body.horizontal_resolution

  const prediction = await createPrediction(infile, frame_rate, horizontal_resolution)
  let response = null
  let nCount = 0
  const sleep = ms => new Promise(r => setTimeout(r, ms))

  while (prediction.status !== 'succeeded' && prediction.status !== 'failed') {
    await sleep(1000)
    nCount++
    if (nCount >= 600) {
      break
    }
    response = await getPredictionStatus(prediction.id)
    if (response.err || response.output) {
      break
    }
  }

  if (response.output) {
    return res.status(200).send({ response: response })
  } else {
    return res.status(201).send({ response: 'fail' })
  }
})

app.listen(port, () => {
  console.log(`connected on port ${port}`)
})

module.exports = app
