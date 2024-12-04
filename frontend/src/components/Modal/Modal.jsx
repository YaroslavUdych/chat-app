import { useState, useEffect } from 'react'
import styles from './Modal.module.scss'

const Modal = ({ isOpen, onClose, onSubmit, title, buttonText, initialFirstName = '', initialLastName = '' }) => {
	const [firstName, setFirstName] = useState(initialFirstName)
	const [lastName, setLastName] = useState(initialLastName)

	useEffect(() => {
		setFirstName(initialFirstName)
		setLastName(initialLastName)
	}, [initialFirstName, initialLastName])

	if (!isOpen) return null

	return (
		<div className={styles.modal}>
			<div className={styles.modalContent}>
				<h2>{title}</h2>
				<input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
				<input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
				<button
					onClick={() => {
						onSubmit({ firstName, lastName })
						setFirstName('')
						setLastName('')
						onClose()
					}}
				>
					{buttonText}
				</button>
				<button onClick={onClose}>Cancel</button>
			</div>
		</div>
	)
}

export default Modal
