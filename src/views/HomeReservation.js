import React, { useEffect, useState } from 'react';
import strings from '../languages/strings';
import { I18nManager, StyleSheet } from 'react-native';
import * as colors from '../assets/css/Colors';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Icon,
  Row,
  Input,
  Item,
  Textarea,
  Button,
  Picker,
} from 'native-base';
import Icons from 'react-native-vector-icons/Fontisto';
import Arrow from 'react-native-vector-icons/Foundation';

import axios from 'axios';
import {
  base_url,
  home_reservation,
  times_reservation,
} from '../config/Constants';
import { Text } from 'react-native-paper';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import Snackbar from 'react-native-snackbar';
import DropDownPicker from 'react-native-dropdown-picker';

const HomeReservation = props => {
  const [reservationDate, setReservationDate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservationDayAndTime, setReservationDayAndTime] = useState([]);
  const [daysValue, setDaysValue] = useState(null);
  const [timesValue, setTimesValue] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [daysId, setDaysId] = useState(null);
  const [notes, setNotes] = useState('');
  const [data, setData] = useState({});

  const handleBackButtonClick = () => {
    props.navigation.goBack(null);
  };

  const toggleReservationsDatePicker = () => {
    setReservationDate(!reservationDate);
  };

  const handleReservationsDatePicked = async date => {
    setReservationDate(false);
    var d = new Date(date);
    let delivery_date =
      d.getDate() +
      '-' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '-' +
      d.getFullYear();
    setSelectedDate(delivery_date);
  };

  const lang = strings.getLanguage();

  useEffect(() => {
    const getReservationTimes = async () => {
      await axios({
        method: 'get',
        url: base_url + times_reservation,
        data: { lang: global.lang },
      })
        .then(async response => {
          if (response) {
            setReservationDayAndTime(response.data.result);
          }
          await this.props.serviceActionSuccess(response.data);
        })
        .catch(error => {
          console.log('error', error);
        });
    };

    getReservationTimes();
  }, []);

  const getAdressAndLocation = data => {
    setData(data);
  };

  const addAddress = () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then(data => {
        props.navigation.navigate('Address', {
          id: 0,
          getAdressAndLocation: getAdressAndLocation,
        });
      })
      .catch(err => {
        alert(strings.please_enable_your_location);
      });
  };

  const showSnackbar = msg => {
    Snackbar.show({
      text: msg,
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  const handleSubmit = async () => {
    await axios({
      method: 'post',
      url: base_url + home_reservation,
      data: {
        customer_id: global.id,
        date: selectedDate,
        time: timesValue?.value,
        address: data.address,
        location: data.location,
        notes: notes,
      },
    })
      .then(response => {
        console.log(response.data.message, 'response');
        if (response.data.error) {
          showSnackbar(strings.errMessages);
        } else {
          showSnackbar(response.data.message);
          props.navigation.navigate('Home');
        }
        setSelectedDate(null);
        setTimesValue(null);
        setData({});
        setNotes('');
      })
      .catch(error => {
        console.log(error, 'error');
        showSnackbar(strings.sorry_something_went_wrong);
      });
  };

  const handleReservationTime = () => {
    const arr = [];
    reservationDayAndTime.map((times, index) => {
      if (times.times.includes(',')) {
        const timeArr = times.times.split(',');
        timeArr.map((time, i) => {
          arr.push({ time: time, id: times.id });
        });
      } else {
        arr.push({ time: times.times, id: times.id });
      }
    });
    return arr;
  };

  // console.log(global.id, selectedDate, timesValue?.value, data.address, data.location, notes, "data");
  console.log(data, 'data');

  return (
    <Container key={reservationDayAndTime.length}>
      <Header androidStatusBarColor={colors.theme_bg} style={styles.header}>
        {lang === 'ar' ? (
          <>
            <Left style={{ flex: 1 }}>
              <Arrow
                onPress={handleBackButtonClick}
                style={styles.icon}
                name="arrow-right"
                size={25}
              />
            </Left>
            <Body style={styles.header_body}>
              <Title style={styles.title}>{strings.HomeReservation}</Title>
            </Body>
          </>
        ) : (
            <>
              <Body style={{ flex: 20, justifyContent: "center" }}>
                <Title style={styles.title}>{strings.HomeReservation}</Title>
              </Body>
              <Right style={{ flex: 1 }}>
                <Arrow
                  onPress={handleBackButtonClick}
                  // style={styles.icon}
                  name="arrow-left"
                  size={25}
                />
              </Right>
            </>
          )}
        {/* 
        <Body style={styles.header_body}>
          <Title style={styles.title}>{strings.HomeReservation}</Title>
        </Body> */}
        <Right />
      </Header>

      <Row style={styles.container}>
        {lang === 'ar' ? (
          <Item
            style={styles.input_date}
            onPress={toggleReservationsDatePicker}>
            <Icons name="date" color="black" size={20} />
            <Input
              placeholder={strings.reservationDateText}
              value={selectedDate}
              disabled
            />
          </Item>
        ) : (
            <Item
              style={styles.input_date}
              onPress={toggleReservationsDatePicker}>
              <Icons name="date" color="black" size={20} />
              <Input
                placeholder={strings.reservationDateText}
                value={selectedDate}
                disabled
              />
            </Item>
          )}

        <DateTimePicker
          isVisible={reservationDate}
          onConfirm={handleReservationsDatePicked}
          onCancel={toggleReservationsDatePicker}
          minimumDate={new Date()}
          mode="date"
        />

        <DropDownPicker
          items={reservationDayAndTime.map(days => {
            return { label: days.day, value: days.day, key: days.id };
          })}
          containerStyle={{ height: 40 }}
          style={{ backgroundColor: '#fafafa' }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={(item, id) => {
            setIsSelected(true);
            setDaysValue(item);
            setDaysId(id);
          }}
          placeholder={strings.reservationDay}
        />

        {isSelected && (
          <DropDownPicker
            items={handleReservationTime().map(time => {
              if (daysId + 1 === time.id) {
                return { label: time.time, value: time.time, key: time.id };
              } else {
                return {
                  label: time.time,
                  value: time.time,
                  key: time.id,
                  disabled: true,
                };
              }
            })}
            containerStyle={{ height: 40 }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={(item, id) => {
              setTimesValue(item);
            }}
            placeholder={strings.reservationTime}
          />
        )}

        {/* <Item>
          <Picker
            key={reservationDayAndTime.length}
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            placeholderStyle={{ color: '#bfc6ea' }}
            placeholderIconColor="#007aff"
            selectedValue={daysValue}
            onValueChange={(value, id) => {
              setIsSelected(true);
              setDaysValue(value);
              setDaysId(id)
            }}
          >
            <Picker.Item label={strings.reservationDay} key={reservationDayAndTime.length} />
            {renderPickerItemForDays()}
          </Picker>
        </Item>

        {isSelected && (
          <Item >
            <Picker
              key={reservationDayAndTime.length}
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={timesValue}
              onValueChange={(value, id) => {
                setTimesValue(value);
              }}
            >
              <Picker.Item label={strings.reservationDay} key={reservationDayAndTime.length} />
              {renderPickerItemForTimes()}
            </Picker>
          </Item>
        )} */}

        <Item style={styles.address} onPress={addAddress}>
          <Icons name="home" color="black" size={20} />
          <Input
            placeholder={strings.add_new_address}
            style={styles.address_text}
            value={data.address}
            disabled
          />
        </Item>

        <Textarea
          style={styles.textArea}
          rowSpan={5}
          bordered
          placeholder={strings.notes}
          value={notes}
          onChangeText={text => setNotes(text)}
        />

        <Button onPress={handleSubmit} block style={styles.button}>
          <Text style={styles.button_text}>{strings.HomeReservationBtn}</Text>
        </Button>
      </Row>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    width: '95%',
  },
  header: {
    backgroundColor: colors.theme_bg_three,
  },
  icon: {
    color: colors.theme_fg_two,
  },
  header_body: {
    flex: 3,
    justifyContent: 'center',
  },
  title: {
    color: colors.theme_fg_two,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reservation_date: {
    flex: 0.2,
    alignItems: 'center',
  },
  reservation_date_text: {
    color: colors.theme_fg_two,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input_date: {
    marginLeft: 15,
  },
  picker: {
    marginLeft: 15,
  },
  address: {
    marginLeft: 15,
  },
  address_text: {
    fontSize: 16,
    color: colors.theme_fg_two,
    marginLeft: 10,
  },
  textArea: {
    alignSelf: 'center',
    width: '90%',
  },
  button_wrapper: {
    display: 'flex',
    // flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    // display: 'flex',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: colors.theme_bg,
  },
  button_text: {
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HomeReservation;
