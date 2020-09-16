import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LogoutButton from "./LogoutButton";
import {refreshPage} from "../helpers/reload"
import PersonIcon from '@material-ui/icons/Person';
import ShopIcon from '@material-ui/icons/Shop';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import backgr from './images/background.jpg'
import lightBlue from "@material-ui/core/colors/lightBlue";
const host = "http://localhost:9000/";

function signOut(user) {
    fetch(host + "api/signOut", {
        method: "GET",
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'X-Auth-Token': user?.token
        }
    });
}


class Shop extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Welcome to the online store</h1>
                <div onClick={() => refreshPage()}><LogoutButton> </LogoutButton></div>
                <nav>
                    <div><ShopIcon fontSize="large" style={{ color: lightBlue[50] }}/><Link to="/products" className="link">Products</Link></div>
                    <div><PersonIcon fontSize="large" style={{ color: lightBlue[50] }}/><Link to="/user" className="link">User</Link></div>
                    <div><ShoppingBasketIcon fontSize="large" style={{ color: lightBlue[50] }}/> <Link to="/basket" className="link">Basket</Link></div>
                    <div><VpnKeyIcon fontSize="large" style={{ color: lightBlue[50] }}/> <Link to="/login" className="link">Login</Link></div>
                </nav>
                <img src={backgr} alt="backgr" />



            </div>
        )
    }
}

export default Shop;