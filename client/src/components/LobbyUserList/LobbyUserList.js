import React from 'react';
import './LobbyUserList.scss';

const LobbyUserList = ({ users = [] }) => {
    return (
       <div className="lobby-user-list">

            {
                users.map((user, index) => <div key={'user-'+index} className="lobby-user-list__user"><span className="lobby-user-list__user__name">{user.name}</span></div>)
            }

       </div>
    )
}

export default LobbyUserList;