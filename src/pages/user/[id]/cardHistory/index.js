import StarryBackground from '@/components/common/StarryBackground'


export default function cardHistory() {
    return [
        <StarryBackground className={'pt-12 pb-9 sm:pt-20 sm:pb-16 text-zinc-100'}>
            <section class="card-section"></section>
            <div class="card-grid">
                <a class="card" href="#">
                    <div class="card__background" >
                        <img src='https://img.lovepik.com/photo/40147/0563.jpg_wh300.jpg' alt='' />
                    </div>
                    <div class="card__content">
                        <p class="card__date">2023年10月28日</p>
                        <h3 class="card__category">金融類股</h3>
                    </div>
                </a>
            </div>
 
        </StarryBackground>
    ]
}