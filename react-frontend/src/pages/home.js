import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {loadData} from "../store /actions/sessionReducer"

import { Link } from "react-router-dom";
import Message from "../components/Message";

function Home() {
    const dispatch = useDispatch()
    const data = useSelector((state) => state.session.sessionData);
    
    const [messages, setMessages] = useState([]);

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

    useEffect(() => {
        dispatch(loadData())
    }, []);

    return (
        <div className="Container">
            <div className="Header">
                {data.id !== undefined ? (
                    <>
                        <div>
                            <p>{data.displayName}</p>
                        </div>
                        <Link to="/logout" className="HeaderLink">
                            Logout
                        </Link>
                    </>
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
                {messages.length > 0 ? (
                    messages.map((message, index) => (
                        <Message key={index} props={{ content: message.content, sender: message.authorId }} />
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
