const Collections = require('../models/collections');
const { StatusCodes } = require('http-status-codes');
const { generateUploadUrl } = require('../s3bucket/bucket')

const getAllCollections = async (req, res) => {
  try {
    const allCollections = await Collections.find({})
    if (!allCollections) res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Something went wrong'
    })
    return res.status(StatusCodes.OK).json(allCollections)
  } catch (err) {
    if (err) res.status(StatusCodes.BAD_REQUEST).json({ err })
  }
}

const createCollection = async (req, res) => {
  if (!req.body) res.status(StatusCodes.BAD_REQUEST).json({
    message: 'Please provide all required info'
  })
  try {
    const { name, description, topic, imageUrl, createdBy, customFields } = req.body
    const newCollection = await Collections.create({ name: name, description: description, topic: topic, imageUrl: imageUrl, createdBy: createdBy, customFields: customFields });
    if (!newCollection) res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Something went wrong'
    })
    return res.status(StatusCodes.CREATED).json({
      message: 'New collection created successfully'
    })
  } catch (err) {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }
}

const editCollection = async (req, res) => {
  if (!req.body || !req.params) res.status(StatusCodes.BAD_REQUEST).json({
    message: 'Please provide all required info'
  })
  try {
    const { name, description, topic, imageUrl } = req.body
    const { id } = req.params
    const updatedCollection = await Collections.findOneAndUpdate({ _id: id }, { name: name, description: description, topic: topic, imageUrl: imageUrl }, { new: true });
    if (!updatedCollection) res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Something went wrong'
    })

    return res.status(StatusCodes.CREATED).json({
      message: 'Collection updated successfully'
    })
  } catch (err) {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }
}

const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params
    await Collections.findOneAndDelete({ _id: id })
    return res.status(StatusCodes.OK).json({
      message: 'Collection deleted successfully'
    })
  } catch (err) {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }
}

const getS3Url = async (req, res) => {
  try {
    const url = await generateUploadUrl();
    
    if (!url) res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Something went wrong'
    })
    return res.status(StatusCodes.OK).json(url)
  } catch (err) {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }
}

const getLargestFiveCollections = async (req, res) => {
  try {
    const collections = await Collections.aggregate([
      {
        $lookup: {
          from: 'collectionitems',
          localField: '_id',
          foreignField: 'collectionId',
          as: 'items',
        },
      },
      {
        $addFields: {
          itemCount: { $size: '$items' },
        },
      },
      {
        $lookup: {
          from: 'collectionusers',
          localField: 'createdBy',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          topic: 1,
          imageUrl: 1,
          itemCount: 1,
          author: { $arrayElemAt: ['$user.name', 0] },
        },
      },
      { $sort: { itemCount: -1 } },
      { $limit: 5 },
    ]);
    if (!collections) res.status(StatusCodes.BAD_REQUEST).json({
      message: "Something went wrong"
    })
    return res.status(StatusCodes.OK).json(collections)
  } catch (err) {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }
}
module.exports = {
  getAllCollections,
  createCollection,
  editCollection,
  deleteCollection,
  getS3Url,
  getLargestFiveCollections
}