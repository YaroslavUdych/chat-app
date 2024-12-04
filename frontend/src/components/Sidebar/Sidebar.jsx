import { useState } from 'react'
import styles from './Sidebar.module.scss'
import Modal from '../Modal/Modal'
import userPicture from '../../assets/profile-picture.png'
import Toast from '../Toast/Toast'

const Sidebar = ({ chatList, setChatList, onSelectChat }) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')
	const [error, setError] = useState('')

	const filteredChats = chatList.filter(
		(chat) =>
			chat.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			chat.lastName.toLowerCase().includes(searchTerm.toLowerCase())
	)

	const handleCreateChat = async (newChat) => {
		if (!newChat.firstName.trim() || !newChat.lastName.trim()) {
			setError('Fill first name and last name to create a chat')
			return
		}

		try {
			const response = await fetch(import.meta.env.VITE_CHAT_API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(newChat),
			})

			if (response.ok) {
				const createdChat = await response.json()
				setChatList((prevList) => [...prevList, createdChat])
				setIsModalOpen(false)
			}
		} catch (error) {
			console.error('Error creating chat:', error)
		}
	}

	return (
		<>
			<aside className={styles.sidebar}>
				<input
					type="text"
					placeholder="Search chat..."
					className={styles.searchInput}
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>

				<ul className={styles.chatList}>
					{filteredChats.length > 0 ? (
						filteredChats.map((chat) => (
							<li key={chat._id} className={styles.chatItem} onClick={() => onSelectChat(chat)}>
								<img src={userPicture} alt="Profile" className={styles.profilePicture} />
								<p>
									{' '}
									{chat.firstName} {chat.lastName}
								</p>
							</li>
						))
					) : (
						<li className={styles.noChatMessage}>No chats found</li>
					)}
				</ul>

				<button className={styles.newChatButton} onClick={() => setIsModalOpen(true)}>
					New Chat
				</button>
			</aside>

			{error && <Toast message={error} onClose={() => setError('')} />}
			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={handleCreateChat}
				title={'Create Chat'}
				buttonText={'Create'}
			/>
		</>
	)
}

export default Sidebar
