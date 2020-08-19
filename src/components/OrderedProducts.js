import React, {Component} from 'react';
import "../styles/product.css";

class OrderedProducts extends Component {
    render() {
        const ordered = this.props.ordered;
        const products = this.props.products;
        return (
            <div>
                <h1>Purchased products</h1>
                {products.map((p, index) => {
                    return <div className="product" key={index}>
                        <div className="productSpecs">
                            <h1 className="title">{p.name}</h1>
                            <h3 className="price">{p.price}$</h3>
                        </div>
                        <p className="description">{p.description}</p>
                        <p className="description">{Date(ordered[index].date).toString().substring(4, 15)}</p>
                    </div>
                })}
            </div>
        )
    }
}

export default OrderedProducts; 