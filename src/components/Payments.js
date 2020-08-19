import React, {Component} from 'react';
import "../styles/product.css";

class Payments extends Component {
    render() {
        const payments = this.props.payments;
        return (
            <div>
                <h1>Payments</h1>
                {payments.map((p, index) => {
                    return <div className="product" key={index}>
                        <div className="productSpecs">
                            <h1 className="price">{p.value}$</h1>
                        </div>
                        <p className="description">{Date(p.date).toString().substring(4, 15)}</p>
                    </div>
                })}
            </div>
        )
    }
}

export default Payments; 