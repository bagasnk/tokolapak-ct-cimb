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


class Cart extends React.Component {
    state = {
        itemCart: [],
        kondisiCheckout: true,
        totalPrice: 0,
        status: "pending",
        checOutItem: "",
        quantity: "",
        productId: "",
        datePayments: new Date(),
    }


    componentDidMount() {
        this.getItemCart();
    }

    checkboxHandler = (e, idx) => {
        const { checked } = e.target
        if (checked) {
            this.setState({ checOutItem: [...this.state.checOutItem, idx] })
        } else {
            this.setState({
                checOutItem: [
                    ...this.state.checOutItem.filter(val => val !== idx)
                ]
            })
        }
    }

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


    deleteItemCart = (id) => {
        Axios.delete(`${API_URL}/carts/${id}`)
            .then((res) => {
                console.log(res);
                swal('Delete to cart', 'Your item has been deleted from your cart', 'success')
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
                <tr>
                    <td>{idx + 1}</td>
                    <td>{val.product.productName}</td>
                    <td>{
                        new Intl.NumberFormat("id-ID",
                            { style: "currency", currency: "IDR" }).format(val.product.price)
                    }
                    </td>
                    <td>{val.quantity}</td>
                    <td>{val.product.category}</td>
                    <td><img src={val.product.image} alt="" style={{ height: "50px" }} /></td>
                    <td>
                        <input
                            type="checkbox"
                            onChange={(e) => this.checkboxHandler(e, idx)}
                            className="form-control" />
                    </td>
                    <th scope="row">
                        <div className="d-flex justify-content-center">
                            <ButtonUI
                                type="contained"
                                onClick={() => this.deleteItemCart(val.id)}>
                                Delete
                        </ButtonUI>
                        </div>
                    </th>
                </tr>
            )
        })
    }

    renderCheckout = () => {
        let totalPriceItems = 0
        const { itemCart } = this.state;
        return itemCart.map((val, idx) => {
            totalPriceItems = val.quantity * val.product.price
            return (
                <>
                    <tr>
                        <td>{idx + 1}</td>
                        <td>{val.product.productName}</td>
                        <td>{val.quantity}</td>
                        <td>{val.product.category}</td>
                        <td>{
                            new Intl.NumberFormat("id-ID",
                                { style: "currency", currency: "IDR" }).format(totalPriceItems)
                        }
                        </td>
                    </tr>
                </>
            )
        })
    }

    confirmBtn = () => {
        Axios.get(`${API_URL}/carts`, {
            params: {
                userId: this.props.user.id,
                _expand: "product"
            }
        })
            .then((res) => {
                res.data.map(val => {
                    Axios.delete(`${API_URL}/carts/${val.id}`)
                        .then((res) => {
                            console.log(res);
                            swal('Success!!', 'Transaksi anda berhasil', 'success')
                            this.getItemCart();
                        })
                        .catch((err) => {
                            console.log(err);
                        });

                })
                Axios.post(`${API_URL}/transactions`, {
                    userId: this.props.user.id,
                    totalPrice: this.state.totalPrice,
                    status: "pending",
                    dateTransactions: this.state.datePayments.toLocaleDateString(),
                })
                    .then(res => {
                        this.state.itemCart.map(val => {
                            Axios.post(`${API_URL}/transcations_details`, {
                                productId: val.product.id,
                                transactionsId: res.data.id,
                                price: val.product.price,
                                totalPrice: val.product.price * val.quantity,
                                quantity: val.quantity
                            })
                                .then((res) => {
                                    console.log(res)
                                })
                                .then((err) => {
                                    console.log(err)
                                })
                        })
                    })
                    .then((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    

    render() {
        return (
            <div className="container py-4">
                {this.state.itemCart.length > 0 ? (
                    <>
                        <Table hover size="sm">
                            <thead>
                                <tr>
                                    <th>No.</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Category</th>
                                    <th>Image</th>
                                    <th><div className="d-flex justify-content-center">Action</div></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCarts()}
                            </tbody>
                        </Table>
                        <div>
                            <Button color="primary" id="toggler" style={{ marginBottom: '1rem' }} type="contained">Checkout</Button>
                        </div>
                        {
                            (this.state.kondisiCheckout) ?
                                <div>
                                    <UncontrolledCollapse toggler="#toggler">
                                        <Card style={{ width: "530px" }}>
                                            <CardBody>
                                                <h4><Badge color="secondary">Saudara {this.props.user.username}, dimohon konfirmasi pembayaran</Badge></h4>
                                                <Table striped size="sm" style={{ width: "500px" }}>
                                                    <thead>
                                                        <tr>
                                                            <th>No.</th>
                                                            <th>Product Name</th>
                                                            <th>Quantity</th>
                                                            <th>Category</th>
                                                            <th>Total Price</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.renderCheckout()}
                                                    </tbody>
                                                </Table>
                                                <h6>Total Price : {
                                                    new Intl.NumberFormat("id-ID",
                                                        { style: "currency", currency: "IDR" }).format(this.state.totalPrice)
                                                } </h6>
                                                <div className="d-flex justify-content-center">
                                                    <ButtonUI type="outlined" onClick={() => this.confirmBtn()}>Confirm</ButtonUI>
                                                </div></CardBody>
                                        </Card>
                                    </UncontrolledCollapse>
                                </div> : null
                        }
                    </>
                ) : (
                        <Alert>
                            Your cart is empty! <Link to="/">Go shopping</Link>
                        </Alert>
                    )}

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
