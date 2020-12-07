import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Container, Content, Left, Body, Right, Icon, List, ListItem, Button } from 'native-base';
import * as colors from '../assets/css/Colors';
import { Divider } from '../components/GeneralComponents';
import { menus } from '../config/Constants';
import Dialog from "react-native-dialog";
import strings from "../languages/strings.js";

export default class More extends Component<Props> {

  constructor(props) {
      super(props)
      this.state = {
        dialogVisible:false,
        menus:[
          {
            menu_name: strings.manage_addresses,
            icon: 'pin',
            route:'AddressList'
          },
          {
            menu_name: strings.faq,
            icon: 'help',
            route:'Faq'
          },
          {
            menu_name: strings.privacy_policy,
            icon: 'alert',
            route:'PrivacyPolicy'
          },
          {
            menu_name: strings.logout,
            icon: 'log-out',
            route:'Logout'
          },
        ]
      }
  }

  navigate = (route) => {
    if(route == 'Logout'){
      this.showDialog();
    }else if(route == 'AddressList'){
       this.props.navigation.navigate(route,{ from : 'More'});
    }else{
      this.props.navigation.navigate(route);
    }
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  }

  closeDialog = () => {
    this.setState({ dialogVisible: false });
  }

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  }
 
  handleLogout = async() => {
    await this.closeDialog();
    await this.props.navigation.navigate('Logout');
  }


  render() {
    return (
      <Container style={styles.container} >
        <View style={styles.header} >
          <Text style={styles.profile_name} >{global.customer_name}</Text>
        </View>
        <Divider />
        <Content style={styles.content} >
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>{strings.confirm}</Dialog.Title>
          <Dialog.Description>
            Do you want to logout?.
          </Dialog.Description>
          <Dialog.Button label={strings.yes} onPress={this.handleLogout} />
          <Dialog.Button label={strings.no} onPress={this.handleCancel} />
        </Dialog.Container>

        <List>
            <FlatList
              data={this.state.menus}
              renderItem={({ item,index }) => (
                <ListItem icon onPress={() => this.navigate(item.route)}>
                  <Left>
                    <Button style={styles.icon_button}>
                      <Icon active name={item.icon} />
                    </Button>
                  </Left>
                  <Body>
                    <Text style={styles.menu_name} >{item.menu_name}</Text>
                  </Body>
                  <Right />
                </ListItem>
              )}
              keyExtractor={item => item.menu_name}
            />
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: colors.theme_bg_two
  },
  header:{
    backgroundColor:colors.theme_bg_three, 
    padding:20
  },
  profile_name: {
    fontSize:16, 
    color:colors.theme_fg_two, 
    fontWeight:'bold'
  },
  content:{
    backgroundColor:colors.theme_bg_three
  },
  icon_button:{
    backgroundColor: colors.theme_bg
  },
  menu_name:{
    fontSize:16, 
    color:colors.theme_fg_two
  }
});

