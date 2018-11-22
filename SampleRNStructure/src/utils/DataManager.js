import { AsyncStorage } from "react-native"
import User from "../Models/User"

class DataManager {

    constructor() {
        this._user = {};
        this.bindMethods();
    }

    bindMethods() {
        this.getUser = this.getUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.updateUserProfileUrl = this.updateUserProfileUrl.bind(this);
    }

    saveUser(user) {
        this._user = user;
        var jsonString = JSON.stringify(user);
        try {
            AsyncStorage.setItem("USER_DATA", jsonString);
        } catch (error) {
            console.log("error in saving user details");
        }
    }

    _fetchUserDetails() {
        try {
            AsyncStorage.getItem("USER_DATA").then((value) => {
                if (value !== null) {
                    var jsonObj = JSON.parse(value);
                    this._user = User.createUserFromJson(jsonObj);
                    console.log("fetched user at start: ", this._user);
                }
            }).catch((error) => {
                console.log("error :", error);
            })
        } catch (error) {
            console.log(error);
            // completion(null,error)
        }
    }

    getUser() {
        return this._user;
    }

    removeUserDetails() {
        try {
            AsyncStorage.removeItem("USER_DATA");
            return true;
        }
        catch (ex) {
            return false;
        }
    }
}

const Datamanager = new DataManager()
export default Datamanager
