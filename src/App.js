import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Shop from "./components/Shop";
import Products from "./components/Products";
import Basket from "./components/Basket";
import SiteNotFound from "./components/SiteNotFound";
import User from "./components/User";
import Login from "./components/Login";
import './styles/shop.css';
import UserProvider from "./providers/UserProvider";
import Redirect from "./components/Redirect";
import {getUser} from "./helpers/user"

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: getUser()
        }
    }

    render() {
        return (
            <UserProvider>
                <BrowserRouter>
                    <div className="App">
                        {this.state.user ?
                            <Switch>
                                <Route exact path="/" component={Shop}/>
                                <Route path="/basket" component={Basket}/>
                                <Route path="/user" component={User}/>
                                <Route path="/products" component={Products}/>
                                <Route path="/redirect/:provider" component={Redirect}/>
                                <Route path="/login" component={Login}/>
                                <Route path="*" component={SiteNotFound}/>
                            </Switch> :
                            <Switch>
                                <Route path="/redirect/:provider" component={Redirect}/>
                                <Route path="/*" component={Login}/>
                                <Route path="*" component={SiteNotFound}/>
                            </Switch>}
                    </div>
                </BrowserRouter>
            </UserProvider>
        );
    }
}

export default App;