import React, { Component } from 'react';
import { Container } from 'native-base';
import { base_url, tap_success_url, tap_failed_url } from '../config/Constants';

import { connect } from 'react-redux';
import { tapStatus } from '../actions/PaymentActions';
import { WebView } from 'react-native-webview';

class Tap extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      url:
        'http://qatrt-nada.demo.asol-tec.com/' +
        'tap_charge/' +
        global.id +
        '/' +
        this.props.route.params.amount +
        '/' +
        global.lang,
    };
  }


  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  _onNavigationStateChange = async value => {
    if (value.url == tap_failed_url) {
      await this.props.tapStatus(0);
      await this.payment();
    } else if (value.url == tap_success_url) {
      await this.props.tapStatus(1);
      await this.payment();
    }
  };

  payment = () => {
    this.props.navigation.navigate('Payment');
  };

  render() {
    console.log(this.state.url, ">>>>>>>>>")
    return (
      <Container>
        <WebView
          source={{ uri: this.state.url }}
          style={{ marginTop: 20 }}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
        />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    tap_status: state.payment.tap_status,
  };
}

const mapDispatchToProps = dispatch => ({
  tapStatus: data => dispatch(tapStatus(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tap);
