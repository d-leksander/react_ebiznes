import React, {Component} from 'react';
import BasketProduct from "./BasketProduct";
import {getUser} from "../helpers/user"

class Basket extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: getUser(),
            basketData: null,
            products: [],
            deliveries: [],
            selectedDelivery: null,
            cartSum: null
        }
    }

    componentDidMount() {
        this.getUserBasket(this.state.user.id);
        this.getDeliveries();

        const date = this.getSQLDate();
        console.log(date);
    }

    getUserBasket(idUser) {
        fetch(`http://localhost:9000/api/basket/${idUser}`, {
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
                    this.setState({basketData: result});
                    result.forEach(basket => this.getProduct(basket.idProducts, basket.idBaskets));
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    getProduct(idProduct, idBaskets) {
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
                    console.log(result);
                    this.addProduct(result, idBaskets);

                },
                (error) => {
                    console.log(error)
                }
            )
    }

    getDeliveries() {
        fetch(`http://localhost:9000/api/deliverys `, {
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
                    this.setState({
                        deliveries: result
                    })

                },
                (error) => {
                    console.log(error)
                }
            )
    }

    addProduct(product, idBaskets) {
        let products = this.state.products;
        product.idBaskets = idBaskets;
        products.push(product);
        this.setState({products: products});
    }

    displayFilteredProducts = () => {
        return !this.state.products
            ? null
            : this.state.products
                .map((p, index) => <BasketProduct key={index} productData={p}/>)
    }

    handleDeliveryChange = (event) => {
        this.setState({selectedDelivery: event.target.value}, this.calculateCartCost);
    };

    calculateCartCost = () => {
        let sum = Number(this.state.selectedDelivery);
        this.state.products.forEach(p => sum += p.price);
        this.setState({cartSum: sum});

    }

    getSQLDate() {
        const pad = function (num) {
            return ('00' + num).slice(-2)
        };
        let date;
        date = new Date();
        date = date.getUTCFullYear() + '-' +
            pad(date.getUTCMonth() + 1) + '-' +
            pad(date.getUTCDate());
        return date;
    }

    removeBasket = idBaskets => {
        const formData = new URLSearchParams();
        const requestOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        };
        fetch(`http://localhost:9000/api/deletebasket/${idBaskets}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert('Product removed from cart!');
                } else {
                    alert(`Error occurred!`);
                }
            })
            .catch(() => console.log("removing old basket..."));
    }

    addToPurchased = (idUsers, idProducts) => {
        const formData = new URLSearchParams();
        const date = this.getSQLDate();
        formData.append('date', `${date}`);
        formData.append('idUsers', `${idUsers}`);
        formData.append('idProducts', `${idProducts}`);

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        };

        fetch('http://localhost:9000/api/addorder', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    console.log("Products added to purchased");
                } else {
                    alert(`Error occurred!`);
                }
            })
            .catch(() => alert(`Please login again.`));
    }

    addPaynment = (idUsers, value) => {
        const formData = new URLSearchParams();
        formData.append('status', `finished`);
        formData.append('date', `${this.getSQLDate()}`);
        formData.append('idUsers', `${idUsers}`);
        formData.append('value', `${value}`);

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        };
        fetch('http://localhost:9000/api/addpayment', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert("Payment successful!")
                } else {
                    alert(`Error occurred!`);
                }
            })
            .catch(() => alert(`Please login again.`));
    }

    removePurchasedBasket = basketData => {
        basketData.forEach(b => this.removeBasket(b.idBaskets));
    }

    addPurchasedItems = products => {
        products.forEach(p => this.addToPurchased(this.state.user.id, p.idProducts));
    }

    handlePurchase = () => {
        if (!this.state.selectedDelivery) {
            alert("Select delivery type first!");
        } else if (this.state.products.length < 1) {
            alert("No products in basket!");
        } else {
            this.addPaynment(this.state.user.id, this.state.cartSum);
            this.addPurchasedItems(this.state.products);
            this.removePurchasedBasket(this.state.basketData);
        }
    }

    showDeliveries = () => {
        return this.state.deliveries
            ? this.state.deliveries
                .map(d => <option key={d.idDelivery} value={d.price}
                >{d.company} {d.price}$</option>)
            : null
    }

    render() {
        return (
            <div className="basket">
                <h1>Your basket</h1>
                <a href="http://localhost:3000/" className="back">Back</a>
                {this.displayFilteredProducts()}
                <div>
                    <label className="myList">Select delivery</label>
                    <select className="myList" onChange={this.handleDeliveryChange}>
                        <option key={0} value={null}></option>
                        {this.showDeliveries()}
                    </select>
                </div>
                {this.state.cartSum ? <h1>Sum: {this.state.cartSum} zł</h1> : null}
                <button className="buyButton"
                        onClick={this.handlePurchase}
                >Buy products
                </button>
            </div>
        )
    }
}

export default Basket;