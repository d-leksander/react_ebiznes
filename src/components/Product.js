import React, {Component} from 'react';
import "../styles/product.css";

class Product extends Component {

    addToCart = (idUsers, idProducts) => {
        const formData = new URLSearchParams();
        formData.append('idUsers', `${idUsers}`);
        formData.append('idProducts', `${idProducts}`);

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        };
        fetch('http://localhost:9000/api/addbasket', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert('Product added to cart!');
                } else {
                    alert(`Error occurred!`);
                }
            })
            .catch(() => alert(`Please login again.`));
    }

    addToFavourites = (idUsers, idProducts) => {
        const formData = new URLSearchParams();
        formData.append('idUsers', `${idUsers}`);
        formData.append('idProducts', `${idProducts}`);

        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        };
        fetch('http://localhost:9000/api/addfavourite', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert('Product added to favourites!');
                } else {
                    alert(`Error occurred!`);
                }
            })
            .catch(() => alert(`Please login again.`));
    }

    render() {
        const productData = this.props.productData;
        const user = this.props.user;
        return (
            <div className="prodView">
            <div className="product">
                <div className="productSpecs">
                    <h3 className="title">{productData.name}</h3>
                    <h1 className="price">{productData.price}$</h1>
                </div>
                <p className="description">{productData.description}</p>

            </div>
                <div className="productOperation">
                    <button className="addToCartButton"
                            onClick={() => this.addToCart(user.id, productData.idProducts)}>
                        Add to cart
                    </button>
                    <button className="addToFavouriteButton"
                            onClick={() => this.addToFavourites(user.id, productData.idProducts)}>
                        Favourite
                    </button>
                </div>
            </div>
        )
    }
}

export default Product; 