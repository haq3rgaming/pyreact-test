import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import Message from "../components/Message";

function Home() {

    const [messages, setMessages] = useState([]);
    // figure out how to share cookies between react and flask
    useEffect(() => {
        fetch("/chat/posts", {
            method: "GET",
            credentials: 'include'
        })
            .then((res) => {
            if (res.status === 401) {
                return [];
            } else {
                return res.json();
            }
            })
            .then((data) => {
                setMessages(data);
            });
    }, []);

    const isLoggedIn = localStorage.getItem("session") !== null;

    return (
        <div className="Container">
            <div className="Header">
                {isLoggedIn ? (
                    <Link to="/logout" className="HeaderLink">
                        Logout
                    </Link>
                ) : (
                    <>
                        <Link to="/login" className="HeaderLink">
                            Login
                        </Link>
                        <Link to="/register" className="HeaderLink">
                            Register
                        </Link>
                    </>
                )}
            </div>
            <hr />
            <div className="VerticalLine" />
            <div className="Messages">
                <Message props={{ type: "recv", content: "hello", sender: "ja" }} />
                <Message props={{ type: "send", content: "hi", sender: "me" }} />
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <div key={index}>{message.content}</div>
                    ))
                ) : (
                    <p>Not logged in</p>
                )}
            </div>
            <div className="MessageInputs">
                <input className="MessageInputField" placeholder="Message" />
                <button className="MessageSendButton">Send</button>
            </div>
        </div>
    );
}

export default Home;
