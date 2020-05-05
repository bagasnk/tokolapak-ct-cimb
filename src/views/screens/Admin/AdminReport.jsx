import React from "react"
import ButtonUI from "../../components/Button/Button"
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import swal from 'sweetalert';
import "./AdminReport.css"

class AdminReport extends React.Component {
    state = {
        userDataList: [],
        usernameList: [],
        totalPriceUser: [],
    }

    getReportList = () => {
        Axios.get(`${API_URL}/users`)
            .then((res) => {
                this.setState({ userDataList: res.data })
                this.state.userDataList.map((val) => {
                    this.setState({
                        usernameList: [ ...this.state.usernameList, val.username]
                    })
                    Axios.get(`${API_URL}/transactions`, {
                        params: {
                            userId: val.id,
                            _embed: "transcations_details",
                            status: "Done"
                        }
                    })
                        .then(res => {
                            let priceTotal = 0
                            res.data.map((val) => {
                                priceTotal += val.totalPrice
                            })
                            this.setState({
                                totalPriceUser:[ ...this.state.totalPriceUser, priceTotal]
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                        })

                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    

    componentDidMount() {
        this.getReportList()
    }

    renderReports = () => {
        return this.state.totalPriceUser.map((val,idx) => {
            return (
            <tr>
                <td>{idx + 1}</td>
                <td>{this.state.usernameList[idx]}</td>
                <td><span style={{ fontWeight: "normal" }}>
                                                {" "}
                                                {new Intl.NumberFormat("id-ID", {
                                                    style: "currency",
                                                    currency: "IDR",
                                                }).format(val)}
                                            </span></td>
            </tr>
            )
        })
    }



    render() {
        return (
            <div className="container py-4 d-flex flex-column ">
                <div className="dashboard">
                    <caption className="p-3">
                        <h2>Reports</h2>
                    </caption>
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <td>No. </td>
                                <td>Username</td>
                                <td>Total Belanja</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderReports()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default AdminReport

