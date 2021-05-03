import Sidebar from './sidebar'
import OpenEvents from './openEvent'
import { useChat } from '../context/chatState'

const Dashboard = () => {

    const { selectedEvent } = useChat()

    return (
    <div className="d-flex" style={{ height: '100vh' }}>
        <Sidebar/>
        {selectedEvent && <OpenEvents />}
        
    </div>
    )

}

export default Dashboard