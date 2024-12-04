import { useState, useRef, useEffect } from 'react'
import styles from './MeatballMenu.module.scss'

const MeatballMenu = ({ onEdit, onClear, onDelete }) => {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef(null)

	const toggleMenu = () => setIsOpen((prev) => !prev)

	const handleClickOutside = (event) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className={styles.meatballMenu} ref={menuRef}>
			<button className={styles.meatballButton} onClick={toggleMenu}>
				⋮
			</button>
			{isOpen && (
				<div className={styles.dropdownMenu}>
					<button onClick={onEdit}>Edit Chat</button>
					<button onClick={onClear}>Clear Chat</button>
					<button onClick={onDelete}>Delete Chat</button>
				</div>
			)}
		</div>
	)
}

export default MeatballMenu
