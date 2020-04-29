import React from 'react'
import { connect } from 'react-redux'
import './Cart.css'
import Axios from 'axios'
import { API_URL } from "../../../constants/API"
import { Table } from 'reactstrap'
import ButtonUI from "../../components/Button/Button"
import swal from 'sweetalert';

class Cart extends React.Component {
    state = {
        itemCart: []

    }

    componentDidMount() {
        this.getItemCart();
    }
        getItemCart = () => {
            Axios.get(`${API_URL}/carts`, {
                params: {
                    userId: this.props.user.id,
                    _expand: "product",
                }
            })
                .then((res) => {
                    console.log(res.data)
                    this.setState({ itemCart: res.data })
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    

    deleteItemCart = (id) => {
        Axios.delete(`${API_URL}/carts/${id}`)
            .then((res) => {
                console.log(res);
                swal('Delete to cart', 'Your item has been deleted from your cart','success')
                this.getItemCart();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    renderCarts = () => {
        const { itemCart } = this.state;
        return itemCart.map((val, idx) => {
            return (
                <tbody>
                    <tr>
                        <th scope="row">{idx + 1}</th>
                        <td>{val.product.productName}</td>
                        <td>{val.product.price}</td>
                        <td>{val.product.category}</td>
                        <td><img src={val.product.image} alt="" style={{ height: "50px" }} /></td>
                        <td><ButtonUI
                            type="contained"
                            onClick={() => this.deleteItemCart(val.id)}
                        >
                            Delete
                    </ButtonUI></td>
                    </tr>
                </tbody>
            )
        })
    }

    render() {
        return (
            <div className="container">
                <div className="text-center"></div>
                <Table hover size="sm">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    {this.renderCarts()}
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(Cart);
