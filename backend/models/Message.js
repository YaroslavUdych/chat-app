const mongoose = require('mongoose')

const MESSAGE_SCHEMA = new mongoose.Schema({
	chatId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Chat',
		required: true,
	}, // Посилання на ID чату
	sender: {
		type: String,
		required: true,
	}, // 'User' або 'Bot'
	text: {
		type: String,
		required: true,
	}, // Текст повідомлення
	createdAt: {
		type: Date,
		default: Date.now,
	}, // Дата створення повідомлення
})

module.exports = mongoose.model('Message', MESSAGE_SCHEMA)
