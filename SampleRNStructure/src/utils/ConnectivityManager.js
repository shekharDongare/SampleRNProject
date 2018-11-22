import {
  NetInfo,
} from "react-native";
import eventEmitter, { Events } from "./AppEvents";

/**
 *	ConnectivityManager handles connectivity related changes.
 *	It registers handle to NetInfo and update it's state according to change in 
 * 	network state.
 */
class ConnectivityManager {

	constructor() {
		this.isConnected = false;
		this.registerHandler();
	}

	/**
	 *	Registers handler to listen change in network connectivity
	 */
	registerHandler() {
		NetInfo.isConnected.addEventListener("connectionChange", this.onConnectivityChanged.bind(this));
  }

	/**
	 *	It is a Callback function which gets called after there is change in 
	 *	network state connected or disconnected.
	 *
	 *	@param {Bool} connection_state - Network state one of none, wifi, cellular, unknown
	 */
	onConnectivityChanged(connection_state) {
		console.log("Network switched");  	
    this.isConnected = connection_state;
		eventEmitter.emit(Events.connectivityChanged, this.isConnected);
	}

	/**
	 *	Returns current network connection state
	 */
	isConnected() {
		return this.isConnected;
	}
}

var Connectivity = new ConnectivityManager();
export default Connectivity