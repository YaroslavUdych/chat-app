import styles from './Header.module.scss'

const Header = ({ onToggleSidebar }) => {
	return (
		<header className={styles.header}>
			<button className={styles.toggleButton} onClick={onToggleSidebar}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="30"
					height="30"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					<line x1="3" y1="12" x2="21" y2="12"></line>
					<line x1="3" y1="6" x2="21" y2="6"></line>
					<line x1="3" y1="18" x2="21" y2="18"></line>
				</svg>
			</button>
			<h3>Chat App</h3>
		</header>
	)
}

export default Header
