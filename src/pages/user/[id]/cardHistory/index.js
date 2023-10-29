import StarryBackground from '@/components/common/StarryBackground'


export default function cardHistory() {
    return [
        <StarryBackground className={'pt-12 pb-3 sm:pt-20 sm:pb-16 text-zinc-100'}>
            <section className='flex flex-row items-start min-h-full justify-center' >
                <div className="card-grid gap-10">
                    <a className="list-none relative card" href="#">
                        <div className="card__background" >
                            <img src='https://img.lovepik.com/photo/40147/0563.jpg_wh300.jpg' alt='' />
                        </div>
                        <div className="left-0 top-0 absolute">
                            <p className="text-sm uppercase">2023年10月28日</p>
                            <h3 className="card__category">金融類股</h3>
                        </div>
                    </a>

                    <a className="list-none relative card" href="#">
                        <div className="card__background" >
                            <img src='/assets/cardtest.jpg' alt='' className='scale-90'/>
                        </div>
                        <div className="left-0 top-0 absolute">
                            <p className="text-sm uppercase">2023年10月28日</p>
                            <h3 className="card__category">金融類股</h3>
                        </div>
                    </a>

                    <a className="list-none relative card" href="#">
                        <div className="card__background" >
                            <img src='https://fakeimg.pl/300x172' alt='' />
                        </div>
                        <div className="left-0 top-0 absolute">
                            <p className="text-sm uppercase">2023年10月28日</p>
                            <h3 className="card__category">金融類股</h3>
                        </div>
                    </a>

                    <a className="list-none relative card" href="#">
                        <div className="card__background" >
                            <img src='https://fakeimg.pl/300x172' alt='' />
                        </div>
                        <div className="left-0 top-0 absolute">
                            <p className="text-sm uppercase">2023年10月28日</p>
                            <h3 className="card__category">金融類股</h3>
                        </div>
                    </a>

                    <a className="list-none relative card" href="#">
                        <div className="card__background" >
                            <img src='https://fakeimg.pl/300x172' alt='' />
                        </div>
                        <div className="left-0 top-0 absolute">
                            <p className="text-sm uppercase">2023年10月28日</p>
                            <h3 className="card__category">金融類股</h3>
                        </div>
                    </a>

                </div>
            </section>
        </StarryBackground>
    ]
}