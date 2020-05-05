import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import Cookie from 'universal-cookie';
import { connect } from 'react-redux'
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

import Home from "./views/screens/Home/Home";
import Navbar from "./views/components/Navbar/Navbar";
import AuthScreen from "./views/screens/Auth/AuthScreen";
import ProductDetails from "./views/screens/ProductDetails/ProductDetails";
import Wishlist from "./views/screens/Wishlist/Wishlist"
import HistoryDetails from "./views/screens/History/HistoryDetails"
import Cart from "./views/screens/Cart/Cart"
import PageNotFound from "./views/screens/Pagenotfound/PageNotFound"
import { userKeepLogin,cookieChecker } from './redux/actions';
import AdminDashboard from "./views/screens/Admin/AdminDashboard";
import AdminMember from "./views/screens/Admin/AdminMember";
import AdminPayments from "./views/screens/Admin/AdminPayments";
import AdminReport from "./views/screens/Admin/AdminReport"


const cookiesObject = new Cookie();

class App extends React.Component {
  componentDidMount() {
    let cookiesResult = cookiesObject.get("authData")
    console.log(cookiesResult)
    if (cookiesResult) {
      this.props.userKeepLogin(cookiesResult)
    } else {
    this.props.cookieChecker();
    }
  }

  renderAdminRoutes = () => {
    if(this.props.user.role === 'admin'){
      return (
        <Switch>
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route exact path="/admin/member" component={AdminMember} />
        <Route exact path="/admin/payment" component={AdminPayments} />
        <Route exact path="/admin/report" component={AdminReport}/>
        </Switch>
      )
    }else{
      return (
      <Switch>
      <Route exact path="/*" component={PageNotFound} />
      </Switch>
      )
    } 
  }
  
  render() {
    if (this.props.user.cookieChecked) {
      return (
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth" component={AuthScreen} />
            <Route exact path="/products/:productId" component={ProductDetails} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/wishlist" component={Wishlist} />
            <Route exact path="/history" component={HistoryDetails} />
            {this.renderAdminRoutes()}
          </Switch>
          <div style={{ height: "120px" }} />
        </>
      );
    } else {
      return <div>Loading....</div>
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  userKeepLogin,
  cookieChecker,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));

