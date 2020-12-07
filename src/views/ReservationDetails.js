import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  Title,
  Button,
  Icon,
  Row,
  Col,
  List,
  ListItem,
} from 'native-base';
import * as colors from '../assets/css/Colors';
import ProgressCircle from 'react-native-progress-circle-rtl';
import { Divider } from 'react-native-elements';
// import Moment from 'moment';
import { washing_machine } from '../config/Constants';
import strings from '../languages/strings.js';
import Moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize';
import { formatTimeByOffset } from '../helpers/formatTimeByOffset';
import Arrow from 'react-native-vector-icons/Foundation';


export default class ReservationDetails extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      data: this.props.route.params.data,
      status: this.props.route.params.status,
      timeToDisplay: ''
    };
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  };

  componentWillMount() {
    const backEndTimeStamp = this.state.data.created_at;

    // get device timezone eg. -> "Asia/Shanghai"
    const deviceTimeZone = RNLocalize.getTimeZone();

    // Make moment of right now, using the device timezone
    const today = Moment().tz(deviceTimeZone);

    // Get the UTC offset in hours
    const currentTimeZoneOffsetInHours = today.utcOffset() / 60;

    // Run the function as we coded above.
    const convertedToLocalTime = formatTimeByOffset(
      backEndTimeStamp,
      currentTimeZoneOffsetInHours,
    );

    // Set the state or whatever
    this.setState({
      timeToDisplay: convertedToLocalTime
    });
  }

  render() {
    console.log(this.state.data.created_at, ">>>>>>");
    return (
      <Container>
        <Header androidStatusBarColor={colors.theme_bg} style={styles.header}>
          <Left style={{ flex: 1 }}>
            <Arrow
              onPress={this.handleBackButtonClick}
              style={styles.icon}
              name="arrow-right"
              size={25}
            />
          </Left>
          <Body style={styles.header_body}>
            <Title style={styles.title}>{strings.order_details}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Row>
            <Body>
              <Text style={styles.order_id}>
                {strings.order_id} - {this.state.data.id}
              </Text>
              <Text style={styles.created_at}>
                {Moment(this.state.data.created_at).subtract("03:29:00").format('DD MMM-YYYY hh:mm')}
              </Text>
            </Body>
          </Row>
          <Row style={{ margin: 20 }}>
            <Body>
              <ProgressCircle
                percent={this.state.status * 14.285}
                radius={60}
                borderWidth={3}
                color="#6360aa"
                shadowColor="#e6e6e6"
                bgColor="#FFFFFF">
                <View style={{ height: 60, width: 60 }}>
                  <Image
                    style={{ flex: 1, width: undefined, height: undefined }}
                    source={washing_machine}
                  />
                </View>
              </ProgressCircle>
              <Text style={styles.status}>{this.state.data.label_name}</Text>
            </Body>
          </Row>
          <Divider style={styles.order_divider} />
          {/* <Row style={styles.row}>
            <Left>
              <Text style={styles.address_label}>
                {strings.door_no_landmark}
              </Text>
              <Text style={styles.address}>{this.state.data.door_no}</Text>
            </Left>
          </Row> */}
          <Row style={styles.row}>
            <Left>
              <Text style={styles.address_label}>
                {strings.delivery_address}
              </Text>
              <Text style={styles.address}>{this.state.data.address}</Text>
            </Left>
          </Row>
          <Row style={styles.row}>
            <Left>
              <Text style={styles.delivery_date_label}>
                {strings.delivery_date}
              </Text>
              <Text style={styles.delivery_date}>
                {Moment(this.state.data.expected_delivery_date).format(
                  'DD MMM-YYYY',
                )}
              </Text>
            </Left>
            <Right>
              <Text style={styles.delivery_date}>
                {this.state.data.payment_mode}
              </Text>
            </Right>
          </Row>
          <View style={{ marginTop: 10 }} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
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
    alignSelf: 'center',
    color: colors.theme_fg_two,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  order_id: {
    marginTop: 10,
    fontSize: 15,
    color: colors.theme_fg_two,
    fontWeight: 'bold',
  },
  created_at: {
    marginTop: 5,
    fontSize: 12,
  },
  status: {
    marginTop: 10,
    fontSize: 13,
    color: colors.theme_fg,
    fontWeight: 'bold',
  },
  order_divider: {
    backgroundColor: colors.theme_fg_two,
    width: '90%',
    alignSelf: 'center',
  },
  row: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  address_label: {
    marginTop: 10,
    fontSize: 13,
    color: colors.theme_fg_two,
    fontWeight: 'bold',
  },
  address: {
    marginTop: 5,
    fontSize: 13,
  },
  delivery_date_label: {
    marginTop: 10,
    fontSize: 13,
    color: colors.theme_fg_two,
    fontWeight: 'bold',
  },
  delivery_date: {
    marginTop: 5,
    fontSize: 13,
  },
  your_cloths: {
    marginTop: 10,
    fontSize: 13,
    color: colors.theme_fg_two,
    fontWeight: 'bold',
  },
  qty: {
    fontSize: 15,
    color: colors.theme_fg,
    fontWeight: 'bold',
  },
  total_label: {
    fontWeight: 'bold',
    color: colors.theme_fg_two,
  },
  total: {
    fontWeight: 'bold',
    color: colors.theme_fg_two,
  },
});
