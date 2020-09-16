import React, {Component} from 'react';
import "../styles/product.css";

class OrderedProducts extends Component {
    render() {
        const ordered = this.props.ordered;
        const products = this.props.products;
        return (
            <div>
                    <h2>The products you bought</h2>
                {products.map((p, index) => {
                    return <div className="product" key={index}>
                        <div className="productSpecs">
                            <h3 className="title">{p.name}</h3>
                            <h1 className="price">{p.price} zł</h1>
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