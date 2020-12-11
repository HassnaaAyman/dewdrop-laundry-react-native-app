import React, { Component } from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Title, Button, Icon } from 'native-base';
import { api_url, base_url, faq } from '../config/Constants';
import * as colors from '../assets/css/Colors';
import { Loader } from '../components/GeneralComponents';
import axios from 'axios';
import { connect } from 'react-redux';
import { serviceActionPending, serviceActionError, serviceActionSuccess } from '../actions/FaqActions';
import { CommonActions } from '@react-navigation/native';
import strings from "../languages/strings.js";

class Faq extends Component<Props> {

  constructor(props) {
    super(props)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.Faq();
  }

  handleBackButtonClick = () => {
    this.props.navigation.goBack(null);
  }

  faq_details = (data) => {
    this.props.navigation.navigate('FaqDetails', { data: data });
  }

  Faq = async () => {
    this.props.serviceActionPending();
    await axios({
      method: 'post',
      url: base_url + faq,
      data: { lang: global.lang }
    })
      .then(async response => {
        await this.props.serviceActionSuccess(response.data)
      })
      .catch(error => {
        this.props.serviceActionError(error);
      });
  }


  render() {

    const { isLoding, error, data, message, status } = this.props

    return (
      <Container>
        <Header androidStatusBarColor={colors.theme_bg} style={styles.header} >
          <Left style={{ flex: 1 }} >
            <Button onPress={this.handleBackButtonClick} transparent>
              <Icon style={styles.icon} name='arrow-back' />
            </Button>
          </Left>
          <Body style={styles.header_body} >
            <Title style={styles.title} >{strings.faq}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <List>
            <FlatList
              data={data}
              renderItem={({ item, index }) => (
                <ListItem onPress={() => this.faq_details(item)} >
                  <Left>
                    <Text style={styles.faq_title} >{item.question}</Text>
                  </Left>
                  <Right>
                    <Icon style={styles.icon} name="ios-arrow-forward" />
                  </Right>
                </ListItem>
              )}
              keyExtractor={item => item.question}
            />
          </List>
        </Content>
        <Loader visible={isLoding} />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoding: state.faq.isLoding,
    error: state.faq.error,
    data: state.faq.data,
    message: state.faq.message,
    status: state.faq.status,
  };
}

const mapDispatchToProps = (dispatch) => ({
  serviceActionPending: () => dispatch(serviceActionPending()),
  serviceActionError: (error) => dispatch(serviceActionError(error)),
  serviceActionSuccess: (data) => dispatch(serviceActionSuccess(data))
});


export default connect(mapStateToProps, mapDispatchToProps)(Faq);

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
  faq_title: {
    color: colors.theme_fg_two,
    fontSize: 15
  }
});
