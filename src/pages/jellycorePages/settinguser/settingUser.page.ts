import { Timeouts } from '../../../infra/enum/timeouts';
import { waitUntil } from '../../../infra/waiter/wait';
import { BasePage } from '../base-Page';


export class SettingUser extends BasePage {

    private get shadowThreeDots() { return $('.my-5') }

    private get threeDots() { return this.shadowThreeDots.shadow$('#three-dot-loader') }

    private get addUser() { return $('.main .page-title a') }

    private get titleBox() { return $$('.main main form .box-title') }

    private get settingmenu() { return $('//a[contains(text(),"Setting")]') }

    private get settingOption() { return $$('.submenu-settings .first-submenu ul li a p') }

    private get userLogin() { return $('.form #login') }

    private get username() { return $('.form #display_name') }

    private get userPassword() { return $('.form #pwd') }

    private get userEmail() { return $('.form #email') }

    private get userCountry() { return $('.form #country') }

    private get userCountryOptions() { return $$('.form #country option') }

    private get userLevelButton() { return $('#lvl') }

    private get userLevelOptions() { return $$('#lvl option') }

    private get customCheckbox() { return $$('.checkbox-custom label') }

    private get addthisUserButton() { return $('//button[contains(text(),"Add this user")]') }

    private get tabelHeader() { return $$('table thead tr td span') }

    private get searchButton() { return $('.input-search') }

    private get tabelColumn() { return $$('table tbody tr td') }

    private get columnAction() { return $$('table tbody tr .has-separation a') }

    private get updateButton() { return $('//button[contains(text(),"Update this user")]') }

    private get deletePanel() { return $('//span[contains(text(), "Delete this profile")]') }

    private get deleteYesButton() { return $('//a[contains(text(), "Yes")]') }

    /**
     * checking loader dot are displaying or not
     */
    public isThreeDostExisting(): boolean {
        return this.threeDots.isExisting();
    }

    public isTableLoaded(): boolean {
        return !this.isThreeDostExisting();
    }
    /**
     *  checking weather table is loaded or not
     */
    public waitTillTableReloads(): boolean {
        return waitUntil(() => this.isTableLoaded(), Timeouts.TEN_SECONDS, 'Table is not loaded, three dot is visible');
    }

    public moveToSettingMenu() {
        waitUntil(() => this.settingmenu.isExisting(), Timeouts.TEN_SECONDS, 'Setting menu was not displayed');
        this.settingmenu.moveTo();
    }

    /**
     * checking the add new user button existing or not
     */
    public isAddNewUserButtonExisting(): boolean {
        return waitUntil(() => this.addUser.isExisting(), Timeouts.TEN_SECONDS, 'add new user button was not displayed');
    }

    /**
     * here click on add new user button
     */
    public clickOnAddNewUserButton() {
        waitUntil(() => this.addUser.isExisting(), Timeouts.TEN_SECONDS, 'add new user button was not displayed');
        this.addUser.click();
    }

    /**
     * checking the add new user title existing or not
     */
    public isTitlePageExisting(): boolean {
        return waitUntil(() => this.titleBox[0].isExisting(), Timeouts.TEN_SECONDS, 'New user creation title page was not displaying');
    }

    /**
     * select the setting options from the list
     */
    public selectSettingOption(option: string) {
        waitUntil(() => this.settingOption[0].isExisting(), Timeouts.THREE_SECONDS, 'Column filter button was not displaying');
        const filter = this.getTextFromSettingMenu(option);
        filter.click();
    }

    /**
     * 
     * @param text 
     * get the text the from setting menu options
     */
    public getTextFromSettingMenu(text) {
        waitUntil(() => this.settingOption[0].isExisting(), Timeouts.THREE_SECONDS, 'Setting options was not displayed');
        const elements = this.settingOption;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim()
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

    /**
     * here we inserting the user login in to the textbox
     */
    public enterUserLogin(loginId: string) {
        waitUntil(() => this.userLogin.isExisting(), Timeouts.THREE_SECONDS, 'User login text was not displayed');
        this.userLogin.click()
        this.userLogin.setValue(loginId);
    }

    /**
     * here we inserting the user name in to the textbox
     */
    public enterUserName(userName: string) {
        waitUntil(() => this.username.isExisting(), Timeouts.THREE_SECONDS, 'User name text was not displayed');
        this.username.click();
        this.username.setValue(userName);
    }

    /**
     * here we inserting the user password in to the textbox
     */
    public enterUserPassword(pwd: string) {
        waitUntil(() => this.userPassword.isExisting(), Timeouts.THREE_SECONDS, 'User passoword text was not displayed');
        this.userPassword.click();
        this.userPassword.setValue(pwd);
    }

    /**
    * here we inserting the user email in to the textbox
    */
    public enterUserEmail(email: string) {
        waitUntil(() => this.userEmail.isExisting(), Timeouts.THREE_SECONDS, 'User Email text was not displayed');
        this.userEmail.click();
        this.userEmail.setValue(email);
    }

    /**
    * here we inserting the user country name in to the textbox
    */
    public enterUserCountry(coountryName: string) {
        waitUntil(() => this.userCountry.isExisting(), Timeouts.THREE_SECONDS, 'User country name text was not displayed');
        this.userCountry.click();
        const country = this.getTextCountryName(coountryName);
        country.click();
    }

    public getTextCountryName(text) {
        browser.pause(3000);
        const elements = this.userCountryOptions;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim()
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }


    /**
    * here we inserting the user level from the dropdown
    */
    public enterUserLevel(userLevel: string) {
        waitUntil(() => this.userLevelButton.isExisting(), Timeouts.THREE_SECONDS, 'User level text was not displayed');
        this.userLevelButton.click();
        const country = this.getUserLevelText(userLevel);
        country.click();
    }

    public getUserLevelText(text) {
        browser.pause(3000);
        const elements = this.userLevelOptions;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim()
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

    /**
    * here we inserting the user role choice from checkbox button
    */
    public enterUserRole(userRole: string) {
        const country = this.getUserCheckBoxsText(userRole);
        country.click();
    }

    public getUserCheckBoxsText(text) {
        browser.pause(3000);
        const elements = this.customCheckbox;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim()
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }


    /**
    * here we inserting the user thematic from checkbox button
    */
    public enterUserThematicChoice(thematic: string) {
        const country = this.getUserCheckBoxsText(thematic);
        country.click();
    }

    /**
     * checking weather add new user button is existing or not
     */
    public isAddThisUserButtonExisting(): boolean {
        return waitUntil(() => this.addthisUserButton.isExisting(), Timeouts.THREE_SECONDS, 'Add new user button was not displayed');
    }

    /**
     * here click on Add this user button for page validation
     */
    public clickOnAddThisUserButton() {
        waitUntil(() => this.addthisUserButton.isExisting(), Timeouts.THREE_SECONDS, 'Add new user button was not displayed');
        this.addthisUserButton.click();
    }

    /**
     * Checking weather table headers texts are displaying or not
     */
    public isTableHeadersExisting(): boolean {
        return waitUntil(() => this.tabelHeader[0].isExisting(), Timeouts.THREE_SECONDS, 'Table header was not displayed');
    }

    /**
     * 
     * @param userName 
     * Here we are using search filter for search user
     */
    public enterUserForSearch(userName: string) {
        waitUntil(() => this.searchButton.isExisting(), Timeouts.THREE_SECONDS, 'Search box was not displayed');
        this.searchButton.click()
        this.searchButton.setValue(userName);
        browser.pause(2000);
    }

    /**
     * 
     * @param userName 
     * 
     */
    public isUserNameExistingAndDisplaying(userName): boolean {
        waitUntil(() => this.tabelColumn[1].isExisting(), Timeouts.THREE_SECONDS, 'User name was not displayed');
        const name = this.tabelColumn[1].getText().trim();
        if (name === userName) {
            return true;
        }
    }

    /**
     * 
     * @param text 
     * 
     */
    public selectActionOption(text: string) {
        waitUntil(() => this.columnAction[0].isExisting(), Timeouts.THREE_SECONDS, 'Action options was not displayed');
        const actionOption = this.getActionOptionText(text);
        actionOption.click();
    }

    public getActionOptionText(text) {
        const elements = this.columnAction;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getAttribute('title').trim();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

    /**
     * here we inserting edit the user login in to the textbox
     */
    public editUserLogin(loginId: string) {
        waitUntil(() => this.username.isExisting(), Timeouts.THREE_SECONDS, 'Editing name text boxwas not displayed');
        this.username.clearValue()
        this.username.setValue(loginId);
    }

    /**
     * here click on update user button for page validation
     */
    public clickOnUpdateUserButton() {
        waitUntil(() => this.updateButton.isExisting(), Timeouts.THREE_SECONDS, 'Updated user button was not displayed');
        this.updateButton.click();
    }

     /**
     * 
     * @param userName 
     * Here we are using search filter for search user
     */
    public updateSearchUser(userName: string) {
        waitUntil(() => this.searchButton.isExisting(), Timeouts.THREE_SECONDS, 'Search box was not displayed');
        this.searchButton.clearValue();
        this.searchButton.setValue(userName);
        browser.pause(2000);
    }

    /**
     * checking weather delete panel is displaying or not
     */
    public isDeletePanelExisting(): boolean {
        return waitUntil(() => this.deletePanel.isExisting(), Timeouts.THREE_SECONDS, 'Delete penel was not displayed');
    }

    /**
     * Click on delete Yes validation button
     */
    public clickOnDeleteYesButton() {
        waitUntil(() => this.deleteYesButton.isExisting(), Timeouts.THREE_SECONDS, 'Delete the yes button was not displayed');
        this.deleteYesButton.click();
    }
    

}
