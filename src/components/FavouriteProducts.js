import React, {Component} from 'react';
import "../styles/product.css";
import {refreshPage} from "../helpers/reload"
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';

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
                <h2>Your favourite products</h2>
                {favourites.map(f => {
                    return <div className="favOutherView">
                        <div className="favInnerView" key={f.idProducts}>
                        <h2 className="title">{f.name}</h2>
                        <p className="description">{f.description}</p>
                    </div>
                        <div className="favOperation">
                            <button className="deleteFromCartButton" onClick={() => {
                                this.deleteFromFavourites(f.idFavourites)
                                refreshPage();
                            }}
                            ><RemoveCircleOutlineIcon fontSize="small" style={{color: "lightblue"[50]}}/> Remove
                            </button>
                        </div>
                    </div>
                })}
            </div>
        )
    }
}

export default FavouriteProducts;