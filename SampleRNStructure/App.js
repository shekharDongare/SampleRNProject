/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, View, Animated, Easing, TouchableOpacity, Text, Dimensions } from "react-native";
import Loader from "./src/utils/Loader/Loader";

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      isLoading : false
    }
  }

  startLoader() {
    this.setState({ isLoading : true });
    setTimeout(() => {
      this.setState({ isLoading: false})
    }, 3000);

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 22, fontWeight: "400" }}>Welcome To React-Native</Text>
        <TouchableOpacity style={styles.buttonStyle}
          onPress = {() =>  this.startLoader()}>
          <Text style={styles.btnTitleStyle}>Start</Text>
        </TouchableOpacity>
        {this.renderLoaderView()}
      </View>
    );
  }

  renderLoaderView(){
    if(this.state.isLoading){
      return (
        <Loader 
          bgColor = "gray" 
          bgOpacity={0.7} 
          loaderPath = {require("./src/utils/Loader/color_loader.json")}
          loaderSize = {100}
        />
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "green",
    position: "absolute",
    bottom: 20,
    right: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  btnTitleStyle: {
    color: "white",
    fontSize: 16,
    fontWeight: "500"
  }
});
