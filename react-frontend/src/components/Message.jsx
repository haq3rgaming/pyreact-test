import React from 'react';

function Message({ props }) {
  
    if (props.type === "recv") {
        return (
            <div className="MessageRecv">
                <div className="MessageSender">{props.sender}</div>
                <div className="MessageContentRecv">{props.content}</div>
            </div>
        );
    }
    else {
        return (
           <div className="MessageSend">
                <div className="MessageSender">{props.sender}</div>
                <div className="MessageContentSend">{props.content}</div>
            </div>
        );
    }
  
}

export default Message;