const Tags = require('../models/tags');
const { StatusCodes } = require('http-status-codes')

const getAllTags = async (req, res) => {
  try {
    const tags = await Tags.find({});
    if (!tags) res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Something went wrong'
    })

    return res.status(StatusCodes.OK).json(tags)
  } catch (err) {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }
}

const createTags = async (req, res) => {
  if (!req.body) res.status(StatusCodes.BAD_REQUEST).json({
    message: 'Please provide all required info'
  })
  try {
    const { title } = req.body
    const newTag = await Tags.create({ title: title });
    if (!newTag) res.status(StatusCodes.BAD_REQUEST).json({
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
  getAllTags,
  createTags
}