const express = require('express')
const MessageController = require('../controllers/messageController')

const MESSAGE_ROUTER = express.Router()

MESSAGE_ROUTER.get('/:chatId', MessageController.getMessagesByChatId) // get all messages for chat
MESSAGE_ROUTER.post('/:chatId', MessageController.createMessage) // create new message
MESSAGE_ROUTER.delete('/:chatId', MessageController.deleteMessagesByChatId) // delete all messages for chat

module.exports = MESSAGE_ROUTER
