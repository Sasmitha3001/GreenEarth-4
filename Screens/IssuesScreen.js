import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase'
import db from '../config'
import { FlatList } from 'react-native';
import {ListItem} from 'react-native-elements'
import MyHeader from '../components/Header';
import {SafeAreaProvider} from 'react-native-safe-area-context'

export default class IssuesScreen extends Component{

  constructor(){
    super()
    this.state={
      allRequests:[],
      location:'',
      description:'',
      contact:'',
      email:firebase.auth().currentUser.email
    }
  }

  // getUserDetails=()=>{
  //   db.collection('users').where('email','==',this.state.email).get()
  //   .then((snapshot)=>{snapshot.forEach(doc=>{var document=doc.data();
  //   this.setState({
  //     contact:document.contact
  //   })
  //   })})
  // }

  // getAllRequests=()=>{
    
  //   db.collection('requests').onSnapshot((snapshot)=>{
  //     snapshot.docs.map(doc=>{var document=doc.data()})
  //     allRequests.push(document)
  //     this.setState({
  //       allRequests:allRequests
  //     })
  //   })
  // }

  getAllRequests = () => { db.collection("requests").onSnapshot((snapshot) => { var allRequests=[] 
    snapshot.docs.map((doc) => { var document = doc.data(); allRequests.push(document) }); this.setState({ allRequests: allRequests }); }); };

  renderItem=({item,i})=>{
    return(
      <View>
        {console.log(item)}
      <ListItem
      key={i}
      title={item.issue}
      
      subtitle={item.description}
      rightElement={
        <Text>{item.location}</Text>
      }
      bottomDivider
      />
      <Text style={{fontWeight:'bold'}}>{item.issue}</Text>
      <Text style={{color:'grey'}}>{item.description}</Text>
      <Text style={{color:'grey'}}>{item.location}</Text>

      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, }} />
      </View>
    )
  
  }

  componentDidMount(){
    this.getAllRequests()
  }
    
    render(){
      return (
        this.state.allRequests.length===0?(
        <SafeAreaProvider>
          <View> <MyHeader title="Issues Screen"/>
        <Text>List of all Issues</Text>
        </View>
        </SafeAreaProvider>
        )
        :(<SafeAreaProvider>
          <View>
        <MyHeader title="Issues Screen"/>
        {console.log(this.state.allRequests)}
        <FlatList
        keyExtractor={(item,index)=>{index.toString()}}
        data={this.state.allRequests}
        renderItem={this.renderItem}
        />
      </View>
      </SafeAreaProvider>
        )
        
        )
    }
   
  }
  
  