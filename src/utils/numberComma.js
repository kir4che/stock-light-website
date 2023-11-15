export function numberComma(num) {
	let comma = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g
	return num.toString().replace(comma, ',')
}
