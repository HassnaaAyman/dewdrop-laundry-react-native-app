import React, {Component} from 'react';
import { StyleSheet, View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { loading } from '../config/Constants';
import { CommonActions } from '@react-navigation/native';
import strings from "../languages/strings.js";

export default class Logout extends Component<Props> {

  static navigationOptions = {
    header:null
  }
  
  componentWillMount(){
    AsyncStorage.clear();
    this.resetMenu();
  }


  resetMenu() {
   this.props
     .navigation.dispatch(
      CommonActions.reset({
       index: 0,
       routes: [{ name: "Phone" }],
     })
    );
  }

  render () {
    return (
      <View style={styles.container} >
        <View style={{ height:43, width:122 }} >
          <Image
            style= {{flex:1 , width: undefined, height: undefined}}
            source={loading}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#FFFFFF'
  }
});
