import React, {useEffect} from 'react';
import './css/Chatters.css';
import {DeleteOutlined} from "@material-ui/icons";
import {connect} from 'react-redux';
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import * as actions from '../actions';
import ChattersListItem from './ChattersListItem';
import firebase from '../config/firebase';
import {NavLink} from 'react-router-dom';

const Chatters = (props) => {
    const [searchResult, setSearchResult] = React.useState([]);
    const [chatRooms, setChatRooms] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [open, setOpen] = React.useState(true);

    useEffect(() => {
        const db = firebase.firestore();
        db.collection('users').doc(props.currentUser).collection('chatRooms').onSnapshot(snapshot => {
            setChatRooms(snapshot.docs.map(doc => doc.data()))
        })
    }, [props.currentUser])

    
    console.log(chatRooms)
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value)
        let value = e.target.value;

        if(value && value.trim().length > 0) {
            value = value.trim().toLowerCase();
            let usersMatch = [];

            for(let i = 0; i < props.users.length; i++) {
                if(props.users[i].name.trim().toLowerCase().includes(value)) {
                    usersMatch.push(props.users[i])
                };
            };
            setSearchResult(usersMatch);
        }else{
            clearList()
        }
    };

    const clearList = () => {
        setSearchResult([])
    }

    const clearSearchInput = (e) => {
        setSearchTerm('')
    }

    const openSidebar = () => {
        setOpen(!open)
    }

    return (
        <div className={`chatters ${open && 'chatters__open'}`}>
            <div onClick={openSidebar} className={`header__menu ${open && 'active'}`}>
                    <div></div>
                    <div></div>
                    <div></div>
            </div>
            <h1 className={'chatters__logo'}>Chatty</h1>
            <div className="chatters__list">
                <div className="chatters__search">
                    <form className={'chatters__form'} action="">
                        <input value={searchTerm} placeholder='Search For Your Friends' onChange={handleInputChange} type="text"/>
                    </form>
                    <ul className={'chatters__searchList'}>{searchResult.map(result => {
                        const currentUser = props.users.filter(user => {
                            return user.uid === props.currentUser
                        })
                        return <ChattersListItem clearSearchInput={clearSearchInput} clearList={clearList} currentUser={currentUser[0]} otherUser={result} />
                        
                    })}</ul>
                </div>
                {chatRooms?.map(chatRoom => (
                    <NavLink activeClassName='chatters__RoomActive' to={`/chatRooms/${chatRoom.friend.id}`} className="chatters__item">
                        <p className={'chatters__name'}>{chatRoom.friend.name}<span>{chatRoom.friend.email}</span></p>
                        <DeleteOutlined className={'chatters__delete'}/>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        users: state.firestore.ordered.users,
        currentUser: state.firebase.auth.uid
    }
}

export default compose(
    connect(mapStateToProps, actions),
    firestoreConnect((props) => [
        {
            collection: 'users',
        }
    ])
) (Chatters);
