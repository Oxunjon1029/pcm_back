const Topics = require('../models/topic');
const { StatusCodes } = require('http-status-codes')

const getAllTopic = async (req, res) => {
  try {
    const topics = await Topics.find({});
    if (!topics) res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Something went wrong'
    })

    return res.status(StatusCodes.OK).json(topics)
  } catch (err) {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }
}

const createTopic = async (req, res) => {
  if (!req.body) res.status(StatusCodes.BAD_REQUEST).json({
    message: 'Please provide all required info'
  })
  try {
    const { title } = req.body
    const newTopic = await Topics.create({ title: title });
    if (!newTopic) res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Something went wrong'
    })

    return res.status(StatusCodes.CREATED).json({
      message: 'New topic created successfully'
    })
  } catch (err) {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }
}

module.exports = {
  getAllTopic,
  createTopic
}