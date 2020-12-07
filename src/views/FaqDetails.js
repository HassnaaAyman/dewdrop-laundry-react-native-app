import React, {Component} from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Header, Content, Card, CardItem, Left, Body, Right, Title, Button, Icon } from 'native-base';
import * as colors from '../assets/css/Colors';
import strings from "../languages/strings.js";

export default class FaqDetails extends Component<Props> {

  constructor(props) {
      super(props)
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.state = {
        data:this.props.route.params.data
      }
  }

  handleBackButtonClick= () => {
      this.props.navigation.goBack(null);
  }

  render() {
    return (
      <Container>
        <Header androidStatusBarColor={colors.theme_bg} style={styles.header} >
          <Left style={{ flex: 1 }} >
            <Button transparent onPress={this.handleBackButtonClick}>
              <Icon style={styles.icon} name='arrow-back' />
            </Button>
          </Left>
          <Body style={styles.header_body} >
            <Title style={styles.title} >{this.state.data.question}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
            <Card>
              <CardItem>
                <Body>
                  <Text>{this.state.data.answer}</Text>
                </Body>
              </CardItem>
            </Card>
          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor:colors.theme_bg_three
  },
  icon:{
    color:colors.theme_fg_two
  },
  header_body: {
    flex: 3,
    justifyContent: 'center'
  },
  title:{
    alignSelf:'center', 
    color:colors.theme_fg_two,
    alignSelf:'center', 
    fontSize:16, 
    fontWeight:'bold'
  },
});
