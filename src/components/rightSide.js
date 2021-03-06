import React from 'react';
import { Route } from 'react-router-dom'
import EventInfo from './events/EventInfo'
import { useChat } from './../context/chatState';

const RightSide = () => {

    const { events} = useChat()


    return (
        <div className=" mt-2 ml-3 d-flex flex-column " style={{width: '250px', height: 'auto'}}>

        <Route path="/events">
            { events !== undefined && <EventInfo />}
        </Route>
        
            
        </div>
    );
};

export default RightSide;