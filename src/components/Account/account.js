import React from 'react';
import { useAuth } from '../../context/authState'

const Account = () => {

    const { currentUser } = useAuth

    return (
        <div>
            {currentUser.name}
        </div>
    );
};

export default Account;