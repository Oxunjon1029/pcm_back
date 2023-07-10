require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const Item = require('./src/models/collectionItems')
const PORT = process.env.PORT || 5000
const connectDB = require('./src/db/connectDb')
const cookieSessions = require('cookie-session');
const authRouter = require('./src/routes/auth')
const userRouter = require('./src/routes/users');
const collectionRouter = require('./src/routes/collections');
const collectionItemRouter = require('./src/routes/collectionItem');
const searchRouter = require('./src/routes/search')
const topicRouter = require('./src/routes/topic')
const tagsRouter = require('./src/routes/tags')


app.use(cors({
  origin: 'http://localhost:3000',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));
app.use(cookieSessions({
  maxAge: 24 * 60 * 60 * 100,
  keys: [process.env.COOKIE_SECRET]
}))
app.use(express.json());
app.use('/api/v1', authRouter)
app.use('/api/v1', userRouter)
app.use('/api/v1', collectionRouter)
app.use('/api/v1', collectionItemRouter)
app.use('/api/v1', searchRouter)
app.use('/api/v1', topicRouter)
app.use('/api/v1', tagsRouter)


const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Access-Control-Allow-Origin']
  }
})
app.set('io', io)

io.on('connection', socket => {
  console.log('A user connected');
  socket.on('newComment', async (comment) => {
    const savedComments = await Item.findOneAndUpdate({ _id: comment?.itemId }, {
      $push: { comments: { content: comment?.content, userName: comment?.userName } }
    }, { new: true })
    socket.broadcast.emit('newComment', savedComments?.comments);
    socket.emit('newComment', savedComments?.comments)
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL).then(async () => {
      console.log('db connected')
      server.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });
    }).catch((err) => console.log(err));
  } catch (error) { console.log(error) }
};
start();


