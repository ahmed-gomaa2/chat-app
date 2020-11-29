import React from 'react';
import './css/Home.css';
import Chatters from "./Chatters";
import ChattingBody from "./ChattingBody";
import {BrowserRouter, Route} from 'react-router-dom';

const Home = () => {
    return (
        <div className={'home'}>
            <BrowserRouter>
                <Chatters />
                <Route exact path={'/chatRooms/:roomId'} component={() => <ChattingBody />} />
            </BrowserRouter>
        </div>
    );
};

export default Home;
