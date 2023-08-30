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
        Authorization: `Token 51cb9f81de883a011305cf4da2346c7c99545d31`
      }
    }
  )
  const prediction = response.data
  return prediction
}

async function createPrediction (image_original, prompt, image_mask) {
  const response = await axios.post(
    'https://api.replicate.com/v1/predictions',
    {
      version:
        '5deb8e4d829cba7939dde1640cc4e4e0d4ba460bd1645895133406f4922a20f8',
      input: { image : image_original, prompt: prompt, mask_image : image_mask,
      num_outputs:1 }
    },
    {
      headers: {
        Authorization: `Token 51cb9f81de883a011305cf4da2346c7c99545d31`,
        'Content-Type': 'application/json'
      }
    }
  )
  const prediction = response.data
  console.log(prediction);
  return prediction
}

async function createMask (image_original) {
  const response = await axios.post(
    'https://api.replicate.com/v1/predictions',
    {
      version:
        '14fbb04535964b3d0c7fad03bb4ed272130f15b956cbedb7b2f20b5b8a2dbaa0',
      input: { image : image_original, min_mask_region_area : 10 }
    },
    {
      headers: {
        Authorization: `Token 51cb9f81de883a011305cf4da2346c7c99545d31`,
        'Content-Type': 'application/json'
      }
    }
  )
  const prediction = response.data;
  return prediction
}

app.post('/getMaskimage', async (req, res) => {
  let image_original = req.body.image_original
  const prediction = await createMask(image_original)
  
  
  let response = null
  let nCount = 0
  const sleep = ms => new Promise(r => setTimeout(r, ms))
  while (prediction.status !== 'succeeded' && prediction.status !== 'failed') {
    await sleep(1000)
    nCount++
    if (nCount >= 60) {
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

app.post('/getImage', async (req, res) => {
  let image_original = req.body.image_original
  let prompt = req.body.prompt
  let image_mask = req.body.image_mask

  const prediction = await createPrediction(image_original, prompt, image_mask)
  let response = null
  let nCount = 0
  const sleep = ms => new Promise(r => setTimeout(r, ms))

  while (prediction.status !== 'succeeded' && prediction.status !== 'failed') {
    await sleep(1000)
    nCount++
    if (nCount >= 60) {
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
