import {
  Alert
} from "react-native";

const APP_NAME = "SampleStructure";

export default class AlertManager {
	static showAlert(title, message) {
		Alert.alert(title,message);
	}

	static showAlertWithButton(title, message, buttonTitle, buttonAction=null) {
		var alertTitle = "";
		if (title == null) {
			alertTitle = APP_NAME;
		} else {
			alertTitle = title;
		}
		Alert.alert(alertTitle,message,[
	     	{text:buttonTitle , onPress:() => {
			   if (buttonAction !== null) {
					buttonAction();
				}
	     	}}
	   ]);
	}

	static showAlertWithTwoButtons(title,
											 message,
											 button1Title,
											 button1Action=null,
										 	 button2Title,
										 	 button2Action=null) {
		var alertTitle = "";
		if (title == null) {
			alertTitle = APP_NAME;
		} else {
			alertTitle = title;
		}
		Alert.alert(alertTitle,message,[
	     {text:button1Title , onPress:() => {
	       button1Action();
	     }},
	     {text:button2Title , onPress:() => {
	       button2Action();
	     }}
	   ]);
	}
}
