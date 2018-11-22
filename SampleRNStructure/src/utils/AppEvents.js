import EventEmitter from "EventEmitter"

var eventEmitter = new EventEmitter()

var Events = {
	connectivityChanged : "connectivityChanged"
}

export default eventEmitter
export { Events }
