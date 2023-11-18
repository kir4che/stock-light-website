export function calculateRSI(closes, period) {
	const rsiValues = []

	for (let i = period; i <= closes.length; i++) {
		const gains = [],
			losses = []

		for (let j = i - period; j < i; j++) {
			const priceDiff = closes[j] - closes[j - 1]

			if (priceDiff > 0) gains.push(priceDiff)
			else if (priceDiff < 0) losses.push(Math.abs(priceDiff))
		}

		const averageGain = gains.reduce((sum, gain) => sum + gain, 0) / period
		const averageLoss = losses.reduce((sum, loss) => sum + loss, 0) / period

		const relativeStrength = averageGain / averageLoss
		const rsi = Math.round((100 - 100 / (1 + relativeStrength)) * 100) / 100

		rsiValues.push(rsi)
	}

	return rsiValues
}

export function calculateWilliam(closes, highs, lows) {
	let william = []

	const highestHigh = Math.max(...closes)
	const lowestLow = Math.min(...closes)

	for (let i = 0; i < closes.length; i++) {
		const williamValue = Math.round(((highestHigh - closes[i]) / (highestHigh - lowestLow)) * 100 * 100) / 100
		william.push(williamValue)
	}

	return william
}

// 騰落指標
export function calculateADL(closes, lows, highs, volumes) {
	let adl = []

	for (let i = 0; i < closes.length; i++) {
		const moneyFlowMultiplier =
			Math.round(((closes[i] - lows[i] - (highs[i] - closes[i])) / (highs[i] - lows[i])) * 100) / 100

		const isValidMultiplier = !isNaN(moneyFlowMultiplier) && isFinite(moneyFlowMultiplier)
		const validMoneyFlowMultiplier = isValidMultiplier ? moneyFlowMultiplier : 0

		const moneyFlowVolume = validMoneyFlowMultiplier * volumes[i]
		const currentADL = (i === 0 ? 0 : adl[i - 1]) + moneyFlowVolume

		adl.push(currentADL)
	}

	return adl
}
