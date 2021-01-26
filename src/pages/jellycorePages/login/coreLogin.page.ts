import { Timeouts } from '../../../infra/enum/timeouts';
import { waitUntil } from '../../../infra/waiter/wait';
import { BasePage } from '../base-Page';

export class CoreLogin extends BasePage {

    private get inputUsername() { return $('#email-login') }

    private get inputPassword() { return $('#password') }

    private get btnSubmit() { return $('//button[contains(text(), "Login")]') }

    private get errorMessage() { return $('.message-error') }

    public isUserLoggedIn(): boolean{
		const localStorage = browser.getLocalStorage();
		const isUserLoggedIn = localStorage.includes('knAdminauth');
		return isUserLoggedIn;
	}

    public isInputUserNameExisting(): boolean {
        waitUntil(() => this.inputUsername.isExisting(), Timeouts.THREE_SECONDS, 'UserId text box was not displaying');
        return this.inputPassword.isExisting();
    }

    public isInputUserPasswordExisting(): boolean {
        waitUntil(() => this.inputPassword.isExisting(), Timeouts.THREE_SECONDS, 'Password text box was not displaying');
        return this.inputPassword.isExisting();
    }

    public isInputSubmitButtonExisting(): boolean {
        waitUntil(() => this.btnSubmit.isExisting(), Timeouts.THREE_SECONDS, 'Submit button was not displaying');
        return this.btnSubmit.isExisting();
    }

    public isInputErrorMessageExisting(): boolean {
        waitUntil(() => this.errorMessage.isExisting(), Timeouts.THREE_SECONDS, 'Error message was not displaying');
        return this.errorMessage.isExisting();
    }

    public getErrorMessageExisting(): string {
        waitUntil(() => this.errorMessage.isExisting(), Timeouts.THREE_SECONDS, 'Error message was not displaying');
        return this.errorMessage.getText();
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    public login(username, password) {
        waitUntil(() => this.inputUsername.isExisting(), Timeouts.THREE_SECONDS, 'UserId text box was not displaying');
        this.inputUsername.setValue(username);
        this.logger.info(`username text ${username}`);
        waitUntil(() => this.inputPassword.isExisting(), Timeouts.THREE_SECONDS, 'Password text box was not displaying');
        this.inputPassword.setValue(password);
        this.logger.info(`user password text ${password}`)
        waitUntil(() => this.btnSubmit.isExisting(), Timeouts.THREE_SECONDS, 'Submit button box was not displaying');
        this.btnSubmit.click();
    }

    public enterUserId(text) {
        waitUntil(() => this.inputUsername.isExisting(), Timeouts.THREE_SECONDS, 'UserId text box was not displaying');
        this.inputUsername.clearValue();
        this.inputUsername.setValue(text);
        this.logger.info(`user neme text as ${text}`);
    }

    public enterPassword(text) {
        waitUntil(() => this.inputPassword.isExisting(), Timeouts.THREE_SECONDS, 'Password text box was not displaying');
        this.inputPassword.clearValue();
        this.inputPassword.setValue(text);
        this.logger.info(`user password text as  ${text}`);
    }

    public clickSubmitButton() {
        waitUntil(() => this.btnSubmit.isExisting(), Timeouts.THREE_SECONDS, 'Submit button box was not displaying');
        this.btnSubmit.click()
        this.logger.info('click submit button');
    }
}