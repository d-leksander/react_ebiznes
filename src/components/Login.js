import React, {Component} from 'react';
import "../styles/login.css";
import "../helpers/user";
import RedirectButton from "./RedirectButton";
import {getUser} from "../helpers/user"

class Login extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            loggedIn: false
        }
    }

    render() {
        return (
            <div>
                <a href="http://localhost:3000/" onClick={() => getUser() ? null : alert("Login first!")}
                   className="back">eShop</a>
                <div className="login">
                    <h1>Login to eShop</h1>
                    <div className="loginButtons">
                        <RedirectButton provider={"google"} title={"Login with Google"}/>
                        <RedirectButton provider={"facebook"} title={"Login with Facebook"}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;