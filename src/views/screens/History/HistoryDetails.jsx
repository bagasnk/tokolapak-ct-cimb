import React from "react"
import ButtonUI from "../../components/Button/Button"
import Axios from 'axios'
import swal from 'sweetalert';
import { connect } from 'react-redux'
import { Table } from "reactstrap";
import { API_URL } from "../../../constants/API";
import "./HistoryDetails.css"

class HistoryDetails extends React.Component {
    state = {
        transaksiDetails: [],
        status: "",
        transactionId: "",
        listDetail: [],
        activeProducts: [],
    }

    getDataTransaksi = () => {
        Axios.get(`${API_URL}/transactions`, {
            params: {
                userId: this.props.user.id,
                _embed: "transcations_details",
                // coba console log, liat hasilnya ini

            },
        })
            .then((res) => {
                console.log(res.data)
                // ini kenapa dimap?
                    this.setState({
                        listDetail: res.data,
                    })
                    console.log(res.data)
            })

            .catch((err) => {
                console.log(err);
            });
    }

    componentDidMount() {
        { this.getDataTransaksi() }
    }

    renderDataTransaksi = () => {
        const { listDetail } = this.state
        return listDetail.map((val, idx) => {
            return (
                <>
                    <tr>
                        <td>{val.id}</td>
                        <td><span style={{ fontWeight: "normal" }}>
                                                    {" "}
                                                    {new Intl.NumberFormat("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    }).format(val.totalPrice)}
                                                </span></td>
                        <td>{val.status}</td>
                        <td>
                            <div className="d-flex flex-column align-items-center">
                                <ButtonUI
                                    onClick={() => {
                                        console.log(idx, this.state.activeProducts.includes(idx))
                                        console.log(val)
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
                                    Transaksi Details
                      </ButtonUI>
                            </div>
                        </td>
                    </tr>
                    {val.transcations_details.map((val,index) => {
                        return (
                            <tr
                                className={`collapse-item ${
                                    this.state.activeProducts.includes(idx) ? "active" : null
                                    }`}
                            >
                                <td className="" colSpan={3}>
                                    <div className="d-flex justify-content-around align-items-center">
                                        <div className="d-flex flex-column ml-4 justify-content-center">
                                            <h6>No : <span style={{ fontWeight: "normal" }}> {index  + 1}</span> </h6>
                                            <h6>Product Id : <span style={{ fontWeight: "normal" }}>{val.productId}</span> </h6>
                                            <h6>Price : <span style={{ fontWeight: "normal" }}>
                                                    {" "}
                                                    {new Intl.NumberFormat("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    }).format(val.price)}
                                                </span> </h6>
                                            <h6>Quantity : <span style={{ fontWeight: "normal" }}> {val.quantity}</span> </h6>
                                            <h6>
                                                Total Price:
                                            <span style={{ fontWeight: "normal" }}>
                                                    {" "}
                                                    {new Intl.NumberFormat("id-ID", {
                                                        style: "currency",
                                                        currency: "IDR",
                                                    }).format(val.totalPrice)}
                                                </span>
                                            </h6>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                    )}
                </>
            )
        })

    }

    render() {
        return (
            <div className="container">
                <div className="d-flex justify-content-center flex-row align-items-center my-3">
                </div>
                <caption>
                    <h4>History</h4>
                </caption>
                <Table className="mt-4 text-center">
                    <thead>
                        <tr>
                            <th>Id Transaksi</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderDataTransaksi()}
                    </tbody>
                </Table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(HistoryDetails);