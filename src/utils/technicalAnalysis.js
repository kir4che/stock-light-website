// 移動平均線
export function calculateMA(dayCount, data) {
	let result = []

	for (let i = 0; i < data.length; i++) {
		if (i < dayCount - 1) {
			result.push('-')
			continue
		}

		let sum = 0
		for (let j = 0; j < dayCount; j++) {
			sum += data[i - j]
		}

		result.push(Math.round((sum / dayCount) * 100) / 100)
	}

	return result
}

// 布林通道：正確性不確定，好像有算錯，暫不放。
// export function calculateBoll(MA) {
// 	let roundedUpper = [],
// 		roundedLower = []

// 	const MD = standardDeviation(MA.slice(20))

// 	MA.map((price) => {
// 		roundedUpper.push(Math.round((price + 2 * MD) * 100) / 100)
// 		roundedLower.push(Math.round((price - 2 * MD) * 100) / 100)
// 	})

// 	return [roundedUpper, roundedLower]
// }

export function calculateEMA(dayCount, data) {
	let result = []
	let multiplier = 2 / (dayCount + 1)
	let sum = 0

	for (let i = 0, len = data.length; i < len; i++) {
		if (i < dayCount - 1) {
			result.push('-')
			sum += data[i][1]
			continue
		}

		if (i === dayCount - 1) {
			sum += data[i][1]
			result.push(sum / dayCount)
		} else {
			let ema = (data[i][1] - result[i - 1]) * multiplier + result[i - 1]
			result.push(ema)
		}
	}

	return result
}

// 騰落指標
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

// function standardDeviation(arr) {
// 	const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length
// 	return Math.sqrt(
// 		arr.reduce((acc, val) => acc.concat((val - mean) ** 2), []).reduce((acc, val) => acc + val, 0) / (arr.length - 1)
// 	)
// }
