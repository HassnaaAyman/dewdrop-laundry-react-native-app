import React from 'react';
import { Image as Img, StatusBar as Sb } from 'react-native';
import { Divider as Hr } from 'react-native-elements';
import * as colors from '../assets/css/Colors';
import Spinner from 'react-native-loading-spinner-overlay';

export function Image(props) {
    return <Img style= {{flex:1 , width: undefined, height: undefined}} source={props.source} />
}

export function StatusBar(props){
	return <Sb
	    barStyle = "light-content"
	    hidden = {false}
	    backgroundColor = {colors.theme_bg}
	    translucent = {false}
	    networkActivityIndicatorVisible = {true}
	 />
}

export function Divider(props) {
    return <Hr style={{ backgroundColor: colors.theme_fg_two }} />
}

export function Loader(props){
	return <Spinner
      visible={props.visible}
      color={colors.theme_fg}
      size="large"
      animation="fade"
    />
}
