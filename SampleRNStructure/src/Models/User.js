

export default class User {
    constructor() {
        this.userId = "";
        this.firstName = "";
        this.lastName = "";
        this.mobileNumber = "";
    }

    static createUserFromJson(json) {
        var user = new User();
        user.userId = json.userId;
		user.firstName = json.firstName;
        user.lastName = json.lastName;
        user.mobileNumber = json.mobileNumber;
		return user;
    }
}