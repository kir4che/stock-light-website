export function convertDateTime(dateTime) {
	const taiwanTime = new Date(new Date(dateTime).getTime() + 8 * 60 * 60 * 1000)

	const year = taiwanTime.getFullYear()
	const month = String(taiwanTime.getMonth() + 1).padStart(2, '0')
	const day = String(taiwanTime.getDate()).padStart(2, '0')
	const hours = String(taiwanTime.getHours()).padStart(2, '0')
	const minutes = String(taiwanTime.getMinutes()).padStart(2, '0')
	const seconds = String(taiwanTime.getSeconds()).padStart(2, '0')

	const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

	return formattedTime
}
