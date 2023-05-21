export default function Feedback() {
	return (
        <div>
            <form>
                <h1 className="flex justify-center font-bold text-3xl mt-10 py-10">意見回饋</h1>
                <div className="flex flex-col items-center mb-10">
                    <div>
                        <p className="flex justify-center text-lg">姓名</p>
                        <input type="text" name="name" className="mt-5 mb-5 border-2 border-black"></input> 
                    </div>
                    <div>
                        <p className="flex justify-center text-lg">E-Mail</p>
                        <input type="text" name="email" className="mt-5 mb-5 border-2 border-black"></input> 
                    </div>
                    <div>
                        <p className="flex justify-center text-lg">主旨</p>
                        <textarea name="title" rows="5" cols="30" className="mt-5 mb-5 border-2 border-black"></textarea>
                    </div>
                    <div>
                        <p className="flex justify-center">內容</p>
                        <textarea name="contents" rows="5" cols="30" className="mt-5 mb-5 border-2 border-black"></textarea>
                    </div>
                    <div>
                        <button 
                            className='flex px-12 py-2 mt-4 font-medium text-black duration-300 border-0 rounded-full cursor-pointer bg-primary_yellow hover:ring-2 hover:ring-offset-2  hover:ring-primary_yellow'
                            type="submit"
                        >送出</button>
                    </div>
                </div>
                
            </form>
        </div>
	)
}
