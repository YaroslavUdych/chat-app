import styles from './MessageBubble.module.scss'

const MessageBubble = ({ text, sender, timestamp }) => {
	const isBot = sender === 'Bot'
	return (
		<div className={`${styles.messageBubble} ${isBot ? styles.bot : styles.user}`}>
			<p style={{ whiteSpace: 'pre-wrap' }}>{text}</p>
			<span className={styles.timestamp}>{timestamp}</span>
		</div>
	)
}

export default MessageBubble
