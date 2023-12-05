export function calculateR(x, y) {
	if (x.length === 0 || y.length === 0) {
		console.error('error: x or y is empty!')
		return null
	}

	const xMean = x.reduce((a, b) => a + b) / x.length
	const yMean = y.reduce((a, b) => a + b) / y.length
	const xVariance = x.reduce((a, b) => a + Math.pow(b - xMean, 2), 0)
	const yVariance = y.reduce((a, b) => a + Math.pow(b - yMean, 2), 0)
	const covariance = x.reduce((a, b, i) => a + (b - xMean) * (y[i] - yMean), 0)

	return Math.round((covariance / Math.sqrt(xVariance * yVariance)) * 10000) / 10000
}
