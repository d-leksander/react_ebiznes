import React, {Component} from 'react';
import "../styles/login.css";
import "../helpers/user";
import RedirectButton from "./RedirectButton";
import {getUser} from "../helpers/user"
import FacebookIcon from '@material-ui/icons/Facebook';
import GTranslateIcon from '@material-ui/icons/GTranslate';

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

                <div className="login">
                    <h1>Welcome to the online store</h1>
                    <h2>Here you can buy computer equipment and accessories</h2>
                    <div className="loginButtons">
                        <GTranslateIcon color="secondary">gl</GTranslateIcon>
                        <RedirectButton provider={"google"} title={"Sign in with Google"}/>
                        <FacebookIcon color="primary">fb</FacebookIcon>
                        <RedirectButton provider={"facebook"} title={"Sign in with Facebook"}/>
                    </div>

                    <a href="http://localhost:3000/" onClick={() => getUser() ? null : alert("No authorization. Please login!")}
                       className="llogin">Go to the store

                    </a>
                </div>


            </div>
        )
    }
}

export default Login;