import ReactEcharts from 'echarts-for-react'
import { useEffect, useState } from 'react'

export default function TaiexChart() {
	const indexData = [
		['2023-5-19', 16174.92],
		['2023-5-18', 16101.88],
		['2023-5-17', 15925.29],
		['2023-5-16', 15673.9],
		['2023-5-15', 15475.05],
		['2023-5-12', 15502.36],
		['2023-5-11', 15514.64],
		['2023-5-10', 15641.76],
		['2023-5-9', 15727.7],
		['2023-5-8', 15699.57],
		['2023-5-5', 15626.07],
		['2023-5-4', 15609.03],
		['2023-5-3', 15553.41],
		['2023-5-2', 15636.48],
		['2023-4-28', 15579.18],
		['2023-4-27', 15411.49],
		['2023-4-26', 15374.63],
		['2023-4-25', 15370.73],
		['2023-4-24', 15626.87],
		['2023-4-21', 15602.99],
		['2023-4-20', 15707.52],
		['2023-4-19', 15770.47],
		['2023-4-18', 15869.44],
		['2023-4-17', 15963.55],
		['2023-4-14', 15929.43],
		['2023-4-13', 15804.76],
		['2023-4-12', 15932.97],
		['2023-4-11', 15913.88],
		['2023-4-10', 15876.17],
		['2023-4-7', 15836.5],
		['2023-4-6', 15810.77],
		['2023-3-31', 15868.06],
		['2023-3-30', 15849.43],
		['2023-3-29', 15769.76],
		['2023-3-28', 15701.48],
		['2023-3-27', 15830.31],
		['2023-3-24', 15914.7],
		['2023-3-23', 15863.95],
		['2023-3-22', 15760.46],
		['2023-3-21', 15513.45],
		['2023-3-20', 15419.97],
		['2023-3-17', 15452.96],
		['2023-3-16', 15221.12],
		['2023-3-15', 15387.59],
		['2023-3-14', 15360.42],
		['2023-3-13', 15560.49],
		['2023-3-10', 15526.2],
		['2023-3-9', 15770.66],
		['2023-3-8', 15818.2],
		['2023-3-7', 15857.89],
		['2023-3-6', 15763.51],
		['2023-3-3', 15608.42],
		['2023-3-2', 15598.72],
		['2023-3-1', 15598.49],
		['2023-2-24', 15503.79],
		['2023-2-23', 15615.41],
		['2023-2-22', 15418.77],
		['2023-2-21', 15563],
		['2023-2-20', 15551.23],
		['2023-2-17', 15479.7],
		['2023-2-16', 15550.5],
		['2023-2-15', 15432.89],
		['2023-2-14', 15654.48],
		['2023-2-13', 15544.28],
		['2023-2-10', 15586.65],
		['2023-2-9', 15598.71],
		['2023-2-8', 15618.17],
		['2023-2-7', 15400.91],
		['2023-2-6', 15392.82],
		['2023-2-3', 15602.66],
		['2023-2-2', 15595.16],
		['2023-2-1', 15420.13],
		['2023-1-31', 15265.2],
		['2023-1-30', 15493.82],
		['2023-1-17', 14932.93],
		['2023-1-16', 14927.01],
		['2023-1-13', 14824.13],
		['2023-1-12', 14731.64],
		['2023-1-11', 14751.44],
		['2023-1-10', 14802.96],
		['2023-1-9', 14752.21],
		['2023-1-6', 14373.34],
		['2023-1-5', 14301.05],
		['2023-1-4', 14199.13],
		['2023-1-3', 14224.12],
		['2022-12-30', 14137.69],
		['2022-12-29', 14085.02],
		['2022-12-28', 14173.1],
		['2022-12-27', 14328.43],
		['2022-12-26', 14285.13],
		['2022-12-23', 14271.63],
		['2022-12-22', 14442.94],
		['2022-12-21', 14234.4],
		['2022-12-20', 14170.03],
		['2022-12-19', 14433.32],
		['2022-12-16', 14528.55],
		['2022-12-15', 14734.13],
		['2022-12-14', 14739.36],
		['2022-12-13', 14522.96],
		['2022-12-12', 14612.59],
		['2022-12-9', 14705.43],
		['2022-12-8', 14553.04],
		['2022-12-7', 14630.01],
		['2022-12-6', 14728.88],
		['2022-12-5', 14980.74],
		['2022-12-2', 14970.68],
		['2022-12-1', 15012.8],
		['2022-11-30', 14879.55],
		['2022-11-29', 14709.64],
		['2022-11-28', 14556.87],
		['2022-11-25', 14778.51],
		['2022-11-24', 14784],
		['2022-11-23', 14608.54],
		['2022-11-22', 14542.2],
		['2022-11-21', 14449.39],
		['2022-11-18', 14504.99],
		['2022-11-17', 14535.23],
		['2022-11-16', 14537.35],
		['2022-11-15', 14546.31],
		['2022-11-14', 14174.9],
		['2022-11-11', 14007.56],
		['2022-11-10', 13503.76],
		['2022-11-9', 13638.81],
		['2022-11-8', 13347.76],
		['2022-11-7', 13223.73],
		['2022-11-4', 13026.71],
		['2022-11-3', 12986.6],
		['2022-11-2', 13100.17],
		['2022-11-1', 13037.21],
		['2022-10-31', 12949.75],
		['2022-10-28', 12788.42],
		['2022-10-27', 12926.37],
		['2022-10-26', 12729.05],
		['2022-10-25', 12666.12],
		['2022-10-24', 12856.98],
		['2022-10-21', 12819.2],
		['2022-10-20', 12946.1],
		['2022-10-19', 12976.76],
		['2022-10-18', 13124.68],
		['2022-10-17', 12966.05],
		['2022-10-14', 13128.12],
		['2022-10-13', 12810.73],
		['2022-10-12', 13081.24],
		['2022-10-11', 13106.03],
		['2022-10-7', 13702.28],
		['2022-10-6', 13892.05],
		['2022-10-5', 13801.43],
		['2022-10-4', 13576.52],
		['2022-10-3', 13300.48],
		['2022-9-30', 13424.58],
		['2022-9-29', 13534.26],
		['2022-9-28', 13466.07],
		['2022-9-27', 13826.59],
		['2022-9-26', 13778.19],
		['2022-9-23', 14118.38],
		['2022-9-22', 14284.63],
		['2022-9-21', 14424.52],
		['2022-9-20', 14549.3],
		['2022-9-19', 14425.68],
		['2022-9-16', 14561.76],
		['2022-9-15', 14670.04],
		['2022-9-14', 14658.31],
		['2022-9-13', 14894.41],
		['2022-9-12', 14807.43],
		['2022-9-8', 14583.42],
		['2022-9-7', 14410.05],
		['2022-9-6', 14677.2],
		['2022-9-5', 14661.1],
		['2022-9-2', 14673.04],
		['2022-9-1', 14801.86],
		['2022-8-31', 15095.44],
		['2022-8-30', 14953.63],
		['2022-8-29', 14926.19],
		['2022-8-26', 15278.44],
		['2022-8-25', 15200.04],
		['2022-8-24', 15069.19],
		['2022-8-23', 15095.89],
		['2022-8-22', 15245.14],
		['2022-8-19', 15408.78],
		['2022-8-18', 15396.76],
		['2022-8-17', 15465.45],
		['2022-8-16', 15420.57],
		['2022-8-15', 15417.35],
		['2022-8-12', 15288.97],
		['2022-8-11', 15197.85],
		['2022-8-10', 14939.02],
		['2022-8-9', 15050.28],
		['2022-8-8', 15020.41],
		['2022-8-5', 15036.04],
		['2022-8-4', 14702.2],
		['2022-8-3', 14777.02],
		['2022-8-2', 14747.23],
		['2022-8-1', 14981.69],
		['2022-7-29', 15000.07],
		['2022-7-28', 14891.9],
		['2022-7-27', 14921.59],
		['2022-7-26', 14806.78],
		['2022-7-25', 14936.33],
		['2022-7-22', 14949.36],
		['2022-7-21', 14937.7],
		['2022-7-20', 14733.22],
		['2022-7-19', 14694.08],
		['2022-7-18', 14719.64],
		['2022-7-15', 14550.62],
		['2022-7-14', 14438.52],
		['2022-7-13', 14324.68],
		['2022-7-12', 13950.62],
		['2022-7-11', 14340.53],
		['2022-7-8', 14464.53],
		['2022-7-7', 14336.27],
		['2022-7-6', 13985.51],
		['2022-7-5', 14349.2],
		['2022-7-4', 14217.06],
		['2022-7-1', 14343.08],
		['2022-6-30', 14825.73],
		['2022-6-29', 15240.13],
		['2022-6-28', 15439.92],
		['2022-6-27', 15548.01],
		['2022-6-24', 15303.32],
		['2022-6-23', 15176.44],
		['2022-6-22', 15347.75],
		['2022-6-21', 15728.64],
		['2022-6-20', 15367.58],
		['2022-6-17', 15641.26],
		['2022-6-16', 15838.61],
		['2022-6-15', 15999.25],
		['2022-6-14', 16047.37],
		['2022-6-13', 16070.98],
		['2022-6-10', 16460.12],
		['2022-6-9', 16621.34],
		['2022-6-8', 16670.51],
		['2022-6-7', 16512.88],
		['2022-6-6', 16605.96],
		['2022-6-2', 16552.57],
		['2022-6-1', 16675.09],
		['2022-5-31', 16807.77],
		['2022-5-30', 16610.62],
		['2022-5-27', 16266.22],
		['2022-5-26', 15968.83],
		['2022-5-25', 16104.03],
		['2022-5-24', 15963.63],
		['2022-5-23', 16156.41],
		['2022-5-20', 16144.85],
		['2022-5-19', 16020.32],
		['2022-5-18', 16296.86],
		['2022-5-17', 16056.09],
		['2022-5-16', 15901.04],
		['2022-5-13', 15832.54],
		['2022-5-12', 15616.68],
		['2022-5-11', 16006.25],
		['2022-5-10', 16061.7],
		['2022-5-9', 16048.92],
		['2022-5-6', 16408.2],
		['2022-5-5', 16696.12],
		['2022-5-4', 16565.83],
		['2022-5-3', 16498.9],
		['2022-4-29', 16592.18],
		['2022-4-28', 16419.38],
		['2022-4-27', 16303.35],
		['2022-4-26', 16644.79],
		['2022-4-25', 16620.9],
		['2022-4-22', 17025.09],
		['2022-4-21', 17127.95],
		['2022-4-20', 17148.88],
		['2022-4-19', 16993.4],
		['2022-4-18', 16898.87],
		['2022-4-15', 17004.18],
		['2022-4-14', 17245.65],
		['2022-4-13', 17301.65],
		['2022-4-12', 16990.91],
		['2022-4-11', 17048.37],
		['2022-4-8', 17284.54],
		['2022-4-7', 17178.63],
		['2022-4-6', 17522.5],
		['2022-4-1', 17625.59],
		['2022-3-31', 17693.47],
		['2022-3-30', 17740.56],
		['2022-3-29', 17548.66],
		['2022-3-28', 17520.01],
		['2022-3-25', 17676.95],
		['2022-3-24', 17699.06],
		['2022-3-23', 17731.37],
		['2022-3-22', 17559.71],
		['2022-3-21', 17560.36],
		['2022-3-18', 17456.52],
		['2022-3-17', 17448.22],
		['2022-3-16', 16940.83],
		['2022-3-15', 16926.06],
		['2022-3-14', 17263.04],
		['2022-3-11', 17264.74],
		['2022-3-10', 17433.2],
		['2022-3-9', 17015.36],
		['2022-3-8', 16825.25],
		['2022-3-7', 17178.69],
		['2022-3-4', 17736.52],
		['2022-3-3', 17934.4],
		['2022-3-2', 17867.6],
		['2022-3-1', 17898.25],
		['2022-2-25', 17652.18],
		['2022-2-24', 17594.55],
		['2022-2-23', 18055.73],
		['2022-2-22', 17969.29],
		['2022-2-21', 18221.49],
		['2022-2-18', 18232.35],
		['2022-2-17', 18268.57],
		['2022-2-16', 18231.47],
		['2022-2-15', 17951.81],
		['2022-2-14', 17997.67],
		['2022-2-11', 18310.94],
		['2022-2-10', 18338.05],
		['2022-2-9', 18151.76],
		['2022-2-8', 17966.56],
		['2022-2-7', 17900.3],
		['2022-1-26', 17674.4],
		['2022-1-25', 17701.12],
		['2022-1-24', 17989.04],
		['2022-1-21', 17899.3],
		['2022-1-20', 18218.28],
		['2022-1-19', 18227.46],
		['2022-1-18', 18378.64],
		['2022-1-17', 18525.44],
		['2022-1-14', 18403.33],
		['2022-1-13', 18436.93],
		['2022-1-12', 18375.4],
		['2022-1-11', 18288.21],
		['2022-1-10', 18239.38],
		['2022-1-7', 18169.76],
		['2022-1-6', 18367.92],
		['2022-1-5', 18499.96],
		['2022-1-4', 18526.35],
		['2022-1-3', 18270.51],
		['2021-12-30', 18218.84],
		['2021-12-29', 18248.28],
		['2021-12-28', 18196.81],
		['2021-12-27', 18048.94],
		['2021-12-24', 17961.64],
		['2021-12-23', 17946.66],
		['2021-12-22', 17826.83],
		['2021-12-21', 17789.27],
		['2021-12-20', 17669.11],
		['2021-12-17', 17812.59],
		['2021-12-16', 17785.74],
		['2021-12-15', 17660.1],
		['2021-12-14', 17599.37],
		['2021-12-13', 17767.6],
		['2021-12-10', 17826.26],
		['2021-12-9', 17914.12],
		['2021-12-8', 17832.42],
		['2021-12-7', 17796.92],
		['2021-12-6', 17688.21],
		['2021-12-3', 17697.14],
		['2021-12-2', 17724.88],
		['2021-12-1', 17585.99],
		['2021-11-30', 17427.76],
		['2021-11-29', 17328.09],
		['2021-11-26', 17369.39],
		['2021-11-25', 17654.19],
		['2021-11-24', 17642.52],
		['2021-11-23', 17666.12],
		['2021-11-22', 17803.54],
		['2021-11-19', 17818.31],
		['2021-11-18', 17841.37],
		['2021-11-17', 17764.04],
		['2021-11-16', 17693.13],
		['2021-11-15', 17634.47],
		['2021-11-12', 17518.13],
		['2021-11-11', 17452.52],
		['2021-11-10', 17559.65],
		['2021-11-9', 17541.36],
		['2021-11-8', 17415.3],
		['2021-11-5', 17296.9],
		['2021-11-4', 17078.86],
		['2021-11-3', 17122.16],
		['2021-11-2', 17065.97],
		['2021-11-1', 17068.24],
		['2021-10-29', 16987.41],
		['2021-10-28', 17041.63],
		['2021-10-27', 17074.55],
		['2021-10-26', 17034.34],
		['2021-10-25', 16894.24],
		['2021-10-22', 16888.74],
		['2021-10-21', 16889.51],
		['2021-10-20', 16887.82],
		['2021-10-19', 16900.67],
		['2021-10-18', 16705.46],
		['2021-10-15', 16781.19],
		['2021-10-14', 16387.28],
		['2021-10-13', 16347.99],
		['2021-10-12', 16462.84],
		['2021-10-8', 16640.43],
		['2021-10-7', 16713.86],
		['2021-10-6', 16393.16],
		['2021-10-5', 16460.75],
		['2021-10-4', 16408.35],
		['2021-10-1', 16570.89],
		['2021-9-30', 16934.77],
		['2021-9-29', 16855.46],
		['2021-9-28', 17181.44],
		['2021-9-27', 17313.77],
		['2021-9-24', 17260.19],
		['2021-9-23', 17078.22],
		['2021-9-22', 16925.82],
		['2021-9-17', 17276.79],
		['2021-9-16', 17278.7],
		['2021-9-15', 17354],
		['2021-9-14', 17434.9],
		['2021-9-13', 17446.31],
		['2021-9-10', 17474.57],
		['2021-9-9', 17304.33],
		['2021-9-8', 17270.49],
		['2021-9-7', 17428.87],
		['2021-9-6', 17495.3],
		['2021-9-3', 17516.92],
		['2021-9-2', 17319.76],
		['2021-9-1', 17473.99],
		['2021-8-31', 17490.29],
		['2021-8-30', 17396.52],
		['2021-8-27', 17209.93],
		['2021-8-26', 17066.96],
		['2021-8-25', 17045.86],
		['2021-8-24', 16818.73],
		['2021-8-23', 16741.84],
		['2021-8-20', 16341.94],
		['2021-8-19', 16375.4],
		['2021-8-18', 16826.27],
		['2021-8-17', 16661.36],
		['2021-8-16', 16858.77],
		['2021-8-13', 16982.11],
		['2021-8-12', 17219.94],
		['2021-8-11', 17227.18],
		['2021-8-10', 17323.64],
		['2021-8-9', 17485.15],
		['2021-8-6', 17526.28],
		['2021-8-5', 17603.12],
		['2021-8-4', 17623.89],
		['2021-8-3', 17553.76],
		['2021-8-2', 17503.28],
		['2021-7-30', 17247.41],
		['2021-7-29', 17402.81],
		['2021-7-28', 17135.22],
		['2021-7-27', 17269.87],
		['2021-7-26', 17403.56],
		['2021-7-23', 17572.92],
		['2021-7-22', 17572.33],
		['2021-7-21', 17458.79],
		['2021-7-20', 17528.74],
		['2021-7-19', 17789.25],
		['2021-7-16', 17895.25],
		['2021-7-15', 18034.19],
		['2021-7-14', 17845.75],
		['2021-7-13', 17847.52],
		['2021-7-12', 17814.33],
		['2021-7-9', 17661.48],
		['2021-7-8', 17866.09],
		['2021-7-7', 17850.69],
		['2021-7-6', 17913.07],
		['2021-7-5', 17919.33],
		['2021-7-2', 17710.15],
		['2021-7-1', 17713.94],
		['2021-6-30', 17755.46],
		['2021-6-29', 17598.19],
		['2021-6-28', 17590.97],
		['2021-6-25', 17502.99],
		['2021-6-24', 17407.96],
		['2021-6-23', 17336.71],
		['2021-6-22', 17075.55],
		['2021-6-21', 17062.98],
		['2021-6-18', 17318.54],
		['2021-6-17', 17390.61],
		['2021-6-16', 17307.86],
		['2021-6-15', 17371.29],
		['2021-6-11', 17213.52],
		['2021-6-10', 17159.22],
		['2021-6-9', 16966.22],
		['2021-6-8', 17076.21],
		['2021-6-7', 17083.91],
		['2021-6-4', 17147.41],
		['2021-6-3', 17246.16],
		['2021-6-2', 17165.04],
		['2021-6-1', 17162.38],
		['2021-5-31', 17068.43],
		['2021-5-28', 16870.86],
		['2021-5-27', 16601.61],
		['2021-5-26', 16643.69],
		['2021-5-25', 16595.67],
		['2021-5-24', 16338.29],
		['2021-5-21', 16302.06],
		['2021-5-20', 16042.36],
		['2021-5-19', 16132.66],
		['2021-5-18', 16145.98],
		['2021-5-17', 15353.89],
		['2021-5-14', 15827.09],
		['2021-5-13', 15670.1],
		['2021-5-12', 15902.37],
		['2021-5-11', 16583.13],
		['2021-5-10', 17235.61],
		['2021-5-7', 17285],
		['2021-5-6', 16994.36],
		['2021-5-5', 16843.44],
		['2021-5-4', 16933.78],
		['2021-5-3', 17222.35],
		['2021-4-29', 17566.66],
		['2021-4-28', 17567.53],
		['2021-4-27', 17595.9],
		['2021-4-26', 17572.29],
		['2021-4-23', 17300.27],
		['2021-4-22', 17096.97],
		['2021-4-21', 17202.11],
		['2021-4-20', 17323.87],
		['2021-4-19', 17263.28],
		['2021-4-16', 17158.81],
		['2021-4-15', 17076.73],
		['2021-4-14', 16865.97],
		['2021-4-13', 16824.91],
		['2021-4-12', 16859.7],
		['2021-4-9', 16854.1],
		['2021-4-8', 16926.44],
		['2021-4-7', 16815.36],
		['2021-4-6', 16739.87],
		['2021-4-1', 16571.28],
		['2021-3-31', 16431.13],
		['2021-3-30', 16554.9],
		['2021-3-29', 16475.97],
		['2021-3-26', 16305.88],
		['2021-3-25', 16060.14],
		['2021-3-24', 16032.12],
		['2021-3-23', 16177.59],
		['2021-3-22', 16189.22],
		['2021-3-19', 16070.24],
		['2021-3-18', 16287.84],
		['2021-3-17', 16215.82],
		['2021-3-16', 16313.16],
		['2021-3-15', 16249.33],
		['2021-3-12', 16255.18],
		['2021-3-11', 16179.56],
		['2021-3-10', 15911.67],
		['2021-3-9', 15853.09],
		['2021-3-8', 15820.11],
		['2021-3-5', 15855.23],
		['2021-3-4', 15906.41],
		['2021-3-3', 16211.73],
		['2021-3-2', 15946.88],
		['2021-2-26', 15953.8],
		['2021-2-25', 16452.18],
		['2021-2-24', 16212.53],
		['2021-2-23', 16443.4],
		['2021-2-22', 16410.16],
		['2021-2-19', 16341.38],
		['2021-2-18', 16424.51],
		['2021-2-17', 16362.29],
		['2021-2-5', 15802.4],
		['2021-2-4', 15706.22],
		['2021-2-3', 15771.32],
		['2021-2-2', 15760.05],
		['2021-2-1', 15410.09],
		['2021-1-29', 15138.31],
		['2021-1-28', 15415.88],
		['2021-1-27', 15701.45],
		['2021-1-26', 15658.85],
		['2021-1-25', 15946.54],
		['2021-1-22', 16019.03],
		['2021-1-21', 16153.77],
		['2021-1-20', 15806.18],
		['2021-1-19', 15877.37],
		['2021-1-18', 15612],
		['2021-1-15', 15616.39],
		['2021-1-14', 15707.19],
		['2021-1-13', 15769.98],
		['2021-1-12', 15500.7],
		['2021-1-11', 15557.3],
		['2021-1-8', 15463.95],
		['2021-1-7', 15214],
		['2021-1-6', 14983.13],
		['2021-1-5', 15000.03],
		['2021-1-4', 14902.03],
		['2020-12-31', 14732.53],
		['2020-12-30', 14687.7],
		['2020-12-29', 14472.05],
		['2020-12-28', 14483.07],
		['2020-12-25', 14331.42],
		['2020-12-24', 14280.28],
		['2020-12-23', 14223.09],
		['2020-12-22', 14177.46],
		['2020-12-21', 14384.96],
		['2020-12-18', 14249.96],
		['2020-12-17', 14258.93],
		['2020-12-16', 14304.46],
		['2020-12-15', 14068.52],
		['2020-12-14', 14211.05],
		['2020-12-11', 14261.69],
		['2020-12-10', 14249.49],
		['2020-12-9', 14390.14],
		['2020-12-8', 14360.4],
		['2020-12-7', 14256.6],
		['2020-12-4', 14132.44],
		['2020-12-3', 13977.09],
		['2020-12-2', 13989.14],
		['2020-12-1', 13885.67],
		['2020-11-30', 13722.89],
		['2020-11-27', 13867.09],
		['2020-11-26', 13845.66],
		['2020-11-25', 13738.83],
		['2020-11-24', 13807.13],
		['2020-11-23', 13878.01],
		['2020-11-20', 13716.44],
		['2020-11-19', 13722.43],
		['2020-11-18', 13773.29],
		['2020-11-17', 13593.01],
		['2020-11-16', 13551.83],
		['2020-11-13', 13273.33],
		['2020-11-12', 13221.78],
		['2020-11-11', 13262.19],
		['2020-11-10', 13081.72],
		['2020-11-9', 13127.47],
		['2020-11-6', 12973.53],
		['2020-11-5', 12918.8],
		['2020-11-4', 12867.9],
		['2020-11-3', 12736.01],
		['2020-11-2', 12591.31],
		['2020-10-30', 12546.34],
		['2020-10-29', 12662.91],
		['2020-10-28', 12793.75],
		['2020-10-27', 12875.01],
		['2020-10-26', 12909.03],
		['2020-10-23', 12898.82],
		['2020-10-22', 12917.03],
		['2020-10-21', 12877.25],
		['2020-10-20', 12862.37],
		['2020-10-19', 12908.34],
		['2020-10-16', 12750.37],
		['2020-10-15', 12827.82],
		['2020-10-14', 12919.31],
		['2020-10-13', 12947.13],
		['2020-10-12', 12955.91],
		['2020-10-8', 12887.19],
		['2020-10-7', 12746.37],
		['2020-10-6', 12704.23],
		['2020-10-5', 12548.28],
		['2020-9-30', 12515.61],
		['2020-9-29', 12467.73],
		['2020-9-28', 12462.76],
		['2020-9-25', 12232.91],
		['2020-9-24', 12264.38],
		['2020-9-23', 12583.88],
		['2020-9-22', 12645.51],
		['2020-9-21', 12795.12],
		['2020-9-18', 12875.62],
		['2020-9-17', 12872.74],
		['2020-9-16', 12976.76],
		['2020-9-15', 12845.65],
		['2020-9-14', 12787.82],
		['2020-9-11', 12675.95],
		['2020-9-10', 12691.75],
		['2020-9-9', 12608.58],
		['2020-9-8', 12663.56],
		['2020-9-7', 12601.4],
		['2020-9-4', 12637.95],
		['2020-9-3', 12757.97],
		['2020-9-2', 12699.5],
		['2020-9-1', 12703.28],
		['2020-8-31', 12591.45],
		['2020-8-28', 12728.85],
		['2020-8-27', 12797.31],
		['2020-8-26', 12833.29],
		['2020-8-25', 12758.25],
		['2020-8-24', 12647.13],
		['2020-8-21', 12607.84],
		['2020-8-20', 12362.64],
		['2020-8-19', 12778.64],
		['2020-8-18', 12872.14],
		['2020-8-17', 12956.11],
		['2020-8-14', 12795.46],
		['2020-8-13', 12763.13],
		['2020-8-12', 12670.35],
		['2020-8-11', 12780.19],
		['2020-8-10', 12894],
		['2020-8-7', 12828.87],
		['2020-8-6', 12913.5],
		['2020-8-5', 12802.3],
		['2020-8-4', 12709.92],
		['2020-8-3', 12513.03],
		['2020-7-31', 12664.8],
		['2020-7-30', 12722.92],
		['2020-7-29', 12540.97],
		['2020-7-28', 12586.73],
		['2020-7-27', 12588.3],
		['2020-7-24', 12304.04],
		['2020-7-23', 12413.04],
		['2020-7-22', 12473.27],
		['2020-7-21', 12397.55],
		['2020-7-20', 12174.54],
		['2020-7-17', 12181.56],
		['2020-7-16', 12157.74],
		['2020-7-15', 12202.85],
		['2020-7-14', 12209.01],
		['2020-7-13', 12211.56],
		['2020-7-10', 12073.68],
		['2020-7-9', 12192.69],
		['2020-7-8', 12170.19],
		['2020-7-7', 12092.97],
		['2020-7-6', 12116.7],
		['2020-7-3', 11909.16],
		['2020-7-2', 11805.14],
		['2020-7-1', 11703.42],
		['2020-6-30', 11621.24],
		['2020-6-29', 11542.62],
		['2020-6-24', 11660.67],
		['2020-6-23', 11612.36],
		['2020-6-22', 11572.93],
		['2020-6-19', 11549.86],
		['2020-6-18', 11548.33],
		['2020-6-17', 11534.59],
		['2020-6-16', 11511.64],
		['2020-6-15', 11306.26],
		['2020-6-12', 11429.94],
		['2020-6-11', 11535.77],
		['2020-6-10', 11720.16],
		['2020-6-9', 11637.11],
		['2020-6-8', 11610.32],
		['2020-6-5', 11479.4],
		['2020-6-4', 11393.23],
		['2020-6-3', 11320.16],
		['2020-6-2', 11127.93],
		['2020-6-1', 11079.02],
		['2020-5-29', 10942.16],
		['2020-5-28', 10944.19],
		['2020-5-27', 11014.66],
		['2020-5-26', 10997.21],
		['2020-5-25', 10871.18],
		['2020-5-22', 10811.15],
		['2020-5-21', 11008.31],
		['2020-5-20', 10907.8],
		['2020-5-19', 10860.44],
		['2020-5-18', 10740.55],
		['2020-5-15', 10814.92],
		['2020-5-14', 10780.88],
		['2020-5-13', 10938.27],
		['2020-5-12', 10879.47],
		['2020-5-11', 11013.26],
		['2020-5-8', 10901.42],
		['2020-5-7', 10842.92],
		['2020-5-6', 10774.98],
		['2020-5-5', 10774.61],
		['2020-5-4', 10720.48],
		['2020-4-30', 10992.14],
		['2020-4-29', 10772.22],
		['2020-4-28', 10616.06],
		['2020-4-27', 10567.27],
		['2020-4-24', 10347.36],
		['2020-4-23', 10366.51],
		['2020-4-22', 10307.74],
		['2020-4-21', 10288.42],
		['2020-4-20', 10586.71],
		['2020-4-17', 10597.04],
		['2020-4-16', 10375.48],
		['2020-4-15', 10447.21],
		['2020-4-14', 10332.94],
		['2020-4-13', 10099.22],
		['2020-4-10', 10157.61],
		['2020-4-9', 10119.43],
		['2020-4-8', 10137.47],
		['2020-4-7', 9996.39],
		['2020-4-6', 9818.74],
		['2020-4-1', 9663.63],
		['2020-3-31', 9708.06],
		['2020-3-30', 9629.43],
		['2020-3-27', 9698.92],
		['2020-3-26', 9736.36],
		['2020-3-25', 9644.75],
		['2020-3-24', 9285.62],
		['2020-3-23', 8890.03],
		['2020-3-20', 9234.09],
		['2020-3-19', 8681.34],
		['2020-3-18', 9218.67],
		['2020-3-17', 9439.63],
		['2020-3-16', 9717.77],
		['2020-3-13', 10128.87],
		['2020-3-12', 10422.32],
		['2020-3-11', 10893.75],
		['2020-3-10', 11003.54],
		['2020-3-9', 10977.64],
		['2020-3-6', 11321.81],
		['2020-3-5', 11514.82],
		['2020-3-4', 11392.35],
		['2020-3-3', 11327.72],
		['2020-3-2', 11170.46],
		['2020-2-27', 11292.17],
		['2020-2-26', 11433.62],
		['2020-2-25', 11540.23],
		['2020-2-24', 11534.87],
		['2020-2-21', 11686.35],
		['2020-2-20', 11725.09],
		['2020-2-19', 11758.84],
		['2020-2-18', 11648.98],
		['2020-2-17', 11763.51],
		['2020-2-14', 11815.7],
		['2020-2-13', 11791.78],
		['2020-2-12', 11774.19],
		['2020-2-11', 11664.04],
		['2020-2-10', 11574.07],
		['2020-2-7', 11612.81],
		['2020-2-6', 11749.68],
		['2020-2-5', 11573.62],
		['2020-2-4', 11555.92],
		['2020-2-3', 11354.92],
		['2020-1-31', 11495.1],
		['2020-1-30', 11421.74],
		['2020-1-20', 12118.71],
		['2020-1-17', 12090.29],
		['2020-1-16', 12066.93],
		['2020-1-15', 12091.88],
		['2020-1-14', 12179.81],
		['2020-1-13', 12113.42],
		['2020-1-10', 12024.65],
		['2020-1-9', 11970.63],
		['2020-1-8', 11817.1],
		['2020-1-7', 11880.32],
		['2020-1-6', 11953.36],
		['2020-1-3', 12110.43],
		['2020-1-2', 12100.48],
	]

	const [option, setOption] = useState(null)

	useEffect(() => {
		const option = {
			backgroundColor: '',
			dataset: {
				source: indexData,
			},
			xAxis: {
				type: 'time',
			},
			yAxis: {
				type: 'value',
				name: '指數',
				min: function (value) {
					return Math.floor((value.min - 100) / 100) * 100
				},
			},
			series: [
				{
					type: 'line',
					color: '#4FBAFF',
					symbol: 'none',
					areaStyle: {
						color: {
							type: 'linear',
							x: 0,
							y: 0,
							x2: 0,
							y2: 1,
							colorStops: [
								{
									offset: 0,
									color: '#4FBAFF',
								},
								{
									offset: 1,
									color: 'white',
								},
							],
						},
					},
				},
			],
			grid: {
				x: 68,
				y: 48,
				x2: 20,
				y2: 96,
			},
			dataZoom: [
				{
					type: 'slider',
					height: 45,
					bottom: 20,
				},
			],
		}

		setOption(option)
	}, [])

	return (
		<>
			{option && (
				<ReactEcharts
					className='dark:bg-white rounded-2xl'
					option={option}
					style={{
						height: '100%',
						width: '100%',
					}}
				/>
			)}
		</>
	)
}
