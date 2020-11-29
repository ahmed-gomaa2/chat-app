import React, {useEffect} from 'react';
import './App.css';
import Chatters from "./components/Chatters";
import Landing from "./components/Landing";
import {Route, BrowserRouter} from "react-router-dom";
import {connect} from 'react-redux';
import * as actions from './actions';
import Home from "./components/Home";

const App = (props) => {
  return (
    <div className="app">
        <BrowserRouter>
            {!props.user.email ? (
                <Route exact component={() => <Landing />} />
            ) : (
                <Route exact component={() => <Home />} />
            ) }
        </BrowserRouter>
    </div>
  );
};

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.firebase.auth,
    }
}

export default connect(mapStateToProps, actions) (App);
