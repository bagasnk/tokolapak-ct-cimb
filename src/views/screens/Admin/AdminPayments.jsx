import React from "react"
import ButtonUI from "../../components/Button/Button"
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import swal from 'sweetalert';
import "./AdminPayments.css"

class AdminPayments extends React.Component {
    state = {
        productList: [],
        datePayments: new Date(),
        activeProducts: [],
        modalOpen: false,
    }

    getPaymentsList = (val) => {
        Axios.get(`${API_URL}/transactions`, {
            params: {
                status: val,
            }
        })
            .then((res) => {
                this.setState({ productList: res.data });
                
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount() {
        { this.getPaymentsList() }
    }

    confirmBtnHandler = (id) => {
        Axios.patch(`${API_URL}/transactions/${id}`, {
            status: "Done",
            dateTransactionsDone: this.state.datePayments.toLocaleDateString(),
        })
            .then((res) => {
                this.getPaymentsList()
                swal("Success!", "Berhasil", "success");

            })
            .catch((err) => {
                console.log(err)
            })
    }

    renderProductList = () => {
        return this.state.productList.map((val, idx) => {
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
                        <td> {idx + 1} </td>
                        <td> {val.username} </td>
                        <td> {val.status}</td>
                        <td> {val.dateTransactions}</td>
                        <td> {val.dateTransactionsDone}</td>
                    </tr>
                    <tr
                        className={`collapse-item ${
                            this.state.activeProducts.includes(idx) ? "active" : null
                            }`}
                    >
                        <td className="" colSpan={3}>
                            <div className="d-flex justify-content-around align-items-center">
                                    <div className="d-flex flex-column ml-4 justify-content-center">
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
                                <div className="d-flex flex-column align-items-center">
                                    <ButtonUI
                                        onClick={(_) => this.confirmBtnHandler(val.id)}
                                        type="contained"
                                    >
                                        Confirm
                      </ButtonUI>
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
                <div className="dashboard">
                    <caption className="p-3">
                        <h2>Products</h2>
                    </caption>
                    <div className="d-flex justify-content-center align-items-center">
                    <ButtonUI
                                        onClick={(_) => this.getPaymentsList("pending")}
                                        type="contained"
                                    >
                                        Pending
                      </ButtonUI>
                      <ButtonUI
                                        onClick={(_) => this.getPaymentsList("Done")}
                                        type="contained"
                                    >
                                        Done
                      </ButtonUI>
                      </div>
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Id </th>
                                <th>Status</th>
                                <th>Date Transaksi</th>
                                <th>Date Transaksi Done</th>
                            </tr>
                        </thead>
                        <tbody>{this.renderProductList()}</tbody>
                    </table>
                   
                </div>

            </div>
        );
    }


}

export default AdminPayments;

