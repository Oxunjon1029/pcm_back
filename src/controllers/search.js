const { StatusCodes } = require('http-status-codes')
const CollectionItems = require('../models/collectionItems');

const searchFullText = async (req, res) => {
  try {
    const { text } = req.query;

    if (text) {
      const items = await CollectionItems.find({
        $or: [
          { 'name.uz': { $regex: text, $options: 'i' } },
          { 'name.en': { $regex: text, $options: 'i' } },
        ]
      })
      if (!items) res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Someting went wrong'
      })
      return res.status(StatusCodes.OK).json(items);
    }
    return res.status(StatusCodes.OK).json([])
  } catch (error) {
    if (error) res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
  }
}
const searchItemsByTag = async (req, res) => {
  try {
    const { tag, lang } = req.query;
    if (tag && lang) {
      const tagsField = lang === 'uz' ? 'uztags' : 'entags'
      const items = await CollectionItems.find({ [tagsField]: { $elemMatch: { title: tag } } });
      if (!items) res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Something went wrong'
      })
      return res.status(StatusCodes.OK).json(items)
    }
    return res.status(StatusCodes.OK).json([])
  } catch (err) {
    if (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
    }
  }
}
module.exports = {
  searchFullText,
  searchItemsByTag
}