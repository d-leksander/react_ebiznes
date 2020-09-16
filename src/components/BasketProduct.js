import React, {Component} from 'react';
import "../styles/product.css";
import {refreshPage} from "../helpers/reload"
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart';

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
            <div className="favOutherView">
                <div className="favInnerView">
                    <div className="productSpecs">
                    <h3 className="title">{productData.name}</h3>
                    <h1 className="price">{productData.price} zł</h1>
                </div>
                    <p className="description">{productData.description}</p>
                </div>

                <div className="basketOperation">
                    <button className="deleteFromCartButton" onClick={() => {
                    this.deleteFromCart(productData.idBaskets)
                    refreshPage();
                }}
                ><RemoveShoppingCartIcon fontSize="small" style={{color: "lightblue"[50]}}/> Remove item
                </button>
                </div>

            </div>
        )
    }
}

export default BasketProduct;