import { Timeouts } from '../../../infra/enum/timeouts';
import { waitUntil } from '../../../infra/waiter/wait';
import { BasePage } from '../base-Page';


export class Abtest extends BasePage {

    private get shadowThreeDots() { return $('.my-5') }

    private get threeDots() { return this.shadowThreeDots.shadow$('#three-dot-loader') }

    private get newCompaign() { return $('.filters-form .right .page-title a') }

    private get abtestStepTitile() { return $$('.show-outside .wrapper-box-title div') }

    private get informationFields() { return $$('#app .show-outside .box-padding .form .wrapper-field') }

    private get searchFilter() { return $('#app .main .container .right .input-search input') }

    private get firstRowTitle() { return $('tbody tr td .td-video .cursor-link span') };

    private get postDetailTitle() { return $('#app .campaign-title') }

    private get postDetailPagePostTitle() { return $$('tbody tr td .info_channel .td-video .link_post') }

    private get abTestSideBar() { return $('#app .abSideBar') }

    private get graphCheckBox() { return $$('#app .abSideBar .checkbox-group input') }

    private get graphCanvas() { return $$('#app .abSideBar .graph canvas') }

    private get validationButton() { return $$('.form .btn-block') }

    private get inputFile() { return $$('.dz-hidden-input') }

    private get upleadItemTitle() { return $$('.dz-filename span') }

    private get tagLineInputBox() { return $('.wrapper-field .tagline textarea') }

    //private get finalStepValidator() { return $('//button[contains(text(),"Create Campaign")]') }

    private get finalStepValidator() { return $$('.box-padding .btn-block') }

    private get postTitles() { return $$('tbody tr td .adapt-width .td-video .link_post span') }

    private get dropDownFilter() { return $$('#app .main .container .right div select') }

    private get tableHeader() { return $$('.box-table thead tr th div span') }

    private get leaderTag() { return $$('#app tbody tr td div .td-video .leader') }

    private get sideBarLeaderTag() { return $('.abSideBar .top-block-infos .leader') }

    private get graphNotice() { return $('.flex-column .greenScore div') }

    private get statusColumn() { return $$('tbody tr td .link') }

    private get rejectinPop() { return $('.popin-mask .popin .popin-content') }

    private get rejectinPopText() { return $$('.popin-mask .popin .popin-content .content .rejected span') }

    private get oKPopButton() { return $('.popin-mask .popin .popin-content .btn-block') }

    private get abtestStatusColumn() { return $$('tbody tr td .field-string') }

    private get abtestFilledValue() { return $$('.box-padding .form .wrapper-field') }

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

    /**
     * here returning the new ab test button text
     */
    public getNewButtonText(): string {
        waitUntil(() => this.newCompaign.isExisting(), Timeouts.TEN_SECONDS, 'New compaign button was not displaying');
        return this.newCompaign.getText().trim();
    }


    /**
     * here we are click on the new compaign button
     */
    public clickNewCompaignButton() {
        waitUntil(() => this.newCompaign.isExisting(), Timeouts.TEN_SECONDS, 'New compaign button was not displaying');
        this.newCompaign.click();
    }

    /**
     * check weather new compaign information tab is displaying or not
     */
    public isNewCompaignPanelOpened(): boolean {
        return waitUntil(() => this.abtestStepTitile[0].isExisting(), Timeouts.TEN_SECONDS, 'New compaign button panel was not displaying');
    }

    /**
     * 
     * @param name 
     * here entering the compaign name in the text box
     */
    public enterCampaignName(name: string) {
        waitUntil(() => this.informationFields[0].isExisting(), Timeouts.TEN_SECONDS, 'Campaign name text box was not displayed');
        this.informationFields[0].$('#campaign-name').click();
        this.informationFields[0].$('#campaign-name').setValue(name);
    }

    /**
     * 
     * @param pageName 
     * here entering on page name from the dropdown list
     */
    public selectCampaignPage(pageName: string) {
        const label = 'Page';
        waitUntil(() => this.informationFields[2].isExisting(), Timeouts.TEN_SECONDS, 'Campaign page dropdown name was not displayed');
        this.informationFields[2].$('.multiselect-placeholder span').click();
        this.informationFields[2].$('.multiselect-options .search input').click();
        this.informationFields[2].$('.multiselect-options .search input').setValue(pageName);
        const pageNames = this.getPageNameText(pageName, label);
        pageNames.click();
    }

    public getPageNameText(text, label) {
        const elements = this.informationFields;
        const visibleItem = elements.find((item) => item.$('label').getText().includes(label))
        const visibleCheckboxes = visibleItem.$$('.multiselect .multiselect-options .multiselect-options-wrapper div label');
        const checkBoxToClick = visibleCheckboxes.find((checkboxItem) => {
            return checkboxItem.getText() === text;
        })
        if (checkBoxToClick === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return checkBoxToClick;
    }

    /**
     * 
     * @param pageName 
     * here entering the audience name from the dropdown list
     */
    public selectCampaignAudience(campaignName: string) {
        const label = 'Audience';
        waitUntil(() => this.informationFields[3].isExisting(), Timeouts.TEN_SECONDS, 'Campaign page dropdown name was not displayed');
        this.informationFields[3].click();
        this.informationFields[3].$('.multiselect-options .search input').click();
        this.informationFields[3].$('.multiselect-options .search input').setValue(campaignName);
        browser.pause(3000);
        const pageNames = this.getPageNameText(campaignName, label);
        pageNames.click();
    }

    /**
     * 
     * @param geoLocation 
     * here entering the geolocation on the dropdown
     */
    public selectCampaignGeolocation(geoLocation: string) {
        const label = 'Geolocation';
        waitUntil(() => this.informationFields[4].isExisting(), Timeouts.TEN_SECONDS, 'Campaign page dropdown name was not displayed');
        this.informationFields[4].click();
        this.informationFields[4].$('.multiselect-options .search input').click();
        this.informationFields[4].$('.multiselect-options .search input').setValue(geoLocation);
        const pageNames = this.getPageNameText(geoLocation, label);
        pageNames.click();
    }

    /**
     * here click on toggle button
     */
    public selectCampaignNewCreatorTestingToggle() {
        waitUntil(() => this.informationFields[5].isExisting(), Timeouts.TEN_SECONDS, 'Toggle slider was not displayed');
        this.informationFields[5].$('.switch .slider').click();
    }

    /**
     * here we are returning url for toggle
     */
    public getToggleTextURL(): string {
        waitUntil(() => this.informationFields[5].isExisting(), Timeouts.TEN_SECONDS, 'Toggle URL was  was not displayed');
        return this.informationFields[5].$('div.tag-info .desc').getText();
    }

    /**
     * 
     * @param txt 
     * here entering the url to textbox in new creator testings
     */
    public enterTextToggleURL(txt: string) {
        waitUntil(() => this.informationFields[5].isExisting(), Timeouts.TEN_SECONDS, 'Count not enter the text the toggle text box');
        this.informationFields[5].$('#campaign-name').click();
        this.informationFields[5].$('#campaign-name').setValue(txt);
    }

    /**
     * checking weather validation button is enabled or not
     */
    public isValidationInfoButtonEnabled(): boolean {
        waitUntil(() => this.validationButton[0].isExisting(), Timeouts.TEN_SECONDS, 'Validation button was not displayed');
        if (this.validationButton[0].getAttribute('style') === '') {
            return true
        }
    }

    /**
     * Click on validation infromation button
     */
    public clickOnValidationButton() {
        this.validationButton[0].click();
    }


    /**
     * Second step title was not displaying
     */
    public isInformationTabsExisting(): boolean {
        return waitUntil(() => this.abtestStepTitile[1].isExisting(), Timeouts.TEN_SECONDS, 'Step 2 title was not displaying');
    }

    /**
     * Checking input file field existing or not
     */
    public getInputFile() {
        waitUntil(() => this.inputFile[0].isExisting(), Timeouts.THREE_SECONDS, 'Input file was not displaying');
        return this.inputFile[0];
    }

    /**
     * 
     * @param text 
     * seting the input values for dropdown fields
     */
    public setInputTextValue(text: string) {
        this.inputFile[0].setValue(text);
    }


    /**
     * returning video text values after the upload
     */
    public getVideoTitle(): string {
        return this.upleadItemTitle[0].getText();
    }

    /**
     * returning thumbnail text values after the upload
     */
    public getThumbnailText(): string {
        waitUntil(() => this.upleadItemTitle[1].isExisting(), Timeouts.THREE_SECONDS, 'Thumbnail title was not displaying');
        return this.upleadItemTitle[1].getText();
    }

    /**
     * 
     * @param tags 
     * Entering the tag line input field
     */
    public enterTagLineInput(tags: string) {
        waitUntil(() => this.tagLineInputBox.isExisting(), Timeouts.FIVE_SECONDS, 'input text was not displaying');
        this.tagLineInputBox.click()
        this.tagLineInputBox.setValue(tags);
    }

    /**
     * checking validation button enabled (second step)
     */
    public isSecondStepValidationButtonEnabled(): boolean {
        waitUntil(() => this.validationButton[2].isExisting(), Timeouts.TEN_SECONDS, 'Validation button was not displayed');
        if (this.validationButton[2].getAttribute('style') === '') {
            return true
        }
    }

    /**
     * click on the 3rd step validator
     */
    public clickOnValidationFileButton() {
        waitUntil(() => this.validationButton[2].isExisting(), Timeouts.TEN_SECONDS, 'Validation button was not displayed');
        this.validationButton[2].click();
    }

    /**
     * click on the final step validator
     */
    public clickOnCombinationValidationFile() {
        waitUntil(() => this.finalStepValidator[3].isExisting(), Timeouts.TEN_SECONDS, 'Validation button was not displayed');
        this.finalStepValidator[3].click();
    }

    /**
     * third step title was not displaying
     */
    public isCombinationTabsExisting(): boolean {
        return waitUntil(() => this.abtestStepTitile[2].isExisting(), Timeouts.TEN_SECONDS, 'Step 2 title was not displaying');
    }


    /**
     * 
     * @param postName 
     * seaching the ab test post on search filter
     */
    public searchAbtestPost(postName: string) {
        waitUntil(() => this.searchFilter.isExisting(), Timeouts.TEN_SECONDS, 'Search filter was not displayed');
        this.searchFilter.click();
        this.searchFilter.setValue(postName)
        browser.keys("\uE007");
    }

    /**
     * returning here post title
     */
    public getPostTitle(): string {
        waitUntil(() => this.firstRowTitle.isExisting(), Timeouts.TEN_SECONDS, 'Post was not displaying');
        return this.firstRowTitle.getText();
    }

    /**
     * clicking on post for ab test
     */
    public clickOnAbTestPost() {
        waitUntil(() => this.firstRowTitle.isExisting(), Timeouts.TEN_SECONDS, 'Post was not displaying');
        this.firstRowTitle.click();
        browser.switchWindow('https://core-preprod.jellysmack.com/#/detail/18478')
    }

    /**
     * here returning post detail title
     */
    public getDetailPostTitle(): string {
        waitUntil(() => this.postDetailTitle.isExisting(), Timeouts.TEN_SECONDS, 'Post was not displaying');
        return this.postDetailTitle.getText();
    }

    /**
     * here click on title for ab test posts
     */
    public clickOnAbtestPost() {
        waitUntil(() => this.postDetailPagePostTitle[0].isExisting(), Timeouts.TEN_SECONDS, 'Post was not displaying');
        return this.postDetailPagePostTitle[0].click();
    }

    /**
     * returning side bar for ab test is existing or not
     */
    public isAbTestSideBarExisting(): boolean {
        return waitUntil(() => this.abTestSideBar.isExisting(), Timeouts.FIVE_SECONDS, 'side bar was not displayed');
    }

    /**
     * returing here weather absolute graph is checked or not
     */
    public isAbsoluteCheckBoxChecked(): boolean {
        const status = this.graphCheckBox[0].getProperty('checked');
        if (status === true) {
            return true
        }
    }

    /**
     * returing here weather relative graph is checked or not
     */
    public isRelativeCheckBoxChecked(): boolean {
        const status = this.graphCheckBox[1].getProperty('checked');
        if (status === true) {
            return true
        }
    }

    /**
     * checking absolute graph is displaying or not
     */
    public isAbsoluteGraphDisplaying(): boolean {
        const relativeGraph = this.graphCanvas[1].getAttribute('style');
        if (relativeGraph === 'display: none;') {
            return true;
        }
    }

    /**
     * checking relative graph is displaying or not
     */
    public isRelativeGraphDisplaying(): boolean {
        const absoluteGraph = this.graphCanvas[0].getAttribute('style');
        if (absoluteGraph === 'display: none; height: 213px; width: 427px;') {
            return true;
        }
    }


    /**
     * 
     * @param typeGraph 
     * selecting the graph text wise
     */
    public selectGraphCheckBox(typeGraph: string) {
        const postTime = this.getGraohTypeText(typeGraph);
        postTime.click();
    }

    public getGraohTypeText(typeGraph) {
        waitUntil(() => this.graphCheckBox[1].isExisting(), Timeouts.THREE_SECONDS, 'Graph type checkbox was not displyed');
        const elements = this.graphCheckBox;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getAttribute('Id');
            return itemByTexts === `${typeGraph}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${typeGraph}`);
        }
        return itemByText;
    }

    /**
     * returning list post title names
     */
    public abtestPostTitles(): string[] {
        browser.pause(5000);
        waitUntil(() => this.postTitles[0].isExisting(), Timeouts.THREE_SECONDS, 'Filter div was not displayed');
        return this.postTitles.map((cell) => {
            return cell.getText();
        });
    }

    /**
     * here select the status filter for abtest
     */
    public selectStatusFilterOption(filterOption: string) {
        const typePage = "status";
        waitUntil(() => this.dropDownFilter[2].isExisting(), Timeouts.THREE_SECONDS, 'Status filter was not existing');
        this.dropDownFilter[2].click();
        const options = this.getFilterOptions(filterOption, typePage);
        options.click();
        this.waitTillTableReloads();
    }

    /**
     * 
     * @param option 
     * checking filter options
     */
    public getFilterOptions(text, typeFilter) {
        waitUntil(() => this.dropDownFilter[2].isExisting(), Timeouts.THREE_SECONDS, 'Filter div was not displayed');
        const elements = this.dropDownFilter;
        const visibleItem = elements.find((item) => item.getAttribute('class').includes(typeFilter))
        const visibleCheckboxes = visibleItem.$$('option');
        const checkBoxToClick = visibleCheckboxes.find((checkboxItem) => {
            const ss = checkboxItem.getText().trim();
            return checkboxItem.getText().trim() === `${text}`;
        })
        if (checkBoxToClick === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return checkBoxToClick;
    }

    /**
     * 
     * @param headerName 
     * Click on the table header 
     */
    public selectTableHeader(headerName: string) {
        waitUntil(() => this.tableHeader[0].isExisting(), Timeouts.THREE_SECONDS, 'Table header text was not displayed');
        const options = this.getTableHeaderOptions(headerName);
        options.click();
    }

    /**
     * 
     * @param option 
     * here returning table header texts
     */
    public getTableHeaderOptions(option) {
        waitUntil(() => this.tableHeader[0].isExisting(), Timeouts.THREE_SECONDS, 'Table header text was not displayed');
        const elements = this.tableHeader;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim();
            return itemByTexts === `${option}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${option}`);
        }
        return itemByText;
    }

    /**
     * 
     * @param leader 
     * returing leader text from the rows
     */
    public isLeaderTagExisting(leader: string): boolean {
        const elements = this.leaderTag;
        const isPostIconExisting = elements.find((item) => {
            return item.getText().trim() === `${leader}`
        });
        return isPostIconExisting.isExisting();
    }

    /**
     * checking side bar has leader tag is displaying or not
     */
    public isSideBarLeaderTagExisting(): boolean {
        return waitUntil(() => this.sideBarLeaderTag.isExisting(), Timeouts.THREE_SECONDS, 'Leader tag was not displayed');
    }

    /**
     * 
     * @param text 
     * here returning 
     */
    public isGraphDetailTextExisting(text: string): boolean {
        waitUntil(() => this.graphNotice.isExisting(), Timeouts.THREE_SECONDS, 'Graph notice was not displayed');
        const msg = this.graphNotice.getText();
        if (msg.includes(text)) {
            return true;
        }
    }

    /**
     * here click on rejection button from the table row
     */
    public clickOnRejectionButton() {
        waitUntil(() => this.statusColumn[0].isExisting(), Timeouts.THREE_SECONDS, 'Rejection button was not displaying the row');
        this.statusColumn[0].click();
    }

    /**
     * checking pop has text message displaying or not
     */
    public isRejectionPopTextExisting(): boolean {
        waitUntil(() => this.rejectinPopText[0].isExisting(), Timeouts.THREE_SECONDS, 'Pop up was not displaying');
        const elements = this.rejectinPopText;
        const isPostIconExisting = elements.find((item) => {
            return item.getText().trim() !== ''
        });
        return isPostIconExisting.isExisting();
    }

    /**
     * click on pop up Ok button for validation
     */
    public clickOnPopUpButton() {
        waitUntil(() => this.oKPopButton.isExisting(), Timeouts.THREE_SECONDS, 'Rejection OK was not displaying the row');
        this.oKPopButton.click();
    }

    /**
     * Checking pop is displaying or not
     */
    public isRejectedPopUpExisting(): boolean {
        return this.rejectinPop.isDisplayed();
    }

    /**
     * here we are returning abtest post staus text values as status
     */
    public abtestPostStatusValues(): string[] {
        browser.pause(5000);
        waitUntil(() => this.abtestStatusColumn[0].isExisting(), Timeouts.THREE_SECONDS, 'Ab test status column values are not displalying');
        return this.abtestStatusColumn.map((cell) => {
            return cell.getText();
        });
    }

    /**
     * 
     * @param text 
     * checking page dropdown selected values
     */
    public isAbtestPageValueDispalying(text: string): boolean {
        waitUntil(() => this.abtestFilledValue[2].isExisting(), Timeouts.THREE_SECONDS, 'page values are not displalying');
        const page = this.abtestFilledValue[2].$('.multiselect-checked').getText().trim();
        if (page === `${text}`){
            return true;
        }
    }

    /**
     * 
     * @param text 
     * checking audiance dropdown selected values
     */
    public isAbtestAudianceValueDispalying(text: string): boolean {
        waitUntil(() => this.abtestFilledValue[3].isExisting(), Timeouts.THREE_SECONDS, 'Audiance values are not displalying');
        const page = this.abtestFilledValue[3].$('.multiselect-checked').getText().trim();
        if (page === `${text}`){
            return true;
        }
    }

    /**
     * 
     * @param text 
     * checking geolocatiion dropdown selected values
     */
    public isAbtestGeoLocationValueDispalying(text: string): boolean {
        waitUntil(() => this.abtestFilledValue[4].isExisting(), Timeouts.THREE_SECONDS, 'Geo location values are not displalying');
        const page = this.abtestFilledValue[4].$('.multiselect-checked').getText().trim();
        if (page === `${text}`){
            return true;
        }
    }

}