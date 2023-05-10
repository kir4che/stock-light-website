import ReactLoading from "react-loading";

export default function Taiex() {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    setIsLoading(true);

    setIsLoading(false);
  }, []);

  return (
    isLoading ? <ReactLoading type={'spin'} /> : <></>
  )
}