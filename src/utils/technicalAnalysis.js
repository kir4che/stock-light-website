// 騰落指標
export function calculateADL(closes, highs, lows, volumes) {
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
