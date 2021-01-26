import { LoginDetails } from "./../models/login-detail";

export class BaseTestData {
    public testName: string;
    public loginDetails: LoginDetails;

    constructor(loginDetails?: LoginDetails) {
        this.loginDetails = loginDetails === undefined ? new LoginDetails('', '') : loginDetails;
    }

    public updateLoginDetails(newLoginDetails: LoginDetails) {
        this.loginDetails = newLoginDetails;
    }
}