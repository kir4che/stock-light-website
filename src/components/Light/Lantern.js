import { useState } from 'react'

export default function Lantern(start) {
	const [position, setPosition] = useState(start)
	const getRandomCoordinates = () => {
		const getx = Math.random()
		const gety = Math.random()
		return { getx, gety }
	}
	/*
		useEffect(() => {
		  const position = getRandomCoordinates()

		  const interval = setInterval(() => {
			setPosition(position => position - 1);
		  }, 3000);
	  
		  return () => clearInterval(interval);
		}, []);
	  	*/
	return <></>
}
