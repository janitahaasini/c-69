import React from 'react';
import { Text,TouchableOpacity,View ,StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
 
export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
    getCameraPermissions=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions:status==="granted"
        })
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState
        if(buttonState==="clicked"&& hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned={
                    scanned?undefined:this.handleBarcodeScanned
                }
                style={StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(buttonState==="normal"){
            return(
                <View style={styles.container}>
    <Text stlye={styles.displaytext}>
        hasCameraPermissions===true?
        this.state.scannedData:"Request Camera Permissions"
        </Text>
    <TouchableOpacity  style={styles.scan}
       onPress={this.getCameraPermissions}
    >
      <Text>SCAN QR CODE</Text>
    </TouchableOpacity>
                </View>
            )
        }
        }
        
}
const styles = StyleSheet.create({
    container:{
        
             flex:1,
            justifyContent:'center',
            alignItems:'center' 
    },
      displaytext:{
          fontSize:15,
          textDecorationLine:'underline',
          justifyContent:"center"
      },
      scan:{
          backgroundColor:"pink",
          padding:10,
          margin:10
            
      }
})