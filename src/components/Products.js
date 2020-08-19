import React, {Component} from 'react';
import Product from "./Product";
import {getUser} from "../helpers/user"

class Products extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            user: getUser(),
            products: null,
            categories: null,
            loadingProducts: true,
            category: null
        };
    }

    componentDidMount() {
        this.getProducts();
        this.getCategories();
    }

    getProducts() {
        fetch("http://localhost:9000/api/products", {
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
                        loadingProducts: false,
                        products: result
                    });
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    getCategories() {
        fetch("http://localhost:9000/api/categorys", {
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
                        categories: result
                    });
                },
                (error) => {
                    console.log(error)
                }
            )
    }

    handleCategoryChange = (event) => {
        this.setState({category: event.target.value});
    };


    displayFilteredProducts = () => {
        return this.state.loadingProducts
            ? null
            : this.state.products
                .filter(p => (!this.state.category || (Number(p.idCategories) === Number(this.state.category))))
                .map(p => <Product key={p.idProducts} productData={p} user={this.state.user}/>)
    }


    render() {
        return (
            <div>
                <div>
                    <h1>Products</h1>
                    <a href="http://localhost:3000/" className="back">Back</a>
                    <label>Select category </label>
                    <select id="myList" onChange={this.handleCategoryChange}>
                        <option key={0} value={null}></option>
                        {this.state.categories
                            ? this.state.categories.map(c => <option key={c.idCategories} value={c.idCategories}>{c.name}</option>)
                            : null}
                    </select>
                </div>
                {this.displayFilteredProducts()}
            </div>
        )
    }
}

export default Products;
