import Select from 'react-select'

export default function SelectBox() {
	// 我先放台灣50、中型100
	const options = [
		{
			label: '1101 台泥',
			value: 1101,
		},
		{
			label: '1102 亞泥',
			value: 1102,
		},
		{
			label: '1216 統一',
			value: 1216,
		},
		{
			label: '1301 台塑',
			value: 1301,
		},
		{
			label: '1303 南亞',
			value: 1303,
		},
		{
			label: '1326 台化',
			value: 1326,
		},
		{
			label: '1402 遠東新',
			value: 1402,
		},
		{
			label: '1590 亞德客-KY',
			value: 1590,
		},
		{
			label: '2002 中鋼',
			value: 2002,
		},
		{
			label: '2105 正新',
			value: 2105,
		},
		{
			label: '2207 和泰車',
			value: 2207,
		},
		{
			label: '2303 聯電',
			value: 2303,
		},
		{
			label: '2308 台達電',
			value: 2308,
		},
		{
			label: '2317 鴻海',
			value: 2317,
		},
		{
			label: '2327 國巨',
			value: 2327,
		},
		{
			label: '2330 台積電',
			value: 2330,
		},
		{
			label: '2357 華碩',
			value: 2357,
		},
		{
			label: '2379 瑞昱',
			value: 2379,
		},
		{
			label: '2382 廣達',
			value: 2382,
		},
		{
			label: '2395 研華',
			value: 2395,
		},
		{
			label: '2408 南亞科',
			value: 2408,
		},
		{
			label: '2412 中華電',
			value: 2412,
		},
		{
			label: '2454 聯發科',
			value: 2454,
		},
		{
			label: '2474 可成',
			value: 2474,
		},
		{
			label: '2633 台灣高鐵',
			value: 2633,
		},
		{
			label: '2801 彰銀',
			value: 2801,
		},
		{
			label: '2881 富邦金',
			value: 2881,
		},
		{
			label: '2882 國泰金',
			value: 2882,
		},
		{
			label: '2884 玉山金',
			value: 2884,
		},
		{
			label: '2885 元大金',
			value: 2885,
		},
		{
			label: '2886 兆豐金',
			value: 2886,
		},
		{
			label: '2887 台新金',
			value: 2887,
		},
		{
			label: '2891 中信金',
			value: 2891,
		},
		{
			label: '2892 第一金',
			value: 2892,
		},
		{
			label: '2912 統一超',
			value: 2912,
		},
		{
			label: '3008 大立光',
			value: 3008,
		},
		{
			label: '3034 聯詠',
			value: 3034,
		},
		{
			label: '3045 台灣大',
			value: 3045,
		},
		{
			label: '3711 日月光投控',
			value: 3711,
		},
		{
			label: '4904 遠傳',
			value: 4904,
		},
		{
			label: '4938 和碩',
			value: 4938,
		},
		{
			label: '5871 中租-KY',
			value: 5871,
		},
		{
			label: '5876 上海商銀',
			value: 5876,
		},
		{
			label: '5880 合庫金',
			value: 5880,
		},
		{
			label: '6415 矽力-KY',
			value: 6415,
		},
		{
			label: '6505 台塑化',
			value: 6505,
		},
		{
			label: '6669 緯穎',
			value: 6669,
		},
		{
			label: '8046 南電',
			value: 8046,
		},
		{
			label: '9910 豐泰',
			value: 9910,
		},
		{
			label: '1210 大成',
			value: 1210,
		},
		{
			label: '1227 佳格',
			value: 1227,
		},
		{
			label: '1229 聯華',
			value: 1229,
		},
		{
			label: '1476 儒鴻',
			value: 1476,
		},
		{
			label: '1477 聚陽',
			value: 1477,
		},
		{
			label: '1504 東元',
			value: 1504,
		},
		{
			label: '1605 華新',
			value: 1605,
		},
		{
			label: '1717 長興',
			value: 1717,
		},
		{
			label: '1722 台肥',
			value: 1722,
		},
		{
			label: '1802 台玻',
			value: 1802,
		},
		{
			label: '1907 永豐餘',
			value: 1907,
		},
		{
			label: '2027 大成鋼',
			value: 2027,
		},
		{
			label: '2049 上銀',
			value: 2049,
		},
		{
			label: '2059 川湖',
			value: 2059,
		},
		{
			label: '2101 南港',
			value: 2101,
		},
		{
			label: '2201 裕隆',
			value: 2201,
		},
		{
			label: '2227 裕日車',
			value: 2227,
		},
		{
			label: '2301 光寶科',
			value: 2301,
		},
		{
			label: '2313 華通',
			value: 2313,
		},
		{
			label: '2324 仁寶',
			value: 2324,
		},
		{
			label: '2337 旺宏',
			value: 2337,
		},
		{
			label: '2344 華邦電',
			value: 2344,
		},
		{
			label: '2345 智邦',
			value: 2345,
		},
		{
			label: '2347 聯強',
			value: 2347,
		},
		{
			label: '2352 佳世達',
			value: 2352,
		},
		{
			label: '2353 宏碁',
			value: 2353,
		},
		{
			label: '2354 鴻準',
			value: 2354,
		},
		{
			label: '2356 英業達',
			value: 2356,
		},
		{
			label: '2360 致茂',
			value: 2360,
		},
		{
			label: '2376 技嘉',
			value: 2376,
		},
		{
			label: '2377 微星',
			value: 2377,
		},
		{
			label: '2383 台光電',
			value: 2383,
		},
		{
			label: '2385 群光',
			value: 2385,
		},
		{
			label: '2404 漢唐',
			value: 2404,
		},
		{
			label: '2409 友達',
			value: 2409,
		},
		{
			label: '2441 超豐',
			value: 2441,
		},
		{
			label: '2449 京元電子',
			value: 2449,
		},
		{
			label: '2458 義隆',
			value: 2458,
		},
		{
			label: '2492 華新科',
			value: 2492,
		},
		{
			label: '2542 興富發',
			value: 2542,
		},
		{
			label: '2603 長榮',
			value: 2603,
		},
		{
			label: '2606 裕民',
			value: 2606,
		},
		{
			label: '2609 陽明',
			value: 2609,
		},
		{
			label: '2610 華航',
			value: 2610,
		},
		{
			label: '2615 萬海',
			value: 2615,
		},
		{
			label: '2618 長榮航',
			value: 2618,
		},
		{
			label: '2809 京城銀',
			value: 2809,
		},
		{
			label: '2812 台中銀',
			value: 2812,
		},
		{
			label: '2823 中壽',
			value: 2823,
		},
		{
			label: '2834 臺企銀',
			value: 2834,
		},
		{
			label: '2845 遠東銀',
			value: 2845,
		},
		{
			label: '2883 開發金',
			value: 2883,
		},
		{
			label: '2888 新光金',
			value: 2888,
		},
		{
			label: '2889 國票金',
			value: 2889,
		},
		{
			label: '2890 永豐金',
			value: 2890,
		},
		{
			label: '2915 潤泰全',
			value: 2915,
		},
		{
			label: '3005 神基',
			value: 3005,
		},
		{
			label: '3023 信邦',
			value: 3023,
		},
		{
			label: '3037 欣興',
			value: 3037,
		},
		{
			label: '3044 健鼎',
			value: 3044,
		},
		{
			label: '3189 景碩',
			value: 3189,
		},
		{
			label: '3231 緯創',
			value: 3231,
		},
		{
			label: '3406 玉晶光',
			value: 3406,
		},
		{
			label: '3443 創意',
			value: 3443,
		},
		{
			label: '3481 群創',
			value: 3481,
		},
		{
			label: '3532 台勝科',
			value: 3532,
		},
		{
			label: '3533 嘉澤',
			value: 3533,
		},
		{
			label: '3576 聯合再生',
			value: 3576,
		},
		{
			label: '3653 健策',
			value: 3653,
		},
		{
			label: '3661 世芯-KY',
			value: 3661,
		},
		{
			label: '3665 貿聯-KY',
			value: 3665,
		},
		{
			label: '3682 亞太電',
			value: 3682,
		},
		{
			label: '3702 大聯大',
			value: 3702,
		},
		{
			label: '3706 神達',
			value: 3706,
		},
		{
			label: '3714 富采',
			value: 3714,
		},
		{
			label: '4958 臻鼎-KY',
			value: 4958,
		},
		{
			label: '5269 祥碩',
			value: 5269,
		},
		{
			label: '5522 遠雄',
			value: 5522,
		},
		{
			label: '6176 瑞儀',
			value: 6176,
		},
		{
			label: '6213 聯茂',
			value: 6213,
		},
		{
			label: '6239 力成',
			value: 6239,
		},
		{
			label: '6271 同欣電',
			value: 6271,
		},
		{
			label: '6278 台表科',
			value: 6278,
		},
		{
			label: '6285 啟碁',
			value: 6285,
		},
		{
			label: '6409 旭隼',
			value: 6409,
		},
		{
			label: '6456 GIS-KY',
			value: 6456,
		},
		{
			label: '6531 愛普',
			value: 6531,
		},
		{
			label: '6592 和潤企業',
			value: 6592,
		},
		{
			label: '8454 富邦媒',
			value: 8454,
		},
		{
			label: '8464 億豐',
			value: 8464,
		},
		{
			label: '9904 寶成',
			value: 9904,
		},
		{
			label: '9914 美利達',
			value: 9914,
		},
		{
			label: '9917 中保科',
			value: 9917,
		},
		{
			label: '9921 巨大',
			value: 9921,
		},
		{
			label: '9941 裕融',
			value: 9941,
		},
		{
			label: '9945 潤泰新',
			value: 9945,
		},
	]
	options.sort()

	return (
		<Select
			name='stock'
			className='text-sm '
			options={options}
			isSearchable={true}
			placeholder='股票代號或名稱'
			theme={(theme) => ({
				...theme,
				borderRadius: 0,
				colors: {
					...theme.colors,
					primary: '',
					primary25: '#FFDC62',
					primary50: '#FFDC62',
				},
			})}
		/>
	)
}
