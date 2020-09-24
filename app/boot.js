import React, {Component} from 'react';
import Appmain from './App';
import AppSeller from './seller';
import {userlogin} from './store/action/index';
import {connect} from 'react-redux';

class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.disableYellowBox = true;
    console.log(this.props.userdata.userType, '*******');
  }

  render() {
    if (this.props.route == 'DashboardScreen') {
      if (this.props.user == 'buyer') {
        return <Appmain route={this.props.route} />;
      } else {
        return <AppSeller route={this.props.route} />;
      }
    } else {
      if (this.props.userdata.userType == undefined) {
        return <Appmain route={'LoginScreen'} />;
      } 
      else {
        if (this.props.userdata.userType == 'buyer') {
          return <Appmain route={'DashboardScreen'} />;
        } else {
          return <AppSeller route={'DashboardScreen'} />;
        }
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userdata: state.userlogin.userData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleAuth: (value) => dispatch(userlogin(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
