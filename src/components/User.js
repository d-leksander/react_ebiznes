import React, {Component} from 'react';
import "../styles/user.css";
import FavouriteProducts from "./FavouriteProducts";
import OrderedProducts from "./OrderedProducts";
import Payments from "./Payments";
import {getUser} from "../helpers/user"

class User extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: getUser(),
            userSettings: null,
            orders: null,
            payments: null,
            orderedProducts: [],
            favouriteProducts: [],
        }
    }

    componentDidMount() {
        this.getUserPayments(this.state.user.id);
        this.getFavourites(this.state.user.id);
        this.getOrders(this.state.user.id);
        console.log(getUser());
    }

    getUserPayments(idUser) {
        fetch(`http://localhost:9000/api/userpayments/${idUser}`, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
            }
        )
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({payments: result});
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    getFavourites(idUser) {
        fetch(`http://localhost:9000/api/userfavourites/${idUser}`, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
            }
        )
            .then(res => res.json())
            .then(
                (result) => {
                    result.forEach(favourite => this.getFavouriteProduct(favourite.idProducts, favourite.idFavourites));
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    getFavouriteProduct(idProduct, idFavourites) {
        fetch(`http://localhost:9000/api/product/${idProduct}`, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
            }
        )
            .then(res => res.json())
            .then(
                (result) => {
                    this.addFavouriteProduct(result, idFavourites);
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    addFavouriteProduct(product, idFavourites) {
        let products = this.state.favouriteProducts;
        product.idFavourites = idFavourites;
        products.push(product);
        this.setState({favouriteProducts: products});
    }

    getOrders(idUser) {
        fetch(`http://localhost:9000/api/userorders/${idUser}`, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
            }
        )
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({orders: result});
                    result.forEach(order => this.getOrderedProduct(order.idProducts));
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    getOrderedProduct(idProduct) {
        fetch(`http://localhost:9000/api/product/${idProduct}`, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
            }
        )
            .then(res => res.json())
            .then(
                (result) => {
                    this.addOrderedProduct(result);

                },
                (error) => {
                    console.log(error)
                }
            )
    }

    addOrderedProduct(product) {
        let products = this.state.orderedProducts;
        products.push(product);
        this.setState({orderedProducts: products});
    }

    render() {
        return (
            <div>
                <a href="http://localhost:3000/" className="back">Back</a>
                <div className="info">
                    <h1>{this.state.user.firstName} here is a summary of your operations</h1>
                </div>

                <div className="user">
                    <div>
                        <h3>{this.state.user.firstName} {this.state.user.lastName}</h3>
                        <p>{this.state.user.email}</p>
                    </div>

                </div>
                {this.state.favouriteProducts ? <FavouriteProducts favourites={this.state.favouriteProducts}/> : null}
                <div className="enter">enter</div>
                {this.state.orderedProducts ?
                    <OrderedProducts ordered={this.state.orders} products={this.state.orderedProducts}/> : null}
                {this.state.payments ? <Payments payments={this.state.payments}/> : null}
            </div>
        )
    }
}

export default User;