import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import SearchInput from '../SearchInput/SearchInput'
import SidebarBlock from '../../ui/SidebarBlock1'

export default function NewsSidebar({ hotNews, setNewsByKeyword, setTotalPages }) {
	return (
		<div className='hidden space-y-8 w-96 md:block'>
			<SearchInput setNewsByKeyword={setNewsByKeyword} setTotalPages={setTotalPages} />
			<SidebarBlock icon={<RocketLaunchIcon className='dark:text-white' />} title={'熱門新聞'} data={hotNews} />
		</div>
	)
}
