import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import LogoutButton from "./LogoutButton";
import {refreshPage} from "../helpers/reload"


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
                <h1>eShop</h1>
                <div onClick={() => refreshPage()}><LogoutButton> </LogoutButton></div>
                <nav>
                    <div><Link to="/products" className="link">Products</Link></div>
                    <div><Link to="/user" className="link">User</Link></div>
                    <div><Link to="/basket" className="link">Basket</Link></div>
                    <div><Link to="/login" className="link">Login</Link></div>
                </nav>
            </div>
        )
    }
}

export default Shop;