import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  Keyboard,
} from 'react-native';
import { Button, Icon, Input } from 'react-native-elements';
import {
  Container,
  Content,
  Card,
  CardItem,
  Row,
  Col,
  Body,
  Footer,
} from 'native-base';
import Snackbar from 'react-native-snackbar';
import {
  api_url,
  login,
  height_40,
  height_30,
  height_15,
  login_image,
  check_phone,
  base_url,
} from '../config/Constants';
import { StatusBar, Loader } from '../components/GeneralComponents';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  serviceActionPending,
  serviceActionError,
  serviceActionSuccess,
} from '../actions/LoginActions';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import * as colors from '../assets/css/Colors';
import strings from '../languages/strings.js';

class Phone extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      phone: '',
      isLoding: false,
    };
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  login = async () => {
    Keyboard.dismiss();
    if (this.state.phone != '') {
      this.setState({ isLoding: true });
      await axios({
        method: 'post',
        url: base_url + check_phone,
        data: { phone_number: this.state.phone },
      })
        .then(async response => {
          this.setState({ isLoding: false });
          if (response.data.status == 1) {
            this.props.navigation.navigate('Login', {
              phone_number: this.state.phone,
            });
          } else if (response.data.status == 0) {
            this.props.navigation.navigate('PhoneVerification', {
              phone_number: this.state.phone,
              otp: response.data.message,
            });
          }
        })
        .catch(error => {
          alert(error);
          this.setState({ isLoding: false });
          //alert(strings.sorry_something_went_wrong);
        });
    }
  };

  showSnackbar(msg) {
    Snackbar.show({
      title: msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  render() {
    const { isLoding, error, data, message, status } = this.props;

    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          <View>
            <StatusBar />
          </View>
          <Loader visible={this.state.isLoding} />
          <View style={styles.header_section}>
            <View style={styles.logo_content}>
              <Image style={styles.logo} source={login_image} />
            </View>
          </View>
          <View style={styles.bottom_section}>
            <Card style={{ marginLeft: 15, marginRight: 15, borderRadius: 20 }}>
              <CardItem bordered style={{ borderRadius: 20 }}>
                <View style={styles.body_section}>
                  <Text style={styles.register_name}>
                    {strings.enter_your_phone_number}
                  </Text>
                  <View style={styles.input}>
                    <Input
                      inputStyle={{ fontSize: 13 }}
                      placeholder="530XXXXXX"
                      keyboardType="phone-pad"
                      onChangeText={TextInputValue =>
                        this.setState({ phone: TextInputValue })
                      }
                      leftIcon={
                        <Icon name="call" size={20} color={colors.theme_bg} />
                      }
                    />
                  </View>
                  <View style={{ margin: 10 }} />
                  <View style={styles.footer_section}>
                    <View
                      style={{
                        height: 40,
                        width: '93%',
                        marginTop: 10,
                        marginBottom: 10,
                      }}>
                      <Button
                        title={strings.next}
                        onPress={this.login}
                        buttonStyle={{ backgroundColor: colors.theme_bg }}
                      />
                    </View>
                  </View>
                </View>
              </CardItem>
            </Card>
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoding: state.login.isLoding,
    error: state.login.error,
    data: state.login.data,
    message: state.login.message,
    status: state.login.status,
  };
}

const mapDispatchToProps = dispatch => ({
  serviceActionPending: () => dispatch(serviceActionPending()),
  serviceActionError: error => dispatch(serviceActionError(error)),
  serviceActionSuccess: data => dispatch(serviceActionSuccess(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Phone);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_section: {
    width: '100%',
    height: height_40,
    backgroundColor: '#F7F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo_content: {
    height: 180,
    width: 330,
  },
  logo: {
    flex: 1,
    width: undefined,
    height: undefined,
    borderRadius: 10,
  },
  register_name: {
    color: colors.theme_fg,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  body_section: {
    width: '100%',
    backgroundColor: colors.theme_bg_three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 30,
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
  input_text: {
    borderColor: colors.theme_bg,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  footer_section: {
    width: '100%',
    alignItems: 'center',
  },
  login_content: {
    width: '100%',
    margin: 5,
    alignItems: 'center',
  },
  login_string: {
    color: colors.theme_fg,
  },
  btn_style: {
    backgroundColor: colors.theme_bg,
  },
  bottom_section: {
    left: 0,
    top: -40,
  },
  email: {
    borderColor: colors.theme_bg,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    height: 40,
  },
  forgot_password_container: {
    width: '95%',
    alignItems: 'flex-end',
  },
  signup_container: {
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
