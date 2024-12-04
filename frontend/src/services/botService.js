// services/botService.js
export const sendMessageToBot = async (chatId) => {
	try {
		const response = await fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=racist,sexist&type=single')
		const { joke } = await response.json()

		const botResponse = await fetch(import.meta.env.VITE_MESSAGE_API_URL + `/${chatId}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chatId: chatId,
				sender: 'Bot',
				text: joke,
			}),
		})

		if (!botResponse.ok) {
			console.error('Failed to send bot message')
		}
	} catch (error) {
		console.error('Error in bot service:', error)
	}
}
