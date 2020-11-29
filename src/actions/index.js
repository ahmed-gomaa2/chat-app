import {provider} from "../config/firebase";

export const loginUserWithGoogle = () => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();
    firebase.auth().signInWithPopup(provider).then(result => {
        console.log(result)
        if(result.additionalUserInfo.isNewUser) {
            firestore.collection('users').doc(result.user.uid).set({
                name: result.user.displayName,
                email: result.user.email,
                uid: result.user.uid,
                image: result.user.photoURL
            })
        }
    }).catch(err => {
        dispatch({
            type: 'LOGIN_USER_ERR',
            payload: err
        })
    })

}

export const logoutUser = () => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signOut().then(() => {
        dispatch({type: 'LOGOUT_USER'})
    })
}


export const createChatRoom = (currentUser, otherUser) => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    console.log(currentUser.id)
    console.log(otherUser.id)

    firestore.collection('users').doc(currentUser.id).collection('chatRooms').doc(otherUser.uid).set({
        friend: otherUser
    }).then(() => {
        firestore.collection('users').doc(otherUser.id).collection('chatRooms').doc(currentUser.uid).set({
            friend: currentUser
        })
    })
}

export const createMessage = (room, currentUser, message) => (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    firestore.collection('users').doc(currentUser).collection('chatRooms').doc(room).collection('messages').add({
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        uid: currentUser
    }).then(() => {
        firestore.collection('users').doc(room).collection('chatRooms').doc(currentUser).collection('messages').add({
            message: message,
            uid: currentUser,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        })
    })
}