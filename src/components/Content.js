import Sidebar from './Sidebar'
import Profile from './Profile'
import Messages from './Messages'


const Content = () => {
  return (
    <div className="flex flex-col md:flex-row" >
      <Sidebar />
      <Messages />
    </div>
  )
}

export default Content;