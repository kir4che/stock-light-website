export function calculatePriceChange(oldClosingPrice, newClosingPrice) {
	return Math.round((((newClosingPrice - oldClosingPrice) / oldClosingPrice) * 100 + Number.EPSILON) * 100) / 100
}
