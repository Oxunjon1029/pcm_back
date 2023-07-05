const Items = require('../models/collectionItems');
const { StatusCodes } = require('http-status-codes')
const getAllCollectionItems = async (req, res) => {
  if (!req.params) res.status(StatusCodes.BAD_REQUEST).json({
    message: 'Please provivde all required info'
  })
  try {
    const items = await Items.find({});
    if (!items) res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Something went wrong'
    })

    return res.status(StatusCodes.OK).json(items)
  } catch (err) {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }
}
const getAllCollectionItemsByCollectionId = async (req, res) => {

  const { collectionId } = req.query
  if (collectionId !== undefined) {
    try {

      const items = await Items.find({ collectionId: collectionId });
      if (!items) res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Something went wrong'
      })

      return res.status(StatusCodes.OK).json(items)

    } catch (err) {
      if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
    }
  } else {
    return res.status(StatusCodes.OK).json({
      message: 'Everything is ok!!'
    })
  }
}

const createCollectionItem = async (req, res) => {
  if (!req.body || !req.params) res.status(StatusCodes.BAD_REQUEST).json({
    message: 'Please provivde all required info'
  })
  try {
    const { collectionId } = req.params
    const { name, uztags, entags } = req.body

    const newItem = await Items.create({ name: name, uztags: uztags, entags: entags, collectionId: collectionId })
    if (!newItem) res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Something went wrong'
    })
    return res.status(StatusCodes.CREATED).json({
      message: 'New item created successfully'
    })
  } catch (err) {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }
}

const editCollectionItem = async (req, res) => {
  if (!req.body || !req.params) res.status(StatusCodes.BAD_REQUEST).json({
    message: 'Please provivde all required info'
  })
  try {
    const { itemId } = req.params;
    const { name, uztags, entags, } = req.body
    const updatedItem = await Items.findOneAndUpdate(
      { _id: itemId },
      {
        name: name,
        uztags: uztags,
        entags: entags,
      },
      { new: true });
    if (!updatedItem) res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Something went wrong'
    })

    return res.status(StatusCodes.CREATED).json({
      message: 'Item updated successfully'
    })
  } catch (err) {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }
}

const deleteCollectionItem = async (req, res) => {
  if (!req.params) res.status(StatusCodes.BAD_REQUEST).json({
    message: 'Please provivde all required info'
  })
  try {
    const { itemId } = req.params;
    await Items.findOneAndDelete({ _id: itemId })
    return res.status(StatusCodes.OK).json({
      message: 'Item deleleted successfully'
    })
  } catch (err) {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }
}

const likeCollectionItem = async (req, res) => {
  if (!req.body || !req.params) res.status(StatusCodes.BAD_REQUEST).json({
    message: 'Please provivde all required info'
  })

  try {
    const { itemId } = req.params
    const { userId } = req.body
    const item = await Items.findById({ _id: itemId });

    if (!item) res.status(StatusCodes.BAD_REQUEST).json({
      message: "Item not found"
    })
    if (item.likes.includes(userId) && !item.dislikes.includes(userId)) {
      await Items.findOneAndUpdate({ _id: itemId }, { $pull: { likes: userId } })
      return res.status(StatusCodes.OK).json({
        message: 'User removed like from the item'
      })
    }
    if (!item.likes.includes(userId) && item.dislikes.includes(userId)) {
      await Items.findOneAndUpdate({ _id: itemId }, { $push: { likes: userId }, $pull: { dislikes: userId } })

      return res.status(StatusCodes.OK).json({
        message: 'User liked the item'
      })
    }

    await Items.findOneAndUpdate({ _id: itemId }, { $push: { likes: userId } })

    return res.status(StatusCodes.OK).json({
      message: 'User liked the item'
    })
  } catch (err) {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }
}

const unlikeCollectionItem = async (req, res) => {
  if (!req.body || !req.params) res.status(StatusCodes.BAD_REQUEST).json({
    message: 'Please provivde all required info'
  })
  try {
    const { itemId } = req.params
    const { userId } = req.body
    const item = await Items.findById({ _id: itemId });

    if (!item) res.status(StatusCodes.BAD_REQUEST).json({
      message: "Item not found"
    })
    if (!item.likes.includes(userId) && item.dislikes.includes(userId)) {
      await Items.findOneAndUpdate({ _id: itemId }, { $pull: { dislikes: userId } })
      return res.status(StatusCodes.OK).json({
        message: 'User removed dislike from the item'
      })
    }
    if (item.likes.includes(userId) && !item.dislikes.includes(userId)) {
      await Items.findOneAndUpdate({ _id: itemId }, { $push: { dislikes: userId }, $pull: { likes: userId } })

      return res.status(StatusCodes.OK).json({
        message: 'User liked the item'
      })
    }

    await Items.findOneAndUpdate({ _id: itemId }, { $push: { dislikes: userId } })

    return res.status(StatusCodes.OK).json({
      message: 'User liked the item'
    })
  } catch (err) {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }

}

const getLastestCollectionItems = async (req, res) => {
  try {
    const items = await Items.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate({
        path: 'collectionId',
        select: 'name',
        model: 'Collections',
        populate: {
          path: 'createdBy',
          select: 'name',
          model: 'CollectionUsers',
        },
      }).exec();
    if (!items) res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Something went wrong'
    })
    return res.status(StatusCodes.OK).json(items)
  } catch (err) {
    if (err) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  }
}
module.exports = {
  getAllCollectionItems,
  getAllCollectionItemsByCollectionId,
  createCollectionItem,
  editCollectionItem,
  deleteCollectionItem,
  likeCollectionItem,
  unlikeCollectionItem,
  getLastestCollectionItems
}