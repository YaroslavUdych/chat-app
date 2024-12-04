const Message = require('../models/Message')
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types

class MessageController {
	// get all messages for chat
	async getMessagesByChatId(req, res) {
		try {
			const chatId = req.params.chatId

			// Перевірка, чи валідний ObjectId
			if (!ObjectId.isValid(chatId)) {
				return res.status(400).json({ message: 'Invalid chat ID' })
			}

			// Створення ObjectId з використанням `createFromHexString`
			const objectId = ObjectId.createFromHexString(chatId)

			// Пошук повідомлень за chatId
			const messages = await Message.find({ chatId: objectId }).sort({ createdAt: 1 })

			res.status(200).json(messages)
		} catch (error) {
			console.error('Error fetching messages:', error)
			res.status(500).json({ message: error.message })
		}
	}
	// create new message
	async createMessage(req, res) {
		const { sender, text } = req.body

		if (!sender || !text) {
			return res.status(400).json({ message: 'All fields are required.' })
		}

		const message = new Message({
			chatId: req.params.chatId,
			sender,
			text,
		})

		try {
			const newMessage = await message.save()
			res.status(201).json(newMessage)
		} catch (error) {
			res.status(400).json({ message: error.message })
		}
	}

	// delete all messages for chat
	async deleteMessagesByChatId(req, res) {
		try {
			await Message.deleteMany({ chatId: req.params.chatId })
			res.status(200).json({ message: 'All messages for the chat deleted successfully.' })
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}
}

module.exports = new MessageController()
