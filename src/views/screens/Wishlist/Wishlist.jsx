import React from 'react';
import { connect } from 'react-redux'
import './Cart.css'
import Axios from 'axios'
import { API_URL } from "../../../constants/API"
import { Table, Alert } from 'reactstrap'
import ButtonUI from "../../components/Button/Button"
import swal from 'sweetalert';
import { Link } from "react-router-dom";
import { UncontrolledCollapse, Button, CardBody, Card, Badge } from 'reactstrap';

class Wishlist extends React.Component {
    state = {
        itemCart: [],
        kondisiCheckout: true,
        totalPrice: 0,
        status: "pending",
        checOutItem: "",
        quantity: "",
        productId: "",
    }
}

addToWishlistHandler = () => {
    Axios.get(`${API_URL}/wishlist`, {
        params: {
            productId: this.state.productData.id,
            userId: this.props.user.id,
        }
    })
        .then((res) => {
            if (res.data.length !== 0) {
                Axios.patch(`${API_URL}/wishlist/${res.data[0].id}`, {
                    quantity: res.data[0].quantity + 1
                })
                    .then((res) => {
                        console.log(res.data)
                        swal("Add to carts", "Your item has been added to your cart", "success");
                    })
            } else {
                Axios.post(`${API_URL}/wishlist`, {
                    userId: this.props.user.id,
                    productId: this.state.productData.id,
                    quantity: 1,
                })
                    .then((res) => {
                        console.log(res);
                        swal("Add to carts", "Your item has been added to your cart", "success");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        })
};

getItemCart = () => {
    let totalPriceItems = 0
    Axios.get(`${API_URL}/carts`, {
        params: {
            userId: this.props.user.id,
            _expand: "product",
        }
    })
        .then((res) => {
            res.data.map((val) => {
                totalPriceItems += val.quantity * val.product.price
            })
            this.setState({ itemCart: res.data, totalPrice: totalPriceItems })

        })
        .catch((err) => {
            console.log(err)
        })
}


deleteItemWishList = (id) => {
    Axios.delete(`${API_URL}/wishlist/${id}`)
        .then((res) => {
            console.log(res);
            swal('Delete to wishlist', 'Your item has been deleted from your wishlist', 'success')
            this.getItemCart();
        })
        .catch((err) => {
            console.log(err);
        });
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(Wishlist);