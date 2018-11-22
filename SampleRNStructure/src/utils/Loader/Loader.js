import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Dimensions
} from "react-native";

import LottieView from "lottie-react-native";

var BG_COLOR           = "black";
var BG_OPACITY         = 0.7;
var loaderJSON         = require("./pulse_loader.json");
var LOADER_TOP         = WINDOW_HEIGHT/4 - LOADER_HEIGHT;
var LOADER_WIDTH       = 150;
var LOADER_HEIGHT      = 150;

const WINDOW_WIDTH     = Dimensions.get("window").width;
const WINDOW_HEIGHT    = Dimensions.get("window").height;

export default class Loader extends Component {
   	constructor() {
      	super()
      	this.state = {
         	visible: true
        };
    }

    render() {
      if (this.props.bgColor) {
        BG_COLOR = this.props.bgColor;
      }
      if (this.props.bgOpacity) {
        BG_OPACITY = this.props.bgOpacity;
      }
      if (this.props.loaderPath) {
        loaderJSON = this.props.loaderPath;
      }
      if (this.props.loaderSize) {
        LOADER_WIDTH = this.props.loaderSize;
        LOADER_HEIGHT = this.props.loaderSize;
      }
    	return(
        <View style={styles.container}>
          <View style={[styles.container,{ opacity: BG_OPACITY, backgroundColor: BG_COLOR }]}></View>
            <LottieView
              style={[styles.overlay,{ width: LOADER_WIDTH, height: LOADER_HEIGHT }]}
              source={loaderJSON}
              autoPlay
              loop
            />
        </View>
    	);
   	}
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
  },
  overlay: {
    position: "absolute",
    top: LOADER_TOP
  }
});
