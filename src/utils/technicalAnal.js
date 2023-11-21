// 相對強弱指數
export function calculateRSI(change, period) {
	let rsis = []
	let upSum = 0,
		downSum = 0

	for (let i = change.length - 1; i >= 0; i--) {
		for (let j = 0; j < period; j++) {
			if (change[i - j] > 0) upSum += change[i - j]
			else downSum += Math.abs(change[i - j])
		}

		let rs = upSum / period / (downSum / period)
		rsis.push(100 * (rs / (1 + rs)))
	}

	for (let i = 0; i < period; i++) rsis.push('-')
	rsis = rsis.reverse()

	return rsis
}

// 威廉指標
export function calculateWilliam(closes) {
	let william = []

	const highestHigh = Math.max(...closes)
	const lowestLow = Math.min(...closes)

	for (let i = 0; i < closes.length; i++) {
		const williamValue = Math.round(((highestHigh - closes[i]) / (highestHigh - lowestLow)) * 100 * 100) / 100
		william.push(williamValue)
	}

	return william
}

// 乖離率
export function calculateBias(closes, ma, period) {
	return closes.map((close, i) => {
		if (i < period - 1) return '-'

		const biasValue = ((close - ma[i]) / ma[i]) * 100
		return isNaN(biasValue) ? '-' : Math.round(biasValue * 100) / 100
	})
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
