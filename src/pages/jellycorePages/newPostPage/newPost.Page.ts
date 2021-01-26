import { Timeouts } from '../../../infra/enum/timeouts';
import {BaseComponent} from '../../../infra/models/base-compents';
import { waitUntil } from '../../../infra/waiter/wait';

export class NewPostPage extends BaseComponent {

    private get formatLabel() { return $('//*[contains(text(),"Choose format")]') }

    private get btnVideo() { return $('//*[@id="edge"]/span') }

    private get chooseFormat() { return $$('.content-choice a') }   

    private get postTitle() { return $('//p[contains(text(),"Post")]') }

    private get inputFile() { return $$('.dz-hidden-input')[0] }

    private get videoTitle() { return $$('.dz-filename span')[0] }

    private get inputFields() { return $$('.upload-content .bloc-upload input') } 

    private get textAreaFields() { return $$('.upload-content .bloc-upload textarea') }

    private get nameOfShowTags() { return $$ ('.upload-content .bloc-upload a') }

    private get nameOfShowExisting() { return $$ ('.upload-content .bloc-upload  span') }

    private get videoTitleTextBox() { return $$('.bloc-upload input')[1] }

    private get thumbnail() { return $$('.dz-hidden-input')[0] }

    private get thumbnailTitle() { return $$('.dz-filename span')[1] }

    private get validatePost() { return $$('.activated-btn') }

    private get validateInfo() { return $('//a[contains(text(), "Validate Information")]') }

    private get categorisationTitle() { return $('//p[contains(text(),"Categorisation")]') }

    private get categorisationDropdownsArrow() { return $$('.form-block .multiselect span.multiselect-default') }

    private get categorisationDropdownsLists() { return $$('.form-block .multiselect .multiselect-options .multiselect-options-wrapper .multiselect-options-item') }

    private get categorisationDropdowns() { return $$('.multiselect-checked') }

    private get postLabelText() { return $$('.bloc-upload label') }

    private get selectedTag() { return $$('.label-success') }

    private get btnTrending() { return $('#trend1') }

    private get talents() { return $$('.videos_edge input') }

    private get talentsTags() { return $$('#detailtalent a') }

    private get tagsSearchBox() { return $$('.videos_edge div a') }

    private get setupTitle() { return $('//p[contains(text(),"Setup")]') }

    private get chennelSelection() { return $$('.step4-content .content .form-block .fbpageContainer .fbpageContent fieldset div label') }

    private get validationTitle() { return $('//p[contains(text(),"Validation")]') }

    private get validationDropdown() { return $$('.chosen-transparent') }

    private get validationDropdownOptions() { return $$('.chosen-transparent option') }

    private get videoOwner() { return $('//*[@id="step5"]/div[1]/div/div[2]/div/div[2]/select[2]/option[3]') }


    public getFormatLabelText(): string {
        waitUntil(() => this.formatLabel.isExisting(), Timeouts.THREE_SECONDS, 'Format label was not displaying');
        const formatLabel = this.formatLabel.getText();
        this.logger.info(`format label ${formatLabel}`)
        return formatLabel;
    }

    public getPostTitleText(): string {
        waitUntil(() => this.postTitle.isExisting(), Timeouts.THREE_SECONDS, 'Post title was not displaying on the top of the page');
        return this.postTitle.getText();
    }

    public selectShowFormat() {
        waitUntil(() => this.chooseFormat[1].isExisting(), Timeouts.THREE_SECONDS, 'Video title was not displaying');
        this.chooseFormat[1].click();
    }

    public selectVideoFormat() {
        waitUntil(() => this.chooseFormat[0].isExisting(), Timeouts.THREE_SECONDS, 'Video title was not displaying');
        this.chooseFormat[0].click();
    }

    public getInputFile() {
        waitUntil(() => this.inputFile.isExisting(), Timeouts.THREE_SECONDS, 'Input file was not displaying');
        return this.inputFile;
    }

    public setVideoTextValue(text: string) {
        this.inputFile.setValue(text);
    }

    public isVideoButtonDisplaying(): boolean {
        return this.btnVideo.isDisplayed();
    }

    public getVideoTitle(): string {
        return this.videoTitle.getText();
    }

    public enterProductId(productID: string) {
        waitUntil(() => this.inputFields[0].isExisting(), Timeouts.THREE_SECONDS, 'Product id was not displaying');
        this.inputFields[0].click();
        this.inputFields[0].setValue(productID);
    }

    public isProductionIdDisplaying(): boolean {
        return this.inputFields[0].isDisplayed();
    }

    public enterStatusTextBox(status) {
        waitUntil(() => this.textAreaFields[0].isExisting(), Timeouts.THREE_SECONDS, 'Status text box was not displaying');
        this.textAreaFields[0].click();
        this.textAreaFields[0].setValue(status);
    }

    public isStatusDisplaying(): boolean {
        return this.textAreaFields[0].isDisplayed();
    }

    public enterNameOfShow(showName: string) { 
        waitUntil(() => this.postLabelText[2].isExisting(), Timeouts.THREE_SECONDS, 'Post label text was not displayed');
        this.postLabelText[2].scrollIntoView();
        waitUntil(() => this.inputFields[1].isExisting(), Timeouts.THREE_SECONDS, 'Name of the show text box was not displaying');
        this.inputFields[1].click();
        browser.pause(1000);
        this.inputFields[1].setValue(showName);
        // const itemByText = this.getNameOfShwoByText(showTag);
        // itemByText.click();
        waitUntil(() => this.nameOfShowTags[1].isExisting(), Timeouts.THREE_SECONDS, 'tags options was not displayed');
        this.nameOfShowTags[2].click();
    }

    public getNameOfShwoByText(text) {
        waitUntil(() => this.nameOfShowTags[1].isExisting(), Timeouts.THREE_SECONDS, 'tags options was not displayed');
        const elements = this.nameOfShowTags;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

    public isNameOfShowExisting(showName: string): boolean {
        const elements = this.nameOfShowExisting;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText();
            return itemByTexts === `${showName}`;
        });
        return itemByText.isExisting();
    }

    public enterVideoTitle(titleName: string) {
        waitUntil(() => this.inputFields[2].isExisting(), Timeouts.THREE_SECONDS, 'Video text box was not displaying');
        this.inputFields[2].click();
        this.inputFields[2].setValue(titleName);
    }

    public isVideoTitleExisting(): boolean {
        return waitUntil(() => this.inputFields[2].isExisting(), Timeouts.THREE_SECONDS, 'Video title text values  were not deisplaying');
    }

    public getThumbnailInputFile() {
        waitUntil(() => this.thumbnail.isExisting(), Timeouts.THREE_SECONDS, 'Thumbnail input file was not displaying');
        return this.thumbnail;
    }

    public setThumbnailText(text: string) {
        waitUntil(() => this.thumbnail.isExisting(), Timeouts.THREE_SECONDS, 'Thumbnail input text was not entered');
        return this.thumbnail.setValue(text);
    }

    public getThumbnailText(): string {
        waitUntil(() => this.thumbnailTitle.isExisting(), Timeouts.THREE_SECONDS, 'Thumbnail title was not displaying');
        return this.thumbnailTitle.getText();
    }

    public clickValidateButton(text: number) {
        waitUntil(() => this.validatePost[`${text}`].isExisting(), Timeouts.THREE_SECONDS, 'Validate button was not displaying');
        this.validatePost[`${text}`].click();
    }

    public isValidateButtonDisplaying(text: string): boolean {
        waitUntil(() => this.validatePost[`${text}`].isExisting(), Timeouts.THREE_SECONDS, 'Validate button was not displaying');
        return this.validatePost[`${text}`].isDisplayed();
    }

    public getCategorisationTitleText(): string {
        waitUntil(() => this.categorisationTitle.isExisting(), Timeouts.THREE_SECONDS, 'Categorisation title was not displaying');
        return this.categorisationTitle.getText();
    }

    public enterVideoTitleTextBox(title) {
        waitUntil(() => this.videoTitleTextBox.isExisting(), Timeouts.THREE_SECONDS, 'Video title was not displaying');
        this.categorisationTitle.scrollIntoView();
        this.videoTitleTextBox.click();
        this.videoTitleTextBox.setValue(title);
    }

    public getCategorisationDropdownsText(): string {
        waitUntil(() => this.categorisationDropdowns[0].isExisting(), Timeouts.THREE_SECONDS, 'Dropdown was not selected');
        return this.categorisationDropdowns[0].getText();
    }

    public isVideoTitleDisplaying(): boolean {
        return this.videoTitleTextBox.isDisplayed();
    }

    public enterFirstCommentTextBox(title: string) {
        waitUntil(() => this.textAreaFields[1].isExisting(), Timeouts.THREE_SECONDS, 'First comment button was not clickable');
        this.textAreaFields[1].click();
        this.textAreaFields[1].setValue(title);
    }

    public isFirstCommentDisplaying(): boolean {
        return this.textAreaFields[1].isDisplayed();
    }

    public selectContentType(text: string) {
        waitUntil(() => this.categorisationDropdownsArrow[0].isExisting(), Timeouts.THREE_SECONDS, 'categorisation dropdown allow button was not clickable');
        this.categorisationDropdownsArrow[0].click();
        const itemByText = this.getItemByText(text);
        itemByText.click();
    }

    public getItemByText(text) {
        const elements = this.categorisationDropdownsLists;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

    public selectFormat(firstText, secondText) {
        waitUntil(() => this.categorisationDropdownsArrow[0].isExisting(), Timeouts.THREE_SECONDS, 'categorisation dropdown allow button was not clickable');
        this.categorisationDropdownsArrow[0].click();
        const itemByText = this.getItemByText(firstText);
        itemByText.click();
        const itemByTextSecond = this.getItemByText(secondText);
        itemByTextSecond.click();
    }

    public getSelectFormatTagText(text: string): string {
        waitUntil(() => this.categorisationDropdowns[1].isExisting(), Timeouts.THREE_SECONDS, 'Dropdown text was not displaying');
        return this.categorisationDropdowns[`${text}`].getText();
    }

    public selectTone(text: string) {
        waitUntil(() => this.categorisationDropdownsArrow[0].isExisting(), Timeouts.THREE_SECONDS, 'categorisation dropdown allow button was not clickable');
        this.categorisationDropdownsArrow[0].click();
        const itemByText = this.getItemByText(text);
        itemByText.click();
    }

    public isCategorisationTagSelected(showName: string): boolean {
        const elements = this.selectedTag;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText();
            return itemByTexts === `${showName}`;
        });
        return itemByText.isExisting();
    }

    public selectStyle(firstText, secondText) {
        waitUntil(() => this.categorisationDropdownsArrow[0].isExisting(), Timeouts.THREE_SECONDS, 'Select styple button was not clickable');
        this.categorisationDropdownsArrow[0].click();
        const itemByText = this.getItemByText(firstText);
        itemByText.click();
        const itemByTexts = this.getItemByText(secondText);
        itemByTexts.click();
    }

    /*public enterTalents(text, textOption) {
        waitUntil(() => this.talents[0].isExisting(), Timeouts.THREE_SECONDS, 'Talents text box was not clickable');
        this.talents[0].click();
        this.talents[0].scrollIntoView();
        this.talents[0].setValue(text);
        const itemByText = this.getItemByTextTalentsOption(textOption);
        itemByText.click();
    }*/

    public clickTrendingButton() {
        waitUntil(() => this.btnTrending.isExisting(), Timeouts.THREE_SECONDS, 'Trending was not displaying');
        this.btnTrending.click();
    }

    public isTrendingButtonDisplaying(): boolean {
        waitUntil(() => this.btnTrending.isExisting(), Timeouts.THREE_SECONDS, 'Trending was not displaying');
        return this.btnTrending.isExisting();
    }

    public getItemByTextTalentsOption(textOption) {
        const elements = this.talentsTags;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText();
            return itemByTexts === `${textOption}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${textOption}`);
        }
        return itemByText;
    }

    public selectFacebook(text) {
        this.categorisationDropdownsArrow[0].click();
        const itemByText = this.getItemByText(text);
        itemByText.click();
    }


    public enterTags(text) {
        browser.pause(1000);
        waitUntil(() => this.talents[2].isExisting(), Timeouts.THREE_SECONDS, 'Talents text box was not clickable');
        this.talents[2].click();
        waitUntil(() => this.talents[2].isExisting(), Timeouts.THREE_SECONDS, 'Talents text box was not clickable');
        this.talents[2].setValue(text);
        waitUntil(() => this.tagsSearchBox[8].isExisting(), Timeouts.THREE_SECONDS, 'Tags was not displaying');
        this.tagsSearchBox[8].click();
    }

    public clickValidateInformation() {
        waitUntil(() => this.validateInfo.isExisting(), Timeouts.THREE_SECONDS, 'Validate information button was not displaying');
        this.validateInfo.click();
    }

    public getSetupTitleText(): string {
        waitUntil(() => this.setupTitle.isExisting(), Timeouts.THREE_SECONDS, 'Set up title was not displaying on the top of the page');
        return this.setupTitle.getText();
    }

    public setChannelSelection(text: string) {
        const itemByText = this.getChennelNameItemByText(text);
        itemByText.click();
    }

    public getValidationTitletext(): string {
        waitUntil(() => this.validationTitle.isExisting(), Timeouts.THREE_SECONDS, 'Validation title was not displaying on the top of the page');
        return this.validationTitle.getText();
    }

    public getChennelNameItemByText(text) {
        const elements = this.chennelSelection;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text} in channel selection list`);
        }
        return itemByText;
    }

    public setVideoEditorName(text: string) {
        waitUntil(() => this.validationDropdown[0].isExisting(), Timeouts.THREE_SECONDS, 'Video edit text box was not displaying');
        this.validationDropdown[0].click();
        const itemByText = this.getValidationItemByText(text);
        itemByText.click();
    }

    public isValidationDropdownDisplaying(): boolean {
       return waitUntil(() => this.validationDropdown[1].isExisting(), Timeouts.THREE_SECONDS, 'Video edit text box was not displaying');
    }

    public getValidationItemByText(text) {
        const elements = this.validationDropdownOptions;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getAttribute('value');
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text} in channel selection list`);
        }
        return itemByText;
    }

    public setVideoOwnerName(text) {
        waitUntil(() => this.validationDropdown[1].isExisting(), Timeouts.THREE_SECONDS, 'Video owner text box was not displaying');
        this.validationDropdown[1].click();
        this.videoOwner.click()
    }
}