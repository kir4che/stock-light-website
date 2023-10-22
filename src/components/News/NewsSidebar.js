import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'

import SidebarBlock from '@/components/News/SidebarBlock'
import SearchInput from '@/components/ui/SearchInput'

export default function NewsSidebar({ hotNews, setNewsByKeyword }) {
	return (
		<div className='hidden space-y-8 w-96 md:block'>
			<SearchInput setNewsByKeyword={setNewsByKeyword} />
			<SidebarBlock icon={<RocketLaunchIcon className='dark:text-white' />} title={'熱門新聞'} data={hotNews} />
		</div>
	)
}
