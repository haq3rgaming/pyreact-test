import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";

import {userNamesFetch} from "../store /actions/sessionReducer"

function Message({ props }) {
    const session = useSelector((state) => state.session.sessionData);
    const usernames = useSelector((state) => state.session.userNames);

    const dispatch = useDispatch()
    
    const getUsername = (userID) => {
        // skusi najst id v usernames
        if (usernames[userID] !== undefined) {
            return usernames[userID];
        }
        else
        {
            dispatch(userNamesFetch(userID));
        }
    }

    if (props.sender === session.id) {
        return (
            <div className="MessageRecv">
                <div className="MessageSender">{session.displayName}</div>
                <div className="MessageContentRecv">{props.content}</div>
            </div>
        );
    }
    else {
        return (
           <div className="MessageSend">
                <div className="MessageSender">{getUsername(props.sender)}</div>
                <div className="MessageContentSend">{props.content}</div>
            </div>
        );
    }
}

export default Message;