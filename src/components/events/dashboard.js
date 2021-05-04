import Sidebar from './sidebar'
import OpenEvents from './openEvent'
import { useChat } from '../../context/chatState'

const Dashboard = () => {

    const { events, selectedEventIndex } = useChat()

    return (
    <div className="d-flex" style={{ height: '50vh' }}>
        <Sidebar/>
        {events[selectedEventIndex] && <OpenEvents />}
        
    </div>
    )

}

export default Dashboard