import React from 'react';
import './css/ChattersListItem.css';
import * as actions from '../actions';
import {connect} from 'react-redux';
import {Avatar} from '@material-ui/core';
import firebase from '../config/firebase';

const ChattersListItem = (props) => {

    const createNewRoom = () => {
        const currentUser = props.currentUser;
        const otherUser = props.otherUser;
        const db = firebase.firestore();
        const friend = db.collection('users').doc(currentUser.id).collection('chatRooms').doc(otherUser.uid).get()
        .then(doc => {
            if(doc.exists) {
                console.log('exists')
                props.clearSearchInput();
            }else {
                props.createChatRoom(currentUser, otherUser);
                props.clearList();
                props.clearSearchInput();
            }
    
        })
    }

    return <li onClick={createNewRoom} ><Avatar className='chatter__img' src={props.otherUser.image}/>{props.otherUser.name}</li>
}


export default connect(null, actions) (ChattersListItem);