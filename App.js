import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Search from './Sources/searchScreen'
import Transaction from './Sources/transactionScreen'

const TabNavigator = createBottomTabNavigator({
  transaction:Transaction,
  search:Search,
}, 
{
   defaultNavigationOption:(navigation)=>({
     tabBarIcon:()=>{
       const routeName = navigation.state.routeName
       if(routeName === "transaction"){
         return (
           <Image style={{width:50,height:50}} source = {require('./assets/assets/book.png')} />
         )
       } else if(routeName==="search"){
        <Image style={{width:50,height:50}} source = {require('./assets/assets/searchingbook.png')} />
       }
      }
  })
 }
 )



const AppContainer = createAppContainer(TabNavigator)

export default class App extends React.Component {
  render(){

    return (
       <AppContainer />
    );

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
