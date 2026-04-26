import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'
import { env } from './env'
import { registerChatHandlers } from './socket/chatSocket'


import { authRouter } from './routes/auth.routes'
import { postRouter } from './routes/post.routes'
import { productRouter } from './routes/product.routes'
import { newsRouter } from './routes/news.routes'
import { errorHandler } from './middleware/error'

const app = express()

app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
  }),
)
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
app.use('/api/products', productRouter)
app.use('/api/news', newsRouter)


app.use(errorHandler)

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

// NEW:
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: env.CLIENT_ORIGIN,
    methods: ['GET', 'POST'],
  },
  maxHttpBufferSize: env.SOCKET_MAX_HTTP_BUFFER * 1024 * 1024,
})

registerChatHandlers(io)

httpServer.listen(env.PORT, () => {
  console.log(`Сервер запущен: http://localhost:${env.PORT}`)
})