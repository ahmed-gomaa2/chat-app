import React from 'react';
import './css/Landing.css';
import ChatIcon from '@material-ui/icons/Chat';
import {connect} from 'react-redux';
import * as actions from '../actions';

const Landing = (props) => {
    const handleSignin = () => {
        props.loginUser();
    };
    return (
        <div className={'landing'}>
            <div className="landing__logo">
                <ChatIcon className={'landing__icon'} />
                <h1>Chatty</h1>
            </div>
            <div onClick={handleSignin} className="landing__links">
                <i className={'fab fa-google'}></i>
                <a>Login With Goggle</a>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        loginUser: () => dispatch(actions.loginUserWithGoogle())
    };
};

export default connect(null, mapDispatchToProps)(Landing);
