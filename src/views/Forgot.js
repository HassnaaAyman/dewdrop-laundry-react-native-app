import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, ScrollView, Image, Keyboard  } from 'react-native';
import { Button } from 'react-native-elements';
import { Icon } from 'native-base';
import Snackbar from 'react-native-snackbar';
import { api_url, height_60, height_20, forgot, forgot_password } from '../config/Constants';
import { StatusBar, Loader } from '../components/GeneralComponents';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/ForgotActions';
import * as colors from '../assets/css/Colors';
import { CommonActions } from '@react-navigation/native';
import strings from "../languages/strings.js";

class Forgot extends Component<Props>{

  constructor(props) {
      super(props)
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.state = {
        phone_number: '',
        validation:true
      }
  }
 
  handleBackButtonClick() {
      this.props.navigation.goBack(null);
      return true;
  }

  forgot_password = async () => {
    Keyboard.dismiss();
    await this.checkValidate();
    if(this.state.validation){
        this.props.serviceActionPending();
        await axios({
          method: 'post', 
          url: api_url + forgot,
          data:{ phone_number: this.state.phone_number }
        })
        .then(async response => {
            await this.props.serviceActionSuccess(response.data);
            await this.otp();
        })
        .catch(error => {
            this.props.serviceActionError(error);
        }); 
    }
  }

  otp(){
    if(this.props.status == 1){
      this.props.navigation.navigate('Otp');
    }else{
      alert(this.props.message);
    }
  }

  checkValidate(){
    if(this.state.email == ''){
      this.state.validation = false;
      this.showSnackbar(strings.please_enter_email_address);
      return true;
    }
  }


  showSnackbar(msg){
    Snackbar.show({
      title:msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  render() {

    const { isLoding, error, data, message, status } = this.props

    return (
      <ScrollView keyboardShouldPersistTaps='always'>
        <View style={styles.container}>
          <View>
            <StatusBar/>
          </View>
          <Loader visible={isLoding} />
          <View style={styles.block_one} >
            <View style={styles.back_content} >
              <Icon onPress={this.handleBackButtonClick} style={styles.back_icon} name='arrow-back' />
            </View>
            <View style={styles.forgot_image} >
              <Image
                style= {{flex:1 , width: undefined, height: undefined}}
                source={forgot_password}
              />
            </View>
            <View>
              <Text style={styles.forgot_your_password} >{strings.forgot_your_password}</Text>
            </View>
            <View style={styles.description_content} >
              <Text style={styles.description} >{strings.enter_your_phone_number_below_to_receive_the_instructions_to_reset_your_password}</Text>
            </View>
          </View>
          <View style={styles.block_two} >
            <View style={styles.email_content}>
              <TextInput 
                style={styles.email}
                placeholder={strings.email_address}
                placeholder="530XXXXXX"
                keyboardType="phone-pad"
                onChangeText={ TextInputValue =>
                  this.setState({phone_number : TextInputValue }) }
              />
            </View>
          </View>
          <View style={styles.footer} >
            <View style={styles.footer_content} >
              <Button
                title={strings.send_otp}
                onPress={this.forgot_password}
                buttonStyle={styles.send_otp}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    )
  }
}

function mapStateToProps(state){
  return{
    isLoding : state.forgot.isLoding,
    error : state.forgot.error,
    data : state.forgot.data,
    message : state.forgot.message,
    status : state.forgot.status
  };
}

const mapDispatchToProps = (dispatch) => ({
    serviceActionPending: () => dispatch(serviceActionPending()),
    serviceActionError: (error) => dispatch(serviceActionError(error)),
    serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data))
});

export default connect(mapStateToProps,mapDispatchToProps)(Forgot);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:colors.theme_bg_three
  },
  back_icon:{
    color:colors.theme_bg,
    paddingLeft:10,
    paddingRight:10
  },
  back_content:{
    width: '100%',  
    position:'absolute', 
    top:10, 
    left:10
  },
  block_one:{
    width: '100%', 
    height: height_60, 
    backgroundColor: colors.theme_bg_three, 
    alignItems:'center', 
    justifyContent:'center'
  },
  forgot_image:{
    height:152, 
    width:150
  },
  forgot_your_password:{
    color:colors.theme_fg, 
    marginTop:20, 
    fontSize:20, 
    fontWeight:'bold' 
  },
  description_content:{
    paddingLeft:20, 
    paddingRight:20
  },
  description:{
    marginTop:20, 
    fontSize:13, 
    textAlign:'center', 
    color:colors.theme_fg_four
  },
  block_two:{
    width: '100%', 
    height: height_20, 
    backgroundColor: colors.theme_bg_three, 
    alignItems:'center', 
    justifyContent:'center'
  },
  email_content:{
    height:40, 
    width:'80%'
  },
  email:{
    borderColor: colors.theme_fg, 
    borderWidth: 1, 
    padding:10, 
    borderRadius:5
  },
  footer:{
    width: '100%',
    alignItems:'center'
  },
  footer_content:{
    width:'80%', 
    marginTop:10
  },
  send_otp:{
    backgroundColor:colors.theme_bg
  }
});
