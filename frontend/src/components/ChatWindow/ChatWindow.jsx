import { useState, useRef, useEffect } from 'react'
import styles from './ChatWindow.module.scss'
import { sendMessageToBot } from '../../services/botService'
import MessageBubble from '../MessageBubble/MessageBubble'
import MeatballMenu from '../MeatballMenu/MeatballMenu'
import Modal from '../Modal/Modal'
import Toast from '../Toast/Toast'
import userImage from '../../assets/profile-picture.png'

const ChatWindow = ({ currentChat, onEditChat, onClearChat, onDeleteChat }) => {
	const [messagesMap, setMessagesMap] = useState({})
	const [message, setMessage] = useState('')
	const [isEditModalOpen, setIsEditModalOpen] = useState(false)
	const [toast, setToast] = useState(null)
	const messagesContainerRef = useRef(null)

	const fetchMessages = async (chatId) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_MESSAGE_API_URL}/${chatId}`)
			const data = await response.json()

			setMessagesMap((prev) => ({
				...prev,
				[chatId]: data,
			}))
		} catch (error) {
			console.error('Error fetching messages:', error)
		}
	}

	useEffect(() => {
		if (currentChat) {
			fetchMessages(currentChat._id)
		}
	}, [currentChat])

	const scrollToBottom = () => {
		const container = messagesContainerRef.current
		if (container) {
			container.scrollTop = container.scrollHeight
		}
	}

	useEffect(() => {
		if (currentChat && messagesMap[currentChat._id]) {
			scrollToBottom()
		}
	}, [currentChat, messagesMap])

	const sendMessage = async () => {
		if (!message.trim() || !currentChat) return

		try {
			const userResponse = await fetch(`${import.meta.env.VITE_MESSAGE_API_URL}/${currentChat._id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					chatId: currentChat._id,
					sender: 'User',
					text: message,
				}),
			})

			if (userResponse.ok) {
				setMessage('')
				fetchMessages(currentChat._id)

				setTimeout(async () => {
					await sendMessageToBot(currentChat._id)
					fetchMessages(currentChat._id)
					handleShowToast(`New message from ${currentChat.firstName} ${currentChat.lastName}`)
				}, 3000)
			}
		} catch (error) {
			console.error('Error sending message:', error)
		}
	}

	const handleClearChat = async () => {
		try {
			const response = await fetch(`${import.meta.env.VITE_MESSAGE_API_URL}/${currentChat._id}`, {
				method: 'DELETE',
			})

			if (response.ok) {
				setMessagesMap((prev) => ({
					...prev,
					[currentChat._id]: [],
				}))

				handleShowToast('Chat cleared successfully!')
			} else {
				console.error('Failed to clear chat messages')
			}
		} catch (error) {
			console.error('Error clearing chat messages:', error)
		}
	}

	const handleShowToast = (message) => {
		setToast(message)
		setTimeout(() => setToast(null), 3000)
	}

	const handleEditChat = async (updatedChat) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_CHAT_API_URL}/${currentChat._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updatedChat),
			})

			if (response.ok) {
				const updatedChatData = { ...currentChat, ...updatedChat }
				onEditChat(updatedChatData)
				setIsEditModalOpen(false)
			}
		} catch (error) {
			console.error('Error updating chat:', error)
		}
	}

	const currentMessages = currentChat ? messagesMap[currentChat._id] || [] : []

	return (
		<div className={styles.chatWindow}>
			{currentChat ? (
				<>
					<header className={styles.chatHeader}>
						<div className={styles.chatHeaderContent}>
							<img src={userImage} alt="Profile" className={styles.profilePicture} />
							<h3>
								{currentChat.firstName} {currentChat.lastName}
							</h3>
						</div>
						<MeatballMenu
							onEdit={() => setIsEditModalOpen(true)}
							onClear={handleClearChat}
							onDelete={() => onDeleteChat(currentChat)}
						/>
					</header>

					<div className={styles.messages} ref={messagesContainerRef}>
						{currentMessages.length > 0 &&
							currentMessages.map((msg) => (
								<MessageBubble
									key={msg._id}
									text={msg.text}
									sender={msg.sender}
									timestamp={new Date(msg.createdAt).toLocaleTimeString()}
								/>
							))}
					</div>

					<div className={styles.messageInput}>
						<input
							type="text"
							value={message}
							placeholder="Type a message..."
							onChange={(e) => setMessage(e.target.value)}
						/>
						<button onClick={sendMessage}>Send</button>
					</div>

					<Modal
						isOpen={isEditModalOpen}
						onClose={() => setIsEditModalOpen(false)}
						onSubmit={handleEditChat}
						title={'Edit Chat'}
						buttonText={'Save'}
						initialFirstName={currentChat?.firstName}
						initialLastName={currentChat?.lastName}
					/>
				</>
			) : (
				<p className={styles.noChatSelected}>Select a chat to start messaging</p>
			)}
			{toast && <Toast message={toast} onClose={() => setToast(null)} />}
		</div>
	)
}

export default ChatWindow
