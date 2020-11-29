import React from 'react';
import './css/ChattingBodyMessages.css';
import {useParams} from 'react-router-dom';
import firebase from '../config/firebase';
import {connect} from 'react-redux';
import * as actions from '../actions';

const ChattingBodyMessages = (props) => {
    const roomId = useParams();
    const [roomName, setRoomName] = React.useState('');
    const [messageValue, setMessageValue] = React.useState('');

    React.useEffect(() => {
        if(roomId) {
            const db = firebase.firestore();
            db.collection('users').doc(props.currentUser).collection('chatRooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
            })
        }
    }, [roomId])

    const sendNewMessage = () => {
        const currentUser = props.currentUser;
        const room = roomId;
        const message = messageValue;
        props.createMessage(room, currentUser, message);
    }

    return (
        <form onSubmit={sendNewMessage}>
            <input type='text' onChange={(e) => setMessageValue(e.target.value)} value={messageValue} />
        </form>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.firebase.auth.uid
    }
}


export default connect(mapStateToProps, actions) (ChattingBodyMessages);