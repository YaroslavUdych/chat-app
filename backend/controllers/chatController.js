const Chat = require('../models/Chat')
const Message = require('../models/Message')

class ChatController {
	// get all chats
	async getAllChats(req, res) {
		try {
			const chats = await Chat.find()
			res.status(200).json(chats)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}

	// create new chat
	async createChat(req, res) {
		const { firstName, lastName } = req.body

		if (!firstName || !lastName) {
			return res.status(400).json({ message: 'All fields are required.' })
		}

		const chat = new Chat({ firstName, lastName })

		try {
			const newChat = await chat.save()
			res.status(201).json(newChat)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}

	// update chat
	async updateChat(req, res) {
		const { firstName, lastName } = req.body

		if (!firstName || !lastName) {
			return res.status(400).json({ message: 'All fields are required.' })
		}

		try {
			const updatedChat = await Chat.findByIdAndUpdate(req.params.id, { firstName, lastName }, { new: true })

			if (!updatedChat) {
				return res.status(404).json({ message: 'Chat not found.' })
			}

			res.status(200).json(updatedChat)
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}

	// delete chat
	async deleteChat(req, res) {
		try {
			// Видаляємо чат
			const deletedChat = await Chat.findByIdAndDelete(req.params.id)

			if (!deletedChat) {
				return res.status(404).json({ message: 'Chat not found.' })
			}

			// Видаляємо всі повідомлення, пов'язані з цим чатом
			await Message.deleteMany({ chatId: req.params.id })

			res.status(200).json({ message: 'Chat and associated messages deleted successfully.' })
		} catch (error) {
			res.status(500).json({ message: error.message })
		}
	}
}

module.exports = new ChatController()
