import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useLazyQuery,useQuery, gql, useMutation } from '@apollo/client';

//const doBooking = () => Alert.alert('Book Now pressed');

export default function Main() { 

  const QUERY_LOGIN = gql`
    query($userName: String!, $password: String!){
      authorize(userName: $userName, password: $password){
        access_token
      }
    }`
  ;

  const MUTATION_SAVE_BOOKING = gql`
    mutation($saveBookingInput: SaveBookingInput){
      saveBooking(saveBookingInput: $saveBookingInput){
        headers
        body
        statusCode
        statusCodeValue
      }
    }
  `;

  const [message, setMessage] = useState("Screenloaded !");

  const [login, {loading, error, data}] = useLazyQuery(QUERY_LOGIN, {
    variables: {"userName": "salmanpzr@gmail.com", "password": "salmanpzr"},
    fetchPolicy: 'network-only',
    onCompleted: () => {
      setMessage("Login Successful with Token: " + data.authorize.access_token);
    }
  });

  const [saveBooking] = useMutation(MUTATION_SAVE_BOOKING, {
    variables: {
      "saveBookingInput": 
        {
          "bookingDate": "14/01/2021",
          "startTime": "09:00",
          "endTime": "10:00",
          "amount": 500,
          "bookingChannel": "MOBILE_APP",
          "customerAddressId": 1,
          "customerId": 1,
          "customerVehicleId": 1,
          "referenceNo": "025",
          "serviceId": 1,
          "serviceUnitId": 1
        }
    },
    onCompleted: () => {
      setMessage("Booking Saved Successfully !");
    },
    onError: () => {
      setMessage("Error on Booking Save !");
    }
  });

  if (loading) return <View style={styles.container}><Text>Loading...</Text></View>;
  if (error) return <View style={styles.container}><Text>{JSON.stringify(error) }</Text></View>

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <Text>SNASH Car Care</Text>
      <StatusBar style="auto" />
      <Button
        onPress={() => login()}
        title="Login"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Button
        onPress={() => saveBooking()}
        title="Book Now"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
