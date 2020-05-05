import React from "react"
import ButtonUI from "../../components/Button/Button"
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import swal from 'sweetalert';
import "./AdminReport.css"

class AdminReport extends React.Component{
    state = {  
        userDataList: [],
        usernameList:[],

    }

    // getReportList = () => {
    //     Axios.get(`${API_URL}/users`)
    //     .then((res) => {
    //         this.setState({userDataList : res.data})
    //         userDataList.map((val) => {
    //             this.setState({
    //                 usernameList: [...this.state.usernameList, val.username]
    //             })
    //             Axios.get(`${API_URL}/transactions` , {
    //                 params: {
    //                     userId : val.id,
    //                     _embed : "transcations_details",
    //                     status : "done"
    //                 }
    //             })
    //             .then(res => {

    //             })
    //             .catch((err) => {
    //                 console.log(err)
    //             })
                
    //         })
    //     })
    //     .then((err) => {
    //         console.log(err)
    //     })



    render(){
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
                        <td>aaa</td>
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}

export default AdminReport

