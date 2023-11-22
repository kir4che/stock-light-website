export function getQuarterFromDate(dateString) {
	const [year, month] = dateString.match(/\d+/g).map(Number)

	if (month >= 1 && month <= 3) return `${year} Q1`
	else if (month >= 4 && month <= 6) return `${year} Q2`
	else if (month >= 7 && month <= 9) return `${year} Q3`
	else if (month >= 10 && month <= 12) return `${year} Q4`
	else return null
}
