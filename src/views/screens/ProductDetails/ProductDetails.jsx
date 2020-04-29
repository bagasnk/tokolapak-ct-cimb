import React from "react"
import TextField from "../../components/TextField/TextField"
import ButtonUI from "../../components/Button/Button"
import { connect } from 'react-redux'
import Cookie from 'universal-cookie'
import { Redirect } from "react-router-dom";
import Axios from 'axios'
import { API_URL } from '../../../constants/API'
import swal from 'sweetalert';
import "./ProductDetails.css"

class ProductDetails extends React.Component {
   state ={
       productData:{
           image:"",
           productName:"",
           price:0,
           desc:"",
           desc:"",
           category:"",
           id:0,
       },
   }

   addToCartHandler = () => {
       Axios.post(`${API_URL}/cart`, {
           userId: this.props.user.id,
           productId:this.state.productData.id,
           quantity: 1,
       })
       .then(res => {
           console.log(res)
           swal('Add to cart', 'Your item has been added to your cart','success')
       })
       .catch(err => {
           console.log(err)
       })
   }

    componentDidMount(){
        Axios.get(`${API_URL}/products/${this.props.match.params.productId}`)
            .then((res) => {        
                this.setState({productData:res.data})
            })
            .catch((err) => {
                console.log(err)
            })
        }

        render(){
            const {productName,image,price,desc,category,id}=this.state.productData
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-6 text-center">
                            <img
                                style={{width: "100%", objectFit: "contain", height:"500px"}}
                                src={this.state.productData.image}
                                alt=""
                            />
                        </div>
                        <div className="col-6 d-flex flex-column justify-content-center">
                            <h3>{productName}</h3>
                            <h4>
                                {
                                    new Intl.NumberFormat("id-ID", {style: "currency", currency:"IDR"}).format(price)
                                }
                            </h4>
                            <p className="mt-4">{desc}</p>
                            <div className="d-flex mt-4">
                                <ButtonUI onClick={this.addToCartHandler}>Add to Cart</ButtonUI>
                                <ButtonUI className="ml-4" type="outlined">Add to WishList</ButtonUI>
    
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    
    }

const mapStateToProps = state => {
    return{
        user: state.user,
    }
}

export default connect(mapStateToProps)(ProductDetails);
