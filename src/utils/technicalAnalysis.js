export function calculateMA(dayCount, data) {
	var result = []
	for (var i = 0, len = data.length; i < len; i++) {
		if (i < dayCount) {
			result.push('-')
			continue
		}
		var sum = 0
		for (var j = 0; j < dayCount; j++) {
			sum += data[i - j][1]
		}
		result.push(Math.round((sum / dayCount) * 100) / 100)
	}
	return result
}

export function calculateEMA(dayCount, data) {
	var result = []
	var multiplier = 2 / (dayCount + 1)
	var sum = 0

	for (var i = 0, len = data.length; i < len; i++) {
		if (i < dayCount - 1) {
			result.push('-')
			sum += data[i][1]
			continue
		}

		if (i === dayCount - 1) {
			sum += data[i][1]
			result.push(sum / dayCount)
		} else {
			var ema = (data[i][1] - result[i - 1]) * multiplier + result[i - 1]
			result.push(ema)
		}
	}

	return result
}

export function calculateADL(closes, highs, lows, volumes) {
	let adl = []

	for (let i = 0; i < closes.length; i++) {
		const moneyFlowMultiplier = Math.round((closes[i] - lows[i] - (highs[i] - closes[i])) / (highs[i] - lows[i]))

		const isValidMultiplier = !isNaN(moneyFlowMultiplier) && isFinite(moneyFlowMultiplier)
		const validMoneyFlowMultiplier = isValidMultiplier ? moneyFlowMultiplier : 0

		const moneyFlowVolume = validMoneyFlowMultiplier * volumes[i]
		const currentADL = (i === 0 ? 0 : adl[i - 1]) + moneyFlowVolume

		adl.push(currentADL)
	}

	return adl
}
