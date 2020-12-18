import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Container, Header, Content, Card, CardItem, Left, Body, Right, Title, Button, Icon } from 'native-base';
import * as colors from '../assets/css/Colors';
import Arrow from 'react-native-vector-icons/Foundation';

export default class FaqDetails extends Component {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      data: this.props.route.params.data
    }
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  }

  render() {
    return (
      <Container>
        <Header androidStatusBarColor={colors.theme_bg} style={styles.header} >
          {lang === 'ar' ? (
            <>
              <Left style={{ flex: 1 }}>
                <Arrow
                  onPress={this.handleBackButtonClick}
                  style={styles.icon}
                  name="arrow-right"
                  size={25}
                />
              </Left>
              <Body style={styles.header_body}>
                <Title style={styles.title} >{this.state.data.question}</Title>
              </Body>
            </>
          ) : (
              <>
                <Body style={{ flex: 20, justifyContent: "center" }}>
                  <Title style={styles.title} >{this.state.data.question}</Title>
                </Body>
                <Right style={{ flex: 1 }}>
                  <Arrow
                    onPress={this.handleBackButtonClick}
                    // style={styles.icon}
                    name="arrow-left"
                    size={25}
                  />
                </Right>
              </>
            )}
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
  header: {
    backgroundColor: colors.theme_bg_three
  },
  icon: {
    color: colors.theme_fg_two
  },
  header_body: {
    flex: 3,
    justifyContent: 'center'
  },
  title: {
    alignSelf: 'center',
    color: colors.theme_fg_two,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
});
