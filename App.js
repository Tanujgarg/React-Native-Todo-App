import React, { Component } from 'react'
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'
import { Button, View, StyleSheet, TouchableOpacity, Text, ScrollView, BackHandler, exitApp} from 'react-native'
import RNExitApp from 'react-native-exit-app';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { TextField } from 'react-native-material-textfield';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
 
let id = 0

const Todo = props => (
  <Card>
  <CardTitle 
    title={`${props.todo.title}`}
   />
  <CardContent text={`${props.todo.description}`} />
  <CardAction 
    separator={true} 
    inColumn={false}>
    <CardButton
      onPress={props.onDelete}
      title="Delete"
      color="red"
    />
  </CardAction>
</Card>
)

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#17a2b8',
  },
  navBar: {
    backgroundColor: '#17a2b8',
  },
  title: {
    color: '#fff',
    fontSize: '20px',
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
  },
})


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      dialogVisibility: false,
      title: '',
      description: '',
      todos: [],
    }
  }
  closeApp(){
    alert("Failed to close! Under Maintainance")
  }

  showDialog() {
    this.setState({
      dialogVisibility: true
    })
  }

  closeDialog() {
    this.setState({
      dialogVisibility: false
    })
  }

  addTodo() {
    let title = this.state.title
    let description = this.state.description
    this.setState({
      todos: [...this.state.todos, {title: title, description: description, id:id++}],
      dialogVisibility: false
    })
  }
  deleteTodo(id) {
        this.setState({
            todos:this.state.todos.filter(todo => todo.id !== id)
        })
    }

  render() {
    return (
      <View>
        <NavBar style={styles}>
        <NavButton onPress={() => this.closeApp()}>
          <NavButtonText style={styles.buttonText}>
            {"Close"}
          </NavButtonText>
        </NavButton>
        <NavTitle style={styles.title}>
          {"TODO"}
        </NavTitle>
        <NavButton onPress={() => this.showDialog()}>
          <NavButtonText style={styles.buttonText}>
            {"New"}
          </NavButtonText>
        </NavButton>
      </NavBar>
      <ConfirmDialog
        title="New TODO"
        visible={this.state.dialogVisibility}
        onTouchOutside={() => this.setState({dialogVisibility: false})}
        positiveButton={{
        title: "Create",
        onPress: () => this.addTodo()
        }}
        negativeButton={{
        title: "Close",
        onPress: () => this.closeDialog() 
        }}
      >
      <TextField
        label='Title'  
        onChangeText={(text => this.setState({title: text}))}
      />
      <TextField
        label='Description'  
        onChangeText={(text => this.setState({description: text}))}
      />
      </ConfirmDialog>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: '20'}}>
          Total Todos: {this.state.todos.length}
        </Text>
      </View>
      <ScrollView>
        {this.state.todos.map(todo => (<Todo todo={todo} onDelete={() => this.deleteTodo(todo.id)} />))}
      </ScrollView>
      </View>
    )
  }
}
