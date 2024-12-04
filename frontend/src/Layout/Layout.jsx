import { useState, useEffect } from 'react'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'
import ChatWindow from '../components/ChatWindow/ChatWindow'
import Toast from '../components/Toast/Toast'
import styles from './Layout.module.scss'

const Layout = () => {
	const [isSidebarVisible, setIsSidebarVisible] = useState(true)
	const [currentChat, setCurrentChat] = useState(null)
	const [chatList, setChatList] = useState([])
	const [toast, setToast] = useState(null)

	useEffect(() => {
		const fetchChats = async () => {
			try {
				const response = await fetch(import.meta.env.VITE_CHAT_API_URL)
				const data = await response.json()
				setChatList(data)
			} catch (error) {
				console.error('Error fetching chats:', error)
			}
		}

		fetchChats()
	}, [])

	const handleToggleSidebar = () => {
		setIsSidebarVisible((prev) => !prev)
	}

	const handleShowToast = (message) => {
		setToast(message)
		setTimeout(() => setToast(null), 2000)
	}

	const handleEditChat = (updatedChat) => {
		setChatList((prevList) => prevList.map((chat) => (chat._id === updatedChat._id ? updatedChat : chat)))
		setCurrentChat(updatedChat)
		handleShowToast('Chat updated successfully!')
	}

	const handleClearChat = async (chat) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_MESSAGE_API_URL}/${chat._id}`, {
				method: 'DELETE',
			})

			if (response.ok) {
				handleShowToast('Chat cleared successfully!')
			}
		} catch (error) {
			console.error('Error clearing chat:', error)
		}
	}

	const handleDeleteChat = async (chat) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_CHAT_API_URL}/${chat._id}`, {
				method: 'DELETE',
			})

			if (response.ok) {
				setChatList((prevList) => prevList.filter((c) => c._id !== chat._id))
				if (currentChat?._id === chat._id) {
					setCurrentChat(null)
				}
				handleShowToast('Chat deleted successfully!')
			}
		} catch (error) {
			console.error('Error deleting chat:', error)
		}
	}

	return (
		<div className={styles.layout}>
			<Header onToggleSidebar={handleToggleSidebar} />

			<div className={styles.main}>
				{isSidebarVisible && <Sidebar chatList={chatList} setChatList={setChatList} onSelectChat={setCurrentChat} />}
				<ChatWindow
					currentChat={currentChat}
					onEditChat={handleEditChat}
					onClearChat={handleClearChat}
					onDeleteChat={handleDeleteChat}
				/>
			</div>

			{toast && <Toast message={toast} onClose={() => setToast(null)} />}
		</div>
	)
}

export default Layout
