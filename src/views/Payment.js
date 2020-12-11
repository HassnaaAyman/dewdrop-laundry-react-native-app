import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Image, Alert } from 'react-native';
import { Container, Header, Content, Left, Body, Right, Title, Button as Btn, Icon, Footer, ListItem } from 'native-base';
import { api_url, place_order, payment_list, img_url, stripe_payment, base_url } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import { Button } from 'react-native-elements';
import axios from 'axios';
import { connect } from 'react-redux';
import { orderServicePending, orderServiceError, orderServiceSuccess, paymentListPending, paymentListError, paymentListSuccess, stripePending, stripeError, stripeSuccess } from '../actions/PaymentActions';
import { reset } from '../actions/CartActions';
import { productReset } from '../actions/ProductActions';
import RadioForm from 'react-native-simple-radio-button';
import { CommonActions, TabActions } from '@react-navigation/native';
import stripe from 'tipsi-stripe';
import strings from "../languages/strings.js";

class Payment extends Component {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.select_payment_method = this.select_payment_method.bind(this);
    this.move_orders = this.move_orders.bind(this);
    this.state = {
      payment_mode: 1,
      delivery_cost: 0
    }
    this.get_payments();
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      if (this.props.sub_total < global.min_order) {
        await this.setState({ delivery_cost: global.delivery_cost });
      }
      if (this.props.tap_status == 1) {
        await this.place_order();
      } else if (this.props.tap_status == 0) {
        alert('Sorry something went wrong, please try again');
      }
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  }

  stripe_card = async () => {
    stripe.setOptions({
      publishableKey: global.stripe_key,
      merchantId: 'MERCHANT_ID', // Optional
      androidPayMode: 'test', // Android only
    })

    let options = {
      requiredBillingAddressFields: 'full',
      prefilledInformation: {
        billingAddress: {
          name: global.customer_name,
        },
      },
    }

    const response = await stripe.paymentRequestWithCardForm(options);
    if (response.tokenId) {
      this.stripe_payment(response.tokenId);
    } else {
      alert('Sorry something went wrong');
    }
  }

  stripe_payment = async (token) => {
    this.props.stripePending();
    await axios({
      method: 'post',
      url: base_url + stripe_payment,
      data: { customer_id: global.id, amount: this.props.total, token: token }
    })
      .then(async response => {
        this.place_order(response.data.result);
        await this.props.stripeSuccess(response.data.result);
      })
      .catch(error => {
        alert(JSON.stringify(error));
        this.props.stripeError(error);
      });
  }


  place_order = async () => {
    this.props.orderServicePending();
    await axios({
      method: 'post',
      url: base_url + place_order,
      data: { customer_id: global.id, payment_mode: this.state.payment_mode, address_id: this.props.address, expected_delivery_date: this.props.delivery_date, total: this.props.total, discount: this.props.discount, delivery_cost: this.state.delivery_cost, sub_total: this.props.sub_total, promo_id: this.props.promo_id, items: JSON.stringify(Object.values(this.props.items)) }
    })
      .then(async response => {
        await this.props.orderServiceSuccess(response.data);
        await this.open_success_popup();
      })
      .catch(error => {
        alert(error);
        console.log(error)
        this.props.orderServiceError(error);
      });
  }

  open_success_popup = async () => {
    Alert.alert(
      "Success!!",
      "Your order successfully placed",
      [
        { text: "OK", onPress: () => this.move_orders() }
      ],
      { cancelable: false }
    );
  }

  get_payments = async () => {
    this.props.paymentListPending();
    await axios({
      method: 'post',
      url: base_url + payment_list,
      data: { lang: global.lang }
    })
      .then(async response => {
        await this.props.paymentListSuccess(response.data.result);
      })
      .catch(error => {
        this.props.paymentListError(error);
      });
  }

  async move_orders() {
    await this.props.reset();
    await this.props.productReset();
    this.props.navigation.navigate('MyOrders');
  }

  async tap_payment() {
    this.props.navigation.navigate('Tap', { amount: this.props.total });
  }

  async select_payment_method(payment_mode) {
    await this.setState({ payment_mode: payment_mode });
    if (this.state.payment_mode == 1) {
      this.place_order('cash');
    } else if (this.state.payment_mode == 2) {
      this.stripe_card();
    } else if (this.state.payment_mode == 3) {
      this.tap_payment();
    }
  }

  render() {
    const { isLoding, error, data, message, status, payments } = this.props
    return (
      <Container>
        <Header androidStatusBarColor={colors.theme_bg} style={styles.header} >
          <Left style={{ flex: 1 }} >
            <Btn onPress={this.handleBackButtonClick} transparent>
              <Icon style={styles.icon} name='arrow-back' />
            </Btn>
          </Left>
          <Body style={styles.heading} >
            <Title style={styles.title} >{strings.payment_mode}</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ padding: 20 }} >
          {/*<RadioForm
            radio_props={radio_props}
            initial={0}
            animation={true}
            onPress={this.select_payment_method}
            labelStyle={styles.radio_style}
          />*/}
          <FlatList
            data={payments}
            renderItem={({ item, index }) => (
              <ListItem icon onPress={() => this.select_payment_method(item.id)}>
                <Left>
                  <View style={{ height: 30, width: 30 }} >
                    <Image
                      style={{ flex: 1, width: undefined, height: undefined }}
                      source={{ uri: img_url + item.icon }}
                    />
                  </View>
                </Left>
                <Body>
                  <Text>{item.payment_mode}</Text>
                </Body>
                <Right />
              </ListItem>
            )}
            keyExtractor={item => item.payment_mode}
          />
        </Content>
        <Loader visible={isLoding} />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoding: state.payment.isLoding,
    error: state.payment.error,
    data: state.payment.data,
    message: state.payment.message,
    status: state.payment.status,
    tap_status: state.payment.tap_status,
    payments: state.payment.payments,
    address: state.cart.address,
    delivery_date: state.cart.delivery_date,
    total: state.cart.total_amount,
    sub_total: state.cart.sub_total,
    discount: state.cart.promo_amount,
    promo_id: state.cart.promo_id,
    items: state.product.cart_items
  };
}

const mapDispatchToProps = (dispatch) => ({
  orderServicePending: () => dispatch(orderServicePending()),
  orderServiceError: (error) => dispatch(orderServiceError(error)),
  orderServiceSuccess: (data) => dispatch(orderServiceSuccess(data)),
  paymentListPending: () => dispatch(paymentListPending()),
  paymentListError: (error) => dispatch(paymentListError(error)),
  paymentListSuccess: (data) => dispatch(paymentListSuccess(data)),
  stripePending: () => dispatch(stripePending()),
  stripeError: (error) => dispatch(stripeError(error)),
  stripeSuccess: (data) => dispatch(stripeSuccess(data)),
  reset: () => dispatch(reset()),
  productReset: () => dispatch(productReset())
});


export default connect(mapStateToProps, mapDispatchToProps)(Payment);

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.theme_bg_three
  },
  icon: {
    color: colors.theme_fg_two
  },
  header_body: {
    flex: 3,
    justifyContent: 'center'
  },
  title: {
    alignSelf: 'center',
    color: colors.theme_fg_two,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  radio_style: {
    marginLeft: 20,
    fontSize: 17,
    color: colors.theme_bg,
    fontWeight: 'bold'
  },
  footer: {
    backgroundColor: 'transparent'
  },
  footer_content: {
    width: '90%'
  },
  place_order: {
    backgroundColor: colors.theme_bg
  }
});
