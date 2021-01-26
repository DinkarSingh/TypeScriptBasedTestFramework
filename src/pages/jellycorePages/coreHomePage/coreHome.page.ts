import { Timeouts } from '../../../infra/enum/timeouts';
import { waitUntil } from '../../../infra/waiter/wait';
import { BasePage } from '../base-Page';


export class CoreHomePage extends BasePage {

    constructor() {
        super();
        this.relativeUrl = '/#/dashboard';
    }

    private get shadowThreeDots() { return $('.my-5') }

    private get threeDots() { return this.shadowThreeDots.shadow$('#three-dot-loader') }

    private get btnNewPost() { return $('[data-cy="new_post_button"]') }

    private get mainMenu() { return $$('.menu li a') }

    private get logoutButton() { return $('.header-wrapper  a div') }

    private get smashPerf() { return $$('.monthPerf .smashAnalytics .link') }

    private get smashPopUp() { return $('//span[contains(text(), "How are smashes defined ?")]') }

    private get bonusPopUp() { return $('//span[contains(text(), "How are bonuses calculated")]') }

    private get smashMonth() { return $('.smashHeader .select select') }

    private get smashMonthOptions() { return $$('.smashHeader .select select option') }

    private get jellysmackMonth() { return $$('.topEditors .editors .name') }

    private get creatorProgramOptions() { return $$('.smashDashboard .multiselect .multiselect-options .select-values div label') }

    private get creatorProgramStatus() { return $('.smashDashboard .multiselect .multiselect-placeholder') }

    private get smashBonusChange() { return $$('.bonusChange .definition p') }

    private get optionButton() { return $$('.action-position .action-button') }

    private get optionLoeadPop() { return $('#app .action-unavailable') }

    private get popUpOtions() { return $$('#app .action-button .item-action span') }

    private get deSmashValidationButton() { return $('//a[contains(text(), "Confirm")]') }

    public isPageLoaded(): boolean {
        return waitUntil(() => this.btnNewPost.isExisting(), Timeouts.TEN_SECONDS, 'Home page was not loaded')
    }

    public isThreeDostExisting(): boolean {
        return this.threeDots.isExisting();
    }

    public isTableLoaded(): boolean {
        return !this.isThreeDostExisting();
    }

    public waitTillTableReloads(): boolean {
        return waitUntil(() => this.isTableLoaded(), Timeouts.TEN_SECONDS, 'Table is not loaded, three dot is visible');
    }

    public clickOnNewPost() {
        const runInBrowser = function (argument) {
            const ss = argument.click();
        };
        const elementToClickOn = browser.$('[data-cy="new_post_button"]');
        browser.execute(runInBrowser, elementToClickOn);
    }

    public isNewPostDisplaying(): boolean {
        return waitUntil(() => this.btnNewPost.isExisting(), Timeouts.THREE_SECONDS, 'New post button was not displaying');
    }

    public getNewPostButtonText(): string {
        waitUntil(() => this.btnNewPost.isExisting(), Timeouts.FIVE_SECONDS, 'New post button was not displaying');
        const button = this.btnNewPost.getText();
        this.logger.info(`new post button text ${button}`)
        return button;
    }

    public getMenuMenuValues(): string[] {
        waitUntil(() => this.mainMenu[0].isExisting(), Timeouts.THREE_SECONDS, 'Main menu list was not displaying');
        return this.mainMenu.map((cell) => {
            return cell.getText();
        });
    }

    public getMenuText(text) {
        const elements = this.mainMenu;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text} in main menu list`);
        }
        return itemByText;
    }

    public selectManuBar(text: string) {
        waitUntil(() => this.btnNewPost.isExisting(), Timeouts.FORTY_SECONDS, 'Main menu was not displaying');
        const menuOption = this.getMenuText(text);
        this.logger.info(`Selected menu name ${menuOption}`);
        menuOption.click();
    }

    public isMenuSelected(text: string): boolean {
        browser.pause(3000);
        waitUntil(() => this.mainMenu[0].isExisting(), Timeouts.THREE_SECONDS, 'Main menu list was not displaying');
        const menuOption = this.getMenuText(text);
        return menuOption.getAttribute('class').includes('active')
    }

    /**
     * Checking the weather logout button existing or not
     */
    public isLogoutButtonExisting(): boolean {
        return waitUntil(() => this.logoutButton.isExisting(), Timeouts.TEN_SECONDS, 'Logout button was not displayed');
    }

    /**
     * Here click on logout button in home page
     */
    public clickOnLogoutButton() {
        waitUntil(() => this.logoutButton.isExisting(), Timeouts.TEN_SECONDS, 'Logout button was not displayed');
        this.logoutButton.click();
    }

    /**
     * here click on smash how to define
     */
    public clickOnSmashDefine() {
        waitUntil(() => this.smashPerf[0].isExisting(), Timeouts.TEN_SECONDS, 'Smash define button was not displaying');
        this.smashPerf[0].click();
    }

    /**
    * here click on bonus how to define
    */
    public clickOnBonusDefine() {
        waitUntil(() => this.smashPerf[1].isExisting(), Timeouts.TEN_SECONDS, 'Bonus define button was not displaying');
        this.smashPerf[1].click();
    }

    /**
     * checking smash definition pop up is displaying or not
     */
    public isSmashDefinePopUpExisting(): boolean {
        return waitUntil(() => this.smashPopUp.isExisting(), Timeouts.TEN_SECONDS, 'Smash definition pop up was not displaying');
    }

    /**
     * checking bonus pop up is displaying or not
     */
    public isBonusPopUpExisting(): boolean {
        return waitUntil(() => this.bonusPopUp.isExisting(), Timeouts.TEN_SECONDS, 'Bonus pop up was not displaying');
    }

    /**
     * click on smash month dropdown button
     */
    public clickOnSmashMonthDropdown() {
        waitUntil(() => this.smashMonth.isExisting(), Timeouts.TEN_SECONDS, 'Smash month dropdown was not displaying');
        this.smashMonth.click();
    }

    public getSmashMonthOptionsText(text) {
        const elements = this.smashMonthOptions;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text} in main menu list`);
        }
        return itemByText;
    }

    /**
     * 
     * @param text 
     * here we are selecting smash month
     */
    public selectSmashMonth(text: string) {
        browser.pause(2000);
        const options = this.getSmashMonthOptionsText(text);
        options.click();
    }

    /**
     * Checking jellysmacker of the month list existing or not
     */
    public isJellysmackMonthExisting(): boolean {
        browser.pause(3000);
        const jellysmacker = this.jellysmackMonth;
        const isJellysmackerExisting = jellysmacker.every(row => {
            let columnValue = row.getText();
            return row.getText() !== ''
        });
        return isJellysmackerExisting;
    }


    public getCreatorProgramsText(text) {
        const elements = this.creatorProgramOptions;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text} in main menu list`);
        }
        return itemByText;
    }

    /**
     * 
     * @param text 
     * here we are selecting smash month
     */
    public selectCreatorProgram(text: string) {
        waitUntil(() => this.creatorProgramStatus.isExisting(), Timeouts.TEN_SECONDS, 'Creator program dropdown was not existing');
        this.creatorProgramStatus.click();
        const options = this.getCreatorProgramsText(text);
        options.click();
    }

    /**
     * 
     * @param name 
     * creator program was not selected
     */
    public isCreatorProgramStatus(name: string): boolean {
        waitUntil(() => this.creatorProgramStatus.isExisting(), Timeouts.TEN_SECONDS, 'Creator program name was not selected');
        return this.creatorProgramStatus.getText() === `${name}`;
    }

    /**
     * SmashBonusChange existing or not
     */
    public isSmashBonusChangeExisting(): boolean {
        const isSmashBouns = this.smashBonusChange.every(row => {
            let columnValue = row.getText();
            return row.getText().trim() !== ''
        });
        return isSmashBouns;

    }

        /**
     * Option loading option
     */
    public isLoadOptionExisting(): boolean {
        return this.optionLoeadPop.isExisting();
    }

    public isTableLoadDisplyed(): boolean {
        return !this.isLoadOptionExisting();
    }

    public waitTillOptionLoadReloads(): boolean {
        return waitUntil(() => this.isTableLoadDisplyed(), Timeouts.TEN_SECONDS, 'Table is not loaded, three dot is visible');
    }

    /**
     * Here click on table option
     */
    public ClickOnTableOptionButton() {
        waitUntil(() => this.optionButton[0].isExisting(), Timeouts.FORTY_SECONDS, 'Table header was not displaying');
        this.optionButton[0].click();
        waitUntil(() => this.waitTillOptionLoadReloads(), Timeouts.TEN_SECONDS, 'Table is not loaded, three dot is visible');
    }

    /**
     * 
     * @param popUpOption 
     * Select the smash table options as retagged
     */
    public selectPopUpOptions(popUpOption: string) {
        const status = this.getPopUpOptionText(popUpOption);
        status.click();
        browser.switchWindow('https://redrocket-preprod.jellysmack.com/retagger')
    }

    /**
     * 
     * @param popUpOption 
     * Select the options 
     */
    public selectDeSmash(popUpOption: string) {
        const status = this.getPopUpOptionText(popUpOption);
        status.click();
    }

    public getPopUpOptionText(text) {
        const elements = this.popUpOtions;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

    /**
     * Checking Retagged page title existing or not
     */
    public isRetaggedPageTitleExisting(): boolean {
        const pageTitle =  browser.getTitle();
        if(pageTitle !== ''){
            return true;
        }
    }


    /**
     * Checking de smash validation button existing or not
     */
    public isDeSmashValidationButtonExisting(): boolean {
        return waitUntil(() => this.deSmashValidationButton.isExisting(), Timeouts.TEN_SECONDS, 'Not a smash validation button was not displaying');
    }

}
