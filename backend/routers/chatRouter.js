const express = require('express')
const ChatController = require('../controllers/chatController')

const CHAT_ROUTER = express.Router()

CHAT_ROUTER.get('/', ChatController.getAllChats) // get all chats
CHAT_ROUTER.post('/', ChatController.createChat) // create new chat
CHAT_ROUTER.put('/:id', ChatController.updateChat) // update chat
CHAT_ROUTER.delete('/:id', ChatController.deleteChat) // delete chat

module.exports = CHAT_ROUTER
