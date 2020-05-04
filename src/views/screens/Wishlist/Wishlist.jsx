import React from 'react';
import { connect } from 'react-redux'
import './Wishlist.css'
import Axios from 'axios'
import { API_URL } from "../../../constants/API"
import { Table, Alert } from 'reactstrap'
import ButtonUI from "../../components/Button/Button"
import swal from 'sweetalert';
import { Link } from "react-router-dom";

class Wishlist extends React.Component {
    state = {
        itemWishList: [],
        activeProducts: [],
    }


    componentDidMount() {
        { this.getItemWishList() }
    }
    getItemWishList = () => {
        Axios.get(`${API_URL}/wishlist`, {
            params: {
                userId: this.props.user.id,
                _expand: "product",
            }
        })
            .then((res) => {
                this.setState({ itemWishList: res.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }


    deleteItemWishList = (id) => {
        Axios.delete(`${API_URL}/wishlist/${id}`)
            .then((res) => {
                console.log(res);
                swal('Success!!', 'Your item has been deleted from your wishlist', 'success')
                this.getItemWishList();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    renderWishlist = () => {
        return this.state.itemWishList.map((val, idx) => {
            const { product, id, productId } = val;
            const { productName, image, price } = product;
            return (
                <>
                    <tr
                        onClick={() => {
                            if (this.state.activeProducts.includes(idx)) {
                                this.setState({
                                    activeProducts: [
                                        ...this.state.activeProducts.filter((item) => item !== idx),
                                    ],
                                });
                            } else {
                                this.setState({
                                    activeProducts: [...this.state.activeProducts, idx],
                                });
                            }
                        }}
                    >
                        <td>{idx + 1}</td>
                        <td>{productName}</td>
                        <td>
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                            }).format(price)}
                        </td>
                    </tr>

                    <tr
                        className={`collapse-item ${
                            this.state.activeProducts.includes(idx) ? "active" : null
                            }`}
                    >

                        <td className="" colSpan={3}>
                            <div className="d-flex justify-content-around align-items-center">
                                <div className="d-flex">
                                    <img src={image} alt="" />
                                    <div className="d-flex flex-column ml-4 justify-content-center">
                                        <h5>{productName}</h5>
                                        <h6>
                                            Price:
                                                <span style={{ fontWeight: "normal" }}>
                                                {" "}
                                                {new Intl.NumberFormat("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                }).format(price)}
                                            </span>
                                        </h6>
                                    </div>
                                </div>
                                <div className="d-flex flex-column align-items-center">
                                    <ButtonUI >
                                        <Link style={{ color: "inherit", textDecoration: "none" }} to={`/products/${productId}`}>
                                            Buy
                                         </Link>
                                    </ButtonUI>
                                    <ButtonUI className="mt-3" onClick={(_) => this.deleteItemWishList(id)}
                                        type="textual">
                                        Delete
                                    </ButtonUI>
                                </div>
                            </div>
                        </td>
                    </tr>
                </>
            );
        });
    };

    render() {
        return (
            <div className="container py-4">
                {this.state.itemWishList.length != 0 ? (
                    <Table hover size="sm">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Product Name</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>{this.renderWishlist()}</tbody>
                    </Table>
                ) : (
                        <Alert>
                            Your Wishlist is empty! <Link to="/">Go shopping</Link>
                        </Alert>
                    )}
            </div>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

export default connect(mapStateToProps)(Wishlist);