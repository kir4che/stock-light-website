export default function Lantern() {
	return (
		<div className='container'>
			<section className='z-100'>
				<div className='blur'>
					{[...Array(120)].map((_, z) => (
						<img
							key={z}
							className={`lantern l${z + 1}`}
							src='https://docs.google.com/uc?id=1ec4r4r03X32PxdA92yWSgx1k6Fx2hb-O'
							alt='天燈'
						/>
					))}
				</div>
				{[...Array(220)].map((_, i) => (
					<img
						key={i}
						className={`lantern l${i + 1}`}
						src='https://docs.google.com/uc?id=1ec4r4r03X32PxdA92yWSgx1k6Fx2hb-O'
						alt='天燈'
					/>
				))}
			</section>
		</div>
	)
}
