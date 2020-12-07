import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Image,
  BackHandler,
  Keyboard,
} from 'react-native';
import { Icon as Icn, Button, Input } from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation';
import { Icon, Card, CardItem, Item, Label } from 'native-base';
import Snackbar from 'react-native-snackbar';
import { api_url, register, height_40, login_image } from '../config/Constants';
import { StatusBar, Loader } from '../components/GeneralComponents';
import * as colors from '../assets/css/Colors';
import axios from 'axios';
import { connect } from 'react-redux';
import {
  serviceActionPending,
  serviceActionError,
  serviceActionSuccess,
} from '../actions/RegisterActions';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import strings from '../languages/strings.js';

class Register extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      customer_name: '',
      phone_number: this.props.route.params.phone_number,
      email: '',
      password: '',
      validation: true,
      fcm_token: global.fcm_token,
    };
  }
  componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    this.props.navigation.navigate('Login');
    return true;
  }

  home = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      }),
    );
  };

  register = async () => {
    Keyboard.dismiss();
    await this.checkValidate();
    if (this.state.validation) {
      this.props.serviceActionPending();
      await axios({
        method: 'post',
        url: api_url + register,
        data: {
          customer_name: this.state.customer_name,
          phone_number: this.state.phone_number,
          password: this.state.password,
          fcm_token: this.state.fcm_token,
        },
      })
        .then(async response => {
          await this.props.serviceActionSuccess(response.data);
          await this.saveData();
        })
        .catch(error => {
          this.props.serviceActionError(error);
        });
    }
  };

  saveData = async () => {
    if (this.props.status == 1) {
      try {
        await AsyncStorage.setItem('user_id', this.props.data.id.toString());
        await AsyncStorage.setItem(
          'customer_name',
          this.props.data.customer_name.toString(),
        );
        global.id = await this.props.data.id;
        global.customer_name = await this.props.data.customer_name;
        await this.home();
      } catch (e) { }
    } else {
      alert(this.props.message);
    }
  };

  checkValidate() {
    if (
      this.state.phone_number == '' ||
      this.state.password == '' ||
      this.state.customer_name == ''
    ) {
      this.state.validation = false;
      this.showSnackbar(strings.please_fill_all_the_fields);
      return true;
    } else {
      this.state.validation = true;
      return true;
    }
  }

  showSnackbar(msg) {
    Snackbar.show({
      text: msg,
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
          <Loader visible={isLoding} />
          <View style={styles.header_section}>
            <View style={styles.logo_content}>
              <Image style={styles.logo} source={login_image} />
            </View>
          </View>
          <View style={styles.bottom_section}>
            <Card style={{ marginLeft: 15, marginRight: 15, borderRadius: 20 }}>
              <CardItem bordered style={{ borderRadius: 20 }}>
                <View style={styles.body_section}>
                  <Text style={styles.register_name}>{strings.register}</Text>
                  <View style={styles.input}>
                    <Input
                      inputStyle={{
                        fontSize: 13,
                      }}
                      placeholder={strings.username}
                      onChangeText={TextInputValue =>
                        this.setState({ customer_name: TextInputValue })
                      }
                      leftIcon={
                        <Icn name="person" size={22} color={colors.theme_bg} />
                      }
                    />
                  </View>

                  <View style={styles.input}>
                    <Input
                      inputStyle={{
                        fontSize: 13,
                      }}
                      placeholder={strings.phone}
                      // editable={false}
                      selectTextOnFocus={false}
                      value={this.state.phone_number}
                      keyboardType="phone-pad"
                      onChangeText={TextInputValue =>
                        this.setState({ phone_number: TextInputValue })
                      }
                      leftIcon={
                        <Icn name="call" size={22} color={colors.theme_bg} />
                      }
                    />
                  </View>
                  <View style={styles.input}>
                    <Input
                      inputStyle={{
                        fontSize: 13,
                      }}
                      placeholder={strings.password}
                      secureTextEntry={true}
                      onChangeText={TextInputValue =>
                        this.setState({ password: TextInputValue })
                      }
                      leftIcon={
                        <Icn name="lock" size={20} color={colors.theme_bg} />
                      }
                    />
                  </View>
                  <View style={{ margin: 10 }} />
                  <View style={styles.footer_section}>
                    <View
                      style={{
                        height: 40,
                        width: '100%',
                        marginTop: 10,
                        marginBottom: 10,
                      }}>
                      <Button
                        title={strings.register}
                        onPress={this.register}
                        buttonStyle={styles.btn_style}
                      />
                    </View>
                  </View>
                </View>
              </CardItem>
            </Card>
          </View>
          <View style={styles.login_container}>
            <Text
              style={{ color: colors.theme_fg, fontSize: 16 }}
              onPress={this.handleBackButtonClick}>
              {strings.already_i_have_an_account}
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoding: state.register.isLoding,
    error: state.register.error,
    data: state.register.data,
    message: state.register.message,
    status: state.register.status,
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
)(Register);

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
  back_content: {
    width: '100%',
    backgroundColor: colors.theme_bg,
    position: 'absolute',
    top: 10,
    left: 10,
    paddingRight: 12,
  },
  back_icon: {
    color: colors.theme_fg_three,
  },
  logo_content: {
    height: 180,
    width: 350,
  },
  logo: {
    flex: 1,
    width: undefined,
    height: undefined,
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
    width: '93%',
    alignItems: 'center',
  },
  login_container: {
    width: '100%',
    justifyContent: 'flex-end',
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
});
