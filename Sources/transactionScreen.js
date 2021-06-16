import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity,TextInput} from 'react-native';
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'
import { Header } from 'react-native-elements';
import { FontAwesome5 } from '@expo/vector-icons';
import {AdMobBanner} from 'expo-ads-admob'

export default class Transaction extends React.Component {

  constructor(){
    super();
    this.state={
      hasCameraPermissions:false,
      scanned:undefined,
      scannedData:"",
      buttonState:"normal",
      cameraAccess:false,
      data:"",
      type:"",
      cameraState:0
    }
  }
  
  getCameraPermission = async() => {
    // const {status} = await Permissions.askAsync(Permissions.CAMERA)
    var cameraP = ""

    const{status} = await BarCodeScanner.requestPermissionsAsync()
    if(status === "granted"){
      cameraP = true
    }else if(status===null){
      cameraP= false
    }else{
      cameraP=false
    }
    this.setState({hasCameraPermissions:cameraP,buttonState:"clicked", scanned:undefined})
    
  }

  handleBarCodeScanned = async({type,data}) => {
    this.setState({scanned:true, scannedData:data, buttonState:"normal"})
    alert("type : "+ type + " data : "+ data)
    var ts = type.toString()
    this.setState({type:ts,data:data,hasCameraPermissions:false})

  }
  
  render(){
      const hasCameraPermissions = this.state.hasCameraPermissions
      const scanned = this.state.scanned
      const buttonState = this.state.buttonState
    

      // if(buttonState === "normal"){
      //       // return(
      //       //   <View style={{marginTop:50}} >

      //       //   <View>
                               
      //       //   <Text style={{marginTop:50}}>{hasCameraPermissions===this.state.cameraAccess?"PLEASE GRANT ACCESS TO THE CAMERA":"ACCESS GRANTED"}</Text>

      //       //   </View>
      //       //   <TextInput  style={{width:"100%",backgroundColor:"orange"}} value={this.state.type} placeholder = "BOOK ID" />

      //       //   <TextInput  style={{width:"100%",backgroundColor:"orange",marginTop:10}} value={this.state.data} placeholder = "STUDENT ID" />
  
      //       //   <TouchableOpacity onPress = {this.getCameraPermission}><Text>Scan QR Code</Text></TouchableOpacity>

      //       //   <BarCodeScanner  style={styles.scanner} onBarCodeScanned = {scanned?undefined:this.handleBarCodeScanned} />
              
      //       // </View>
      //       // )
      //   }

      return(
             <View style={{marginTop:30,backgroundColor:"#334f87",height:"100%"}} >

               <Header backgroundColor="#48a880"  centerComponent={{ text: 'QR CODE SCANNER', style: { color: '#fff' ,fontWeight:'bold',fontSize:20} }} />

              <View style = {{backgroundColor:"#413889",borderRadius:35,margin:10,paddingTop:20,paddingBottom:20,paddingLeft:10,paddingRight:10,height:70,paddingTop:25,marginTop:20}}>
                               
              <Text style={{textAlign:'center',fontSize:14,fontWeight:'bold',color:"#fff"}}>{hasCameraPermissions===this.state.cameraAccess?"STATUS : PLEASE GRANT ACCESS TO THE CAMERA":"STATUS : ACCESS GRANTED"}</Text>

              </View>
              <TextInput  style={{backgroundColor:"orange",padding:10,margin:10,borderRadius:15,height:60}} value={this.state.type} placeholder = "BOOK ID" />

              <TextInput  style={{backgroundColor:"orange",padding:10,margin:10,borderRadius:15,height:60}} value={this.state.data} placeholder = "STUDENT ID" />
  
              {hasCameraPermissions === false ? <TouchableOpacity style={{backgroundColor:"#b72828",padding:15,borderRadius:50,width:"70%",alignSelf:"center"}} onPress = {this.getCameraPermission}><Text style={{textAlign:'center',fontWeight:'bold',color:"#fff",fontSize:20}}>OPEN CAMERA</Text></TouchableOpacity> : null}              
              <View style={styles.mainBody}>
                {this.state.hasCameraPermissions === true ? <BarCodeScanner  style={styles.scanner} onBarCodeScanned = {scanned?undefined:this.handleBarCodeScanned} />  : null}
                <AdMobBanner
              style={{margin:5,alignSelf:'center'}}
                bannerSize="fullBanner"
                adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
                />
              </View>
             
            </View>

       )
  }
}

const styles = StyleSheet.create({
  mainBody:{  
 height:200,
 width:400,
 alignSelf:'center',
marginTop:15
},
scanner:{ 
paddingTop:400,
paddingRight:400

}
})
