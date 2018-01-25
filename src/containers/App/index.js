// @flow
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './App.css';
import {msalLogin, msalLogout, msalGetUser, msalFetch} from '../../msal/index';
import * as counterActions from '../../actions/counter';

export class App extends Component<{}> {
    constructor() {
        super();
        this.state = {
            userInfo: null,
            responseData: null,
        };
        console.log(['1', '2', '3', '4'].find(item => item === '3'));
    }

    componentDidMount() {
        this.setState({userInfo: msalGetUser()});
    }

    logIn = () => {
        msalLogin().then(user => {
            if (user) {
                this.setState({userInfo: user});
                console.log(user);
            } else {
            }
        });
    };

    logOut = () => {
        console.log('logging out...');
        msalLogout();
    };

    request = () => {
        console.log('Sending request...');
        msalFetch('/api/endpoint')
            .then(responseData => {
                this.setState({responseData});
                console.log('API response', responseData);
            })
            .catch(err => {
                console.error(err);
            });
    };

    onInc = () => {
        this.props.actions.increment(1);
    };

    onDec = () => {
        this.props.actions.decrement(1);
    };

    render() {
        const userInfo = this.state.userInfo;

        const userPane = userInfo && (
            <div>
                <h2>User object (from auth response):</h2>
                <pre>{JSON.stringify(userInfo, null, 4)}</pre>
            </div>
        );

        const respData = this.state.responseData && (
            <div>
                <h2>API response:</h2>
                <pre>{JSON.stringify(this.state.responseData, null, 4)}</pre>
            </div>
        );

        return (
            <div>
                <p className="App-intro">
                    Edit <code>msal/msal-config.js</code> first.
                </p>
                {!userInfo && <button onClick={this.logIn}>Login</button>}
                {userInfo && <button onClick={this.logOut}>Logout</button>}
                {userInfo && <button onClick={this.request}>Make request</button>}
                {userPane}
                {respData}
                Counter = {this.props.counter} <br />
                <button onClick={this.onInc}>+</button>
                <button onClick={this.onDec}>-</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    counter: state.counter.val,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(counterActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
