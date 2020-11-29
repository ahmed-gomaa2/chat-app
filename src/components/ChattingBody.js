import React, {forwardRef} from 'react';
import './css/ChattingBody.css';
import * as actions from '../actions';
import {connect} from 'react-redux';
import firebase from '../config/firebase';
import {useParams} from 'react-router-dom';
import FlipMove from 'react-flip-move';

const ChattingBody = (props, ref) => {
    const {roomId} = useParams();
    const [roomName, setRoomName] = React.useState('');
    const [messageValue, setMessageValue] = React.useState('');
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        // messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, [])
 
    React.useEffect(() => {
        if(roomId) {
            console.log(roomId)
            const db = firebase.firestore();
            console.log(db)
            db.collection('users').doc(props.currentUser.uid).collection('chatRooms').doc(roomId).collection('messages').orderBy('timestamp','asc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()))
            })
        }
    }, [roomId])

    console.log(messages)

    const sendNewMessage = (e) => {
        e.preventDefault();
        const currentUser = props.currentUser.uid;
        const room = roomId;
        const message = messageValue;
        props.createMessage(room, currentUser, message);
        setMessageValue('')
    }

    const handleLogout = () => {
        props.logoutUser();
    }
    return (
        <div className={'chattingBody'}>
            <div className="chattingBody__header">
                <h4>{props.currentUser.displayName}</h4>
                <div onClick={handleLogout} className="chattingBody__logout">
                    Logout
                </div>
            </div>
            <div className='chattingBody__messages'>
                <FlipMove>
                {messages.map(message => (
                    <p ref={ref} className={`chattingBody__message ${message.uid === props.currentUser.uid ? 'chattingBody__owner' : ''}`}>
                        <span className='chattingBody__messageBody'>{message.message}</span>
                        <span className={`chattingBody__messageTimestamp ${message.uid === props.currentUser.uid ? 'chattingBody__messageTimestampOwner' : ''}`}>{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                    </p>
                ))}
                </FlipMove>
                
            </div>

            <form className={'chattingBody__form'} onSubmit={sendNewMessage}>
                <input type='text' onChange={(e) => setMessageValue(e.target.value)} value={messageValue} />
                <button type='submit'>Send</button>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        currentUser: state.firebase.auth
    }
}

export default connect(mapStateToProps, actions) (ChattingBody);

