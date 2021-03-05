import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Card } from 'react-native-elements';
import MyHeader from '../components/Header';
import db from '../config'
import {SafeAreaProvider} from 'react-native-safe-area-context'

export default class AddSuggestion extends Component{

  constructor(){
    super()
    this.state={
      title1:'',
      best_out_waste:'',
      title2:'',
      sustainable_life:''
    }
  }

  addIdea=()=>{
    db.collection('best_out_waste').add({
      title:this.state.title1,
      idea:this.state.best_out_waste
    })
    .then(()=>{
     alert('Request Generated')
     this.props.navigation.navigate('Home')
    })
  }

  addSuggestion=()=>{
    db.collection('sustainable_life').add({
      title:this.state.title2,
      suggestion:this.state.sustainable_life
    })
    .then(()=>{
     alert('Request Generated')
     this.props.navigation.navigate('Home')
    })
  }
  
    render(){
      return (
        <SafeAreaProvider>
      <View style={styles.container}>
        <MyHeader title="Add Suggestions"/>
        <Card>
          <Text style={{fontSize:25,fontWeight:'bold'}}>Best Out of Waste</Text>
          <TextInput
          style={styles.input}
          placeholder={"Enter title"}
          onChangeText={text=>{this.setState({title1:text})}}
          />
          <TextInput
          style={styles.input}
          placeholder={"Enter your idea"}
          multiline={true}
          onChangeText={text=>{this.setState({best_out_waste:text})}}
          />
          <TouchableOpacity
          style={styles.button}
          onPress={()=>{this.addIdea(this.state.best_out_waste, this.state.title1)}}
          >
            <Text style={styles.buttonText}>Add your idea</Text>
          </TouchableOpacity>
        </Card>

        <Card>
          <Text style={{fontSize:25,fontWeight:'bold'}}>Sustainable Life</Text>
          <TextInput
          style={styles.input}
          placeholder={"Enter title"}
          onChangeText={text=>{this.setState({title2:text})}}
          />
          <TextInput
          style={styles.input}
          placeholder={"Enter your suggestion"}
          multiline={true}
          onChangeText={text=>{this.setState({sustainable_life:text})}}
          />
          <TouchableOpacity
          style={styles.button}
          onPress={()=>{this.addSuggestion(this.state.sustainable_life,
            this.state.title2)}}
          >
            <Text style={styles.buttonText}>Add your suggestion</Text>
          </TouchableOpacity>
        </Card>
      </View>
      </SafeAreaProvider>
        )
    }
   
  }

  const styles=StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center'
    },
    input:{
      alignSelf:'center',
      width:250,
      height:35,
      marginTop:20,
      borderWidth:1,
      borderRadius:2
    },
    button:{
      backgroundColor:'red',
      width:200,
      height:35,
      borderRadius:5,
      alignSelf:'center',
      marginTop:20
    },
    buttonText:{
      fontWeight:'bold',
            color:'white',
            fontSize:20,
            alignSelf:'center'
    }

  })
  
  