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
        listTransaksi: [],
        status: "",
        transactionId: "",
        listDetail: [],
    }

    getDataTransaksi = () => {
        Axios.get(`${API_URL}/transcations_details`, {
            params: {
                userId: this.props.user.id,
                _expand: "transactions",
            },
        })
            .then((res) => {
                res.data.map((val) => {
                    this.setState({
                        status: val.transaction.status,
                    })
                })

                this.setState({
                    listTransaksi: res.data,
                })
            })

            .catch((err) => {
                console.log(err);
            });
    }

    componentDidMount() {
        { this.getDataTransaksi() }
    }

    renderDataTransaksi = () => {
        const { listTransaksi } = this.state
        return listTransaksi.map((val, idx) => {
            return (
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>

            )
        })
    }




}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

export default connect(mapStateToProps)(HistoryDetails);