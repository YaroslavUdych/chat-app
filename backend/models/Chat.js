const mongoose = require('mongoose')

const CHAT_SCHEMA = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})

module.exports = mongoose.model('Chat', CHAT_SCHEMA)
