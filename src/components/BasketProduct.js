import React, {Component} from 'react';
import "../styles/product.css";
import {refreshPage} from "../helpers/reload"

class BasketProduct extends Component {

    deleteFromCart = (idBaskets) => {
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
            .catch(() => alert("Product removed!"));

    }

    render() {
        const productData = this.props.productData;
        return (
            <div className="product">
                <div className="productSpecs">
                    <h1 className="title">{productData.name}</h1>
                    <h1 className="price">{productData.price}$</h1>
                </div>
                <p className="description">{productData.description}</p>
                <button className="deleteFromCartButton"
                        onClick={() => {
                            this.deleteFromCart(productData.idBaskets)
                            refreshPage();
                        }}
                >Remove item
                </button>
            </div>
        )
    }
}

export default BasketProduct;