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
    }


    componentDidMount(){
        {this.getItemWishList()}
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
                swal('Delete to wishlist', 'Your item has been deleted from your wishlist', 'success')
                this.getItemWishList();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    renderWishlist = () => {
        return this.state.itemWishList.map((val, idx) => {
            const { product, id , productId} = val;
            const { productName, image, price } = product;

            return (
                <tr>
                    <td>{idx + 1}</td>
                    <td>{id}</td>
                    <td>{productName}</td>
                    <td>
                        {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).format(price)}
                    </td>

                    <td>
                        {""}
                        <img
                            src={image}
                            alt=""
                            style={{ width: "100px", height: "200px", objectFit: "contain" }}
                        ></img>
                    </td>
                    <td colSpan={2}>
                        <ButtonUI onClick={() => this.deleteItemWishList(id)}>
                            Already Purchased!{" "}
                        </ButtonUI>
                        <ButtonUI
                            className="mt-3"
                            type="textual"
                        >
                            <Link style={{ color: "inherit", textDecoration: "none" }} to={`/products/${productId}`}>
                                BUY NOW!!
                  </Link>
                        </ButtonUI>
                    </td>
                </tr>
            );
        });
    };

    render() {
        return (
            <div className="container">
                <Table striped>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Id</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {this.state.itemWishList.length != 0 ? (
                        <tbody>{this.renderWishlist()}</tbody>
                    ) : (
                            <Alert>
                                Your Wishlist is empty! <Link to="/"></Link>
                            </Alert>
                        )}
                </Table>
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