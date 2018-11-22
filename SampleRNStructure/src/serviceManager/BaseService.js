import Configuration from "../../Utils/Configuration"
import { AlertMessages } from "../../Utils/AlertMessages"
import Connectivity from "../../Utils/ConnectivityManager"
import EventEmitter from "../../Utils/AppEvents";
import EventEmitter from "EventEmitter"

export default class BaseService {

	createRequest(path, method, body, headers = {}) {
		var request = {
			url: Configuration.baseUrl + path,
			method: method,
			headers: headers,
			body: body
		};
		return request;
	}

	performWithCompletion(request, completion) {
		this.perform(request).then((response) => {
			if (!response.error) {
				var responseData = response.data;
				completion(responseData, null);
			}
			else {
				console.log("APi error : " + response.error);
				completion(null, response);
				if (response.error.errorCode == 401 || response.error.error == "Unauthorized") {
					new EventEmitter().emit("UNAUTHORIZED");
				}
			}
		}).catch((error) => {
			completion(null, error);
			console.log("Request name: }" + request.url + "\nbody: " + request.body + "\nheaders : " + request.headers.toString());
			console.log("Catched error in baseservice completion:: >>>", error);
		})
	}

	perform(request) {
		console.log("Request name: }" + request.url + "\nbody: " + request.body + "\nheaders : " + request.headers.toString());
		if (!Connectivity.isConnected()) {
			return new Promise(function (resolve, reject) {
				reject(AlertMessages.internetDisconnected);
			});
		}
		return fetch(request.url, {
			method: request.method,
			headers: request.headers,
			body: request.body
		})
			.then((response) => {

				if (response.status == 204) {
					return true;
				}
				if (response.status == 502) {
					return response;
				}
				return response.json();
			})
			.then((responseData) => {
				var errorObject = {};

				if (responseData.status == 502) {
					errorObject.error = AlertMessages.serverUnavailable;
					errorObject.errorCode = 502;
					return response;
				}

				if (responseData["Server_Exception"] || responseData["error"] || responseData["Server exception"]) {
					if (responseData["Server_Exception"]) {
						errorObject.error = responseData.Server_Exception;
						errorObject.errorCode = 500;
					} else if (responseData["Server exception"]) {
						errorObject.error = AlertMessages.somethingWentWrong;
						errorObject.errorCode = 500;
					} else {
						if (responseData.status == 0) {
							errorObject.error = responseData.error.errorMessage;
							errorObject.errorCode = responseData.error.errorCode;
							return errorObject;
						}
						if (responseData.error instanceof Array) {
							errorObject.error = responseData.error[0];
							errorObject.errorCode = 501;
						}
						else {
							errorObject.error = responseData.error;
							errorObject.errorCode = responseData.statusCode;
						}
					}
					return errorObject;
				}
				if (responseData.status == 0) {
					errorObject.error = responseData.error.errorMessage;
					errorObject.errorCode = responseData.error.errorCode;
					return errorObject;
				}
				return responseData;
			})
	}
}
