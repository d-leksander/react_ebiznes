import React, {Component} from 'react';
import "../styles/product.css";
import {refreshPage} from "../helpers/reload"

class FavouriteProducts extends Component {
    deleteFromFavourites = (idFavourites) => {
        const formData = new URLSearchParams();

        const requestOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formData.toString()
        };
        fetch(`http://localhost:9000/api/deletefavourite/${idFavourites}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    alert('Product removed from cart!');
                } else {
                    alert(`Error occurred!`);
                }
            })
            .catch(() => alert("Removed from favourites!"));
    }

    render() {
        const favourites = this.props.favourites;
        return (
            <div>
                <h1>Favourite products</h1>
                {favourites.map(f => {
                    return <div className="product" key={f.idProducts}>
                        <h1 className="title">{f.name}</h1>
                        <p className="description">{f.description}</p>
                        <button className="deleteFromCartButton"
                                onClick={() => {
                                    this.deleteFromFavourites(f.idFavourites)
                                    refreshPage();
                                }}
                        >Remove from favourite
                        </button>
                    </div>
                })}
            </div>
        )
    }
}

export default FavouriteProducts;