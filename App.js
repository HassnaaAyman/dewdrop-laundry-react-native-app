import React, { Fragment } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { fromRight } from 'react-navigation-transitions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialIcons';


import * as colors from './src/assets/css/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import strings from './src/languages/strings.js';

//Screens
import Product from './src/views/Product';
import Address from './src/views/Address';
import AddressList from './src/views/AddressList';
import Cart from './src/views/Cart';
import Faq from './src/views/Faq';
import FaqDetails from './src/views/FaqDetails';
import Forgot from './src/views/Forgot';
import Home from './src/views/Home';
import Login from './src/views/Login';
import Phone from './src/views/Phone';
import Logout from './src/views/Logout';
import More from './src/views/More';
import MyOrders from './src/views/MyOrders';
import OrderDetails from './src/views/OrderDetails';
import Otp from './src/views/Otp';
import PhoneVerification from './src/views/PhoneVerification';
import Payment from './src/views/Payment';
import PrivacyPolicy from './src/views/PrivacyPolicy';
import Profile from './src/views/Profile';
import Promo from './src/views/Promo';
import Register from './src/views/Register';
import Reset from './src/views/Reset';
import Tap from './src/views/Tap';
import Splash from './src/views/Splash';
import HomeReservation from './src/views/HomeReservation';
import ActiveReservations from './src/views/ActiveReservations';
import CompletedReservations from './src/views/CompletedReservations';
import ReservationDetails from './src/views/ReservationDetails';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      animationEnabled={true}
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#bfbfbf',
        style: {
          backgroundColor: '#1769cc',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: strings.home,
          tabBarIcon: ({ color, size }) => (
            <Icon2 name="home" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="MyOrders"
        component={MyOrders}
        options={{
          tabBarLabel: strings.my_orders,
          tabBarIcon: ({ color, size }) => (
            <Icon name="tshirt" color={color} size={17} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: strings.profile,
          tabBarIcon: ({ color, size }) => (
            <Icon3 name="person" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Home reservation"
        component={HomeReservation}
        options={{
          tabBarLabel: strings.HomeReservation,
          tabBarIcon: ({ color, size }) => (
            <Icon2 name="inbox" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={More}
        options={{
          tabBarLabel: strings.more,
          tabBarIcon: ({ color, size }) => (
            <Icon3 name="more-vert" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName="Splash">
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="AddressList" component={AddressList} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Phone" component={Phone} />
        <Stack.Screen name="Faq" component={Faq} />
        <Stack.Screen name="FaqDetails" component={FaqDetails} />
        <Stack.Screen name="Tap" component={Tap} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="Home" component={MyTabs} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="PhoneVerification" component={PhoneVerification} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Promo" component={Promo} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Reset" component={Reset} />
        <Stack.Screen
          name="ActiveReservations"
          component={ActiveReservations}
        />
        <Stack.Screen
          name="CompletedReservations"
          component={CompletedReservations}
        />
        <Stack.Screen
          name="ReservationDetails"
          component={ReservationDetails}
        />
        <Stack.Screen name="Splash" component={Splash} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
