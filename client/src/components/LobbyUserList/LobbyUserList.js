import React from 'react';
import './LobbyUserList.scss';

const LobbyUserList = ({ users = [] }) => {

console.log('users', users);

    return (
       <div className="lobby-user-list">

            {
                users.map((user, index) => <div key={'user-'+index} className="lobby-user-list__user"><span className="lobby-user-list__user__name">{user.name || 'unknown'}</span></div>)
            }

       </div>
    )
}

export default LobbyUserList;