import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, Image, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'native-base';
import Snackbar from 'react-native-snackbar';
import { api_url, reset, height_50, height_30, reset_password, base_url } from '../config/Constants';
import { StatusBar, Loader } from '../components/GeneralComponents';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/ResetActions';
import * as colors from '../assets/css/Colors';
import { CommonActions } from '@react-navigation/native';
import strings from "../languages/strings.js";

class Reset extends Component {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      password: '',
      confirm_password: '',
      validation: true
    }
  }

  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }

  reset_password = async () => {
    Keyboard.dismiss();
    await this.checkValidate();
    if (this.state.validation) {
      this.props.serviceActionPending();
      await axios({
        method: 'post',
        url: base_url + reset,
        data: { id: this.props.id, password: this.state.password }
      })
        .then(async response => {
          await this.props.serviceActionSuccess(response.data);
          await this.login();
        })
        .catch(error => {
          this.props.serviceActionError(error);
        });
    }
  }

  login() {
    if (this.props.status == 1) {
      this.props
        .navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Login" }],
          })
        );

    } else {
      this.showSnackbar(this.props.message);
    }
  }

  checkValidate() {
    if (this.state.confirm_password == '' || this.state.password == '') {
      this.state.validation = false;
      this.showSnackbar(strings.please_fill_all_the_fields);
      return true;
    } else if (this.state.confirm_password != this.state.password) {
      this.state.validation = false;
      this.showSnackbar(strings.password_and_confirm_password_does_not_match);
      return true;
    } else {
      this.state.validation = true;
    }

  }

  showSnackbar(msg) {
    Snackbar.show({
      title: msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  render() {

    const { isLoding, error, data, message, status } = this.props

    return (
      <ScrollView keyboardShouldPersistTaps='always'>
        <View style={styles.container}>
          <View>
            <StatusBar />
          </View>
          <Loader visible={isLoding} />
          <View style={styles.block_one} >
            <View style={styles.back_content} >
              <Icon onPress={this.handleBackButtonClick} style={styles.back_icon} name='arrow-back' />
            </View>
            <View style={styles.reset_image_content} >
              <Image
                style={{ flex: 1, width: undefined, height: undefined }}
                source={reset_password}
              />
            </View>
            <View>
              <Text style={styles.reset_password} >{strings.reset_password}</Text>
            </View>
          </View>
          <View style={styles.block_two} >
            <View style={styles.input_content}>
              <TextInput
                style={styles.input}
                placeholder={strings.password}
                secureTextEntry={true}
                onChangeText={TextInputValue =>
                  this.setState({ password: TextInputValue })}
              />
            </View>
            <View style={{ marginTop: 20 }} />
            <View style={styles.input_content}>
              <TextInput
                style={styles.input}
                placeholder={strings.confirm_password}
                secureTextEntry={true}
                onChangeText={TextInputValue =>
                  this.setState({ confirm_password: TextInputValue })}
              />
            </View>
          </View>
          <View style={styles.footer} >
            <View style={styles.footer_container} >
              <Button
                title={strings.reset_password}
                onPress={this.reset_password}
                buttonStyle={styles.reset_password_btn}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps(state) {
  return {
    isLoding: state.reset.isLoding,
    error: state.reset.error,
    data: state.reset.data,
    message: state.reset.message,
    status: state.reset.status,
    id: state.forgot.data.id
  };
}

const mapDispatchToProps = (dispatch) => ({
  serviceActionPending: () => dispatch(serviceActionPending()),
  serviceActionError: (error) => dispatch(serviceActionError(error)),
  serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Reset);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.theme_bg_three
  },
  back_icon: {
    color: colors.theme_bg,
    paddingLeft: 10,
    paddingRight: 10
  },
  back_content: {
    width: '100%',
    position: 'absolute',
    top: 10,
    left: 10
  },
  block_one: {
    width: '100%',
    height: height_50,
    backgroundColor: colors.theme_bg_three,
    alignItems: 'center',
    justifyContent: 'center'
  },
  reset_image_content: {
    height: 152,
    width: 150
  },
  reset_password: {
    color: colors.theme_fg,
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold'
  },
  block_two: {
    width: '100%',
    height: height_30,
    backgroundColor: colors.theme_bg_three,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input_content: {
    height: 40,
    width: '80%'
  },
  input: {
    height: 40,
    borderColor: colors.theme_fg,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5
  },
  footer: {
    width: '100%',
    alignItems: 'center'
  },
  footer_container: {
    width: '80%',
    marginTop: 10
  },
  reset_password_btn: {
    backgroundColor: colors.theme_bg
  }
});
