import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  I18nManager,
  TouchableOpacity,
  Image,
  Picker
} from 'react-native';
// import { Picker } from '@react-native-community/picker'
import { StatusBar, Loader } from '../components/GeneralComponents';
import {
  img_url,
  base_url,
  service,
  completed_icon,
  active_icon,
} from '../config/Constants';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  serviceActionPending,
  serviceActionError,
  serviceActionSuccess,
} from '../actions/HomeActions';
import { filterType } from '../actions/MyOrdersActions';
import { productListReset } from '../actions/ProductActions';
import { CommonActions, TabActions } from '@react-navigation/native';
import Slideshow from 'react-native-image-slider-show';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Title,
  Col,
  Card,
  Row,
  Icon,
} from 'native-base';
import strings from '../languages/strings.js';
import RNRestart from 'react-native-restart';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 1,
      dataSource: [],
      language: global.lang,
      active_order: 0,
      completed_order: 0,
    };
  }

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.Service();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  UNSAFE_componentWillMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === this.state.dataSource.length
              ? 0
              : this.state.position + 1,
        });
      }, 3000),
    });
  }

  product = async (id, service_name) => {
    console.log(id, service_name, "<<");
    await this.props.productListReset();
    await this.props.navigation.navigate('Product', {
      id: id,
      service_name: service_name,
    });
  };

  Service = async () => {
    this.props.serviceActionPending();
    await axios({
      method: 'post',
      url: base_url + service,
      data: { customer_id: global.id, lang: global.lang },
    })
      .then(async response => {
        this.setState({
          dataSource: response.data.banner_images,
          active_order: response.data.order.active,
          completed_order: response.data.order.completed,
        });
        await this.props.serviceActionSuccess(response.data);
      })
      .catch(error => {
        console.log(error, 'error');
        this.props.serviceActionError(error);
      });
  };

  async language_change(lang) {
    try {
      await AsyncStorage.setItem('lang', lang);
      await strings.setLanguage(lang);
      if (lang == 'en') {
        await I18nManager.forceRTL(false);
        await RNRestart.Restart();
      } else {
        await I18nManager.forceRTL(true);
        await RNRestart.Restart();
      }
    } catch (e) {
      console.log('error', e);
    }
  }

  my_orders = async type => {
    await this.props.filterType(type);
    this.props.navigation.navigate('MyOrders', { type });
  };

  render() {
    const { isLoding, error, data, message, status } = this.props;
    const service_list = data.map(row => {
      const service_image = img_url + row.image;
      return (
        <Card
          style={{
            marginRight: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.theme_bg_three,
            padding: 10,
          }}>
          <TouchableOpacity
            style={{ alignItems: 'center', justifyContent: 'center' }}
            activeOpacity={1}
            onPress={() => this.product(row.id, row.service_name)}>
            <View style={styles.service_icon}>
              <Image
                style={{ flex: 1, width: undefined, height: undefined }}
                source={{ uri: service_image }}
              />
            </View>
            <Text style={{ color: colors.theme_fg_two, fontWeight: 'bold' }}>
              {row.service_name}
            </Text>
          </TouchableOpacity>
        </Card>
      );
    });

    return (
      <Container>
        <Header androidStatusBarColor={colors.theme_bg} style={styles.header}>
          <Left style={{ flex: 1 }}>
            <Title style={styles.title}>{strings.app_name}</Title>
          </Left>
          <Right>
            <Picker
              selectedValue={this.state.language}
              style={{ height: 50, width: 100, color: colors.theme_fg_two }}
              onValueChange={(itemValue, itemIndex) =>
                this.language_change(itemValue)
              }>
              <Picker.Item label="Ar" value="ar" />
              <Picker.Item label="En" value="en" />
            </Picker>
          </Right>
        </Header>
        <Content>
          {/* <Loader visible={isLoding} /> */}
          <View>
            <Slideshow
              arrowSize={0}
              indicatorSize={0}
              scrollEnabled={true}
              position={this.state.position}
              dataSource={this.state.dataSource}
            />
          </View>
          <View style={{ padding: 20 }}>
            <Text
              style={{
                color: colors.theme_fg_two,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {strings.are_you_looking_for}
            </Text>
            <View style={{ margin: 10 }} />
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {service_list}
            </ScrollView>
          </View>
          <View style={{ padding: 20 }}>
            <Text
              style={{
                color: colors.theme_fg_two,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {strings.your_orders}
            </Text>
            <View style={{ margin: 10 }} />
            <Row>
              <Col>
                <Card
                  style={{
                    marginRight: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.theme_bg_three,
                    padding: 10,
                  }}>
                  <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    activeOpacity={1}
                    onPress={() => this.my_orders(1)}>
                    <View style={styles.orders_icon}>
                      <Image
                        style={{ flex: 1, width: undefined, height: undefined }}
                        source={active_icon}
                      />
                    </View>
                    <View style={{ margin: 5 }} />
                    <Text
                      style={{ color: colors.theme_fg_two, fontWeight: 'bold' }}>
                      {strings.active_orders} ({this.state.active_order})
                    </Text>
                  </TouchableOpacity>
                </Card>
              </Col>
              <Col>
                <Card
                  style={{
                    marginRight: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.theme_bg_three,
                    padding: 10,
                  }}>
                  <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    activeOpacity={1}
                    onPress={() => this.my_orders(2)}>
                    <View style={styles.orders_icon}>
                      <Image
                        style={{ flex: 1, width: undefined, height: undefined }}
                        source={completed_icon}
                      />
                    </View>
                    <View style={{ margin: 5 }} />
                    <Text
                      style={{ color: colors.theme_fg_two, fontWeight: 'bold' }}>
                      {strings.complete_orders} ({this.state.completed_order})
                    </Text>
                  </TouchableOpacity>
                </Card>
              </Col>
            </Row>
          </View>

          <View style={{ padding: 20 }}>
            <Text
              style={{
                color: colors.theme_fg_two,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {strings.your_reservations}
            </Text>
            <View style={{ margin: 10 }} />
            <Row>
              <Col>
                <Card
                  style={{
                    marginRight: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.theme_bg_three,
                    padding: 10,
                  }}>
                  <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    activeOpacity={1}
                    onPress={() =>
                      this.props.navigation.navigate('ActiveReservations')
                    }>
                    <View style={styles.orders_icon}>
                      <Image
                        style={{ flex: 1, width: undefined, height: undefined }}
                        source={active_icon}
                      />
                    </View>
                    <View style={{ margin: 5 }} />
                    <Text
                      style={{ color: colors.theme_fg_two, fontWeight: 'bold' }}>
                      {strings.active_reservations}
                    </Text>
                  </TouchableOpacity>
                </Card>
              </Col>
              <Col>
                <Card
                  style={{
                    marginRight: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.theme_bg_three,
                    padding: 10,
                  }}>
                  <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    activeOpacity={1}
                    onPress={() =>
                      this.props.navigation.navigate('CompletedReservations')
                    }>
                    <View style={styles.orders_icon}>
                      <Image
                        style={{ flex: 1, width: undefined, height: undefined }}
                        source={completed_icon}
                      />
                    </View>
                    <View style={{ margin: 5 }} />
                    <Text
                      style={{ color: colors.theme_fg_two, fontWeight: 'bold' }}>
                      {strings.completed_reservations}
                      {/* {this.state.completed_order}) */}
                    </Text>
                  </TouchableOpacity>
                </Card>
              </Col>
            </Row>
          </View>
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoding: state.home.isLoding,
    error: state.home.error,
    data: state.home.data,
    message: state.home.message,
    status: state.home.status,
  };
}

const mapDispatchToProps = dispatch => ({
  serviceActionPending: () => dispatch(serviceActionPending()),
  serviceActionError: error => dispatch(serviceActionError(error)),
  serviceActionSuccess: data => dispatch(serviceActionSuccess(data)),
  productListReset: () => dispatch(productListReset()),
  filterType: data => dispatch(filterType(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);

const styles = StyleSheet.create({
  service_name: {
    color: colors.theme_bg_three,
    fontSize: 18,
    fontWeight: 'bold',
  },
  service_icon: {
    height: 100,
    width: 100,
  },
  orders_icon: {
    height: 80,
    width: 80,
  },
  language_icon: {
    height: 30,
    width: 30,
  },
  header: {
    backgroundColor: colors.theme_bg_three,
  },
  icon: {
    color: colors.theme_fg_two,
  },
  header_body: {
    flex: 3,
    justifyContent: 'center',
  },
  title: {
    color: colors.theme_fg,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
