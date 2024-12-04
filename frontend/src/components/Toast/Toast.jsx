import React, { useEffect } from 'react'
import styles from './Toast.module.scss'

const Toast = ({ message, onClose, duration = 2000 }) => {
	useEffect(() => {
		const timer = setTimeout(onClose, duration)
		return () => clearTimeout(timer)
	}, [onClose, duration])

	return (
		<div className={styles.toast}>
			<p>{message}</p>
		</div>
	)
}

export default Toast
