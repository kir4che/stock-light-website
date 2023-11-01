import { Alert, Button } from "@mui/material"
import { useRouter } from 'next/router'
import { useState } from "react"
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'

export default function Card() {
    const router = useRouter()
    const { category } = router.query

    const today = new Date()
    const data_options = { month: 'long', day: 'numeric', year: 'numeric' }
    const formattedDate = today.toLocaleDateString('zh-TW', data_options)

    const SaveBtn = () => {
        const [open, setOpen] = useState(false)

        const handleSave = () => setOpen(true)
        const handleClose = () => setOpen(false)

        return (
            <Stack>
                <Button
                    type='text'
                    size='large'
                    onClick={() => {
                        handleSave()
                    }}
                    className='mx-52 px-8 py-2.5 font-bold tracking-widest rounded-full decoration-auto bg-gradient-to-r text-zinc-800 bg-amber-400'
                >
                    儲存小卡
                </Button>
                <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }}>
                        保存成功！
                    </Alert>
                </Snackbar>
            </Stack>
        )
    }

    const card_options = 0

    return (
        <div className='px-6 py-10 mb-4 bg-white shadow-md rounded-3xl'>
            <div className='flex flex-col align-middle md:gap-4 md:flex-row'>
                <div className='w-80 shrink-60 shadow-yellow-500/50 car_animated'>
                    {/* 是打算可在這邊放隨機圖檔 */}
                    <img src='/assets/cardtest.jpg' alt='' />
                </div>
                <div className='text-black'>
                    <span className='font-medium'>{formattedDate}</span>
                    <div className='block mb-6 text-lg font-bold text-black '>{category}類股</div>
                    {/* 之後由 GPT 生成 */}
                    <div className='mb-3 ml-4 leading-7'>
                        衷心祝賀您在投資領域的卓越成就，您的智慧和勇氣為我們帶來了成功的新里程碑。願您的投資之路充滿更多成功和繁榮！
                    </div>
                    <SaveBtn/>
                </div>
            </div>
            <div className='praise_card_pagination'></div>
        </div>

    )
}