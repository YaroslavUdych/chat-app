const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const CHAT_ROUTER = require('./routers/chatRouter')
const MESSAGE_ROUTER = require('./routers/messageRouter')

dotenv.config()

const APP = express()
const PORT = process.env.PORT || 5000

const corsOptions = {
	origin: 'http://localhost:5173',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

APP.use(cors(corsOptions))
APP.use(express.json())
APP.use('/api/chats', CHAT_ROUTER)
APP.use('/api/messages', MESSAGE_ROUTER)

const startServer = async () => {
	try {
		await mongoose.connect(process.env.DB_CONNECTION_STRING)
		console.log('MongoDB connected...')
		APP.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}...`)
		})
	} catch (error) {
		console.log(error)
	}
}

startServer()
