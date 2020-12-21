import MenuLeft from '@/components/common/MenuLeft'
import TopBar from '@/components/common/TopBar'
import WorkTab from '@/components/common/WorkTab'
import Personality from '@/components/common/Personality'
import TaoTable from '@/components/common/TaoTable'
import TableBar from '@/components/common/TableBar'

export default (Vue)=>{
  Vue.component("menu-left", MenuLeft)
  Vue.component("top-bar", TopBar)
  Vue.component("work-tab", WorkTab)
  Vue.component("personality", Personality)
  Vue.component("tao-table", TaoTable)
  Vue.component("table-bar", TableBar)
}