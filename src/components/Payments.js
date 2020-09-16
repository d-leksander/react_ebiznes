import React, {Component} from 'react';
import "../styles/product.css";

class Payments extends Component {
    render() {
        const payments = this.props.payments;
        return (
            <div>
                <h2>Payment summary</h2>
                {payments.map((p, index) => {
                    return <div className="product" key={index}>
                        <div className="productSpecs">
                            <h1 className="price">{p.value} zł</h1>
                        </div>
                            <p className="description">{Date(p.date).toString().substring(4, 15)}</p>
                    </div>
                })}
            </div>
        )
    }
}

export default Payments; 