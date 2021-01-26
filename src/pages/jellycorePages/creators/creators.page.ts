import { Timeouts } from '../../../infra/enum/timeouts';
import { waitUntil } from '../../../infra/waiter/wait';
import { BasePage } from '../base-Page';


export class Creators extends BasePage {

    private get shadowThreeDots() {
        const dots = $('use[*|href="#three-dot-loader"]')
        return dots;
    }

    private get tableRow() { return $('#app table tr') }

    private get submenuLibrary() { return $('#app .main div .active') }

    private get filtersOption() { return $('#app .filter .select-column .icon') }

    private get searchFilter() { return $('#app .filter .filters-form .input-search input') }

    private get clearAllFilter() { return $('#app .fit-content .title-filters .close') }

    private get clearFilter() { return $('#app .fit-content .filter-div div a') }

    private get postedOnFilter() { return $$('#app .fit-content .filter-div .checkbox-custom label') }

    private get statusListFilter() { return $$('#app .fit-content .filter-div .not-selected option') }

    private get statusTabelValues() { return $$('#app table tbody tr .flex-status') }

    private get rowOptionButton() { return $$('#app table tbody tr .action-position .action-button button') }

    private get optionLoeadPop() { return $('#app .action-unavailable') }

    private get popUpOtions() { return $$('#app .action-button .item-action span') }

    private get updatedStatusPopUp() { return $('.toasted-container div') }

    private get tableComumn() { return $$('table tbody tr td') }

    private get statusErrorReason() { return $('.popin-container .small .title span') }

    private get textBoxStatus() { return $('.popin-container .small .popin-content .flex textarea') }

    private get validateBtn() { return $('.popin-container .small .popin-content .btn-block') }

    private get downLoadPopUp() { return $$('.popin-mask .popin-content .link') }

    private get downLoadPopUpButton() { return $$('.popin-mask .popin-content .twoButton a') }


    public isThreeDostExisting(): boolean {
        return this.shadowThreeDots.shadow$('#three-dot-loader').isExisting()
    }

    public isTableLoaded(): boolean {
        return !this.isThreeDostExisting();
    }

    public waitTillTableReloads(): boolean {
        waitUntil(() => this.isTableLoaded(), Timeouts.TEN_SECONDS, 'Table is not loaded, three dot is visible');
        return waitUntil(() => this.tableRow.isExisting(), Timeouts.TEN_SECONDS, 'Table was not visible');
    }

    public isLibraryExistingDisplaying(): boolean {
        waitUntil(() => this.submenuLibrary.isExisting(), Timeouts.TEN_SECONDS, 'Library sub menu was not displayed');
        return this.submenuLibrary.isDisplayed();
    }

    public clickOnFilterButton() {
        waitUntil(() => this.filtersOption.isExisting(), Timeouts.THREE_SECONDS, 'Filter button is not visible');
        const runInBrowser = function (argument) {
            argument.click();
        };
        const elementToClickOn = browser.$('#app .filter .select-column div');
        browser.execute(runInBrowser, elementToClickOn);
    }

    public isFilterPanelExisting(): boolean {
        return waitUntil(() => this.clearAllFilter.isExisting(), Timeouts.THREE_SECONDS, 'Filter div was not displayed');
    }

    public selectPostedOnTimeSchedule(time: string) {
        browser.pause(2000);
        const postTime = this.getPostedOnTimeText(time);
        postTime.click();
    }

    public getPostedOnTimeText(text) {
        waitUntil(() => this.postedOnFilter[4].isExisting(), Timeouts.THREE_SECONDS, 'Filter div was not displayed');
        const elements = this.postedOnFilter;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

    public clickClearAllButton() {
        waitUntil(() => this.clearAllFilter.isExisting(), Timeouts.THREE_SECONDS, 'Filter div was not displayed');
        this.clearAllFilter.click();
    }

    public selectStatusFilterList(creatorStatus: string) {
        waitUntil(() => this.clearAllFilter.isExisting(), Timeouts.THREE_SECONDS, 'Filter div was not displayed');
        const status = this.getStatusListText(creatorStatus);
        status.click();
    }

    public getStatusListText(text) {
        const elements = this.statusListFilter;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

    public getStatusTableValues(): string[] {
        waitUntil(() => this.statusTabelValues[0].isExisting(), Timeouts.FORTY_SECONDS, 'Table header was not displaying');
        return this.statusTabelValues.map((cell) => {
            return cell.getText();
        });
    }

    public isTableColumnExisting() {
        return waitUntil(() => this.tableComumn[0].isExisting(), Timeouts.FORTY_SECONDS, 'Table column was not displaying');
    }

    public ClickOnTableOptionButton() {
        waitUntil(() => this.rowOptionButton[0].isExisting(), Timeouts.FORTY_SECONDS, 'Table header was not displaying');
        this.rowOptionButton[0].click();
        waitUntil(() => this.waitTillOptionLoadReloads(), Timeouts.TEN_SECONDS, 'Table is not loaded, three dot is visible');
    }

    public isLoadOptionExisting(): boolean {
        return this.optionLoeadPop.isExisting();
    }

    public isTableLoadDisplyed(): boolean {
        return !this.isLoadOptionExisting();
    }

    public waitTillOptionLoadReloads(): boolean {
        return waitUntil(() => this.isTableLoadDisplyed(), Timeouts.TEN_SECONDS, 'Table is not loaded, three dot is visible');
    }

    public selectPopUpOptions(popUpOption: string) {
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

    public getUpdatedStatusText(): string {
        waitUntil(() => this.updatedStatusPopUp.isExisting(), Timeouts.THREE_SECONDS, 'Updated Pop up option was not displayed');
        return this.updatedStatusPopUp.getText();
    }

    public isStatuErrorReasonExisting(): boolean {
        return waitUntil(() => this.statusErrorReason.isExisting(), Timeouts.TEN_SECONDS, 'Status error reason title was not displayed');
    }

    public enterTextOnTextBox(text: string) {
        waitUntil(() => this.textBoxStatus.isExisting(), Timeouts.TEN_SECONDS, 'Text box was not displayed');
        this.textBoxStatus.click();
        this.textBoxStatus.setValue(text);
    }

    public ClickValidateButton() {
        waitUntil(() => this.validateBtn.isExisting(), Timeouts.TEN_SECONDS, 'Validate button was not displayed');
        this.validateBtn.click();
    }

    public ClickClearFilter() {
        waitUntil(() => this.clearFilter.isExisting(), Timeouts.TEN_SECONDS, 'Clear filter button not displayed');
        this.clearFilter.click();
    }

    public enterSearchFilterText(text: string) {
        waitUntil(() => this.searchFilter.isExisting(), Timeouts.TEN_SECONDS, 'Search filter text was not displayed');
        this.searchFilter.click();
        this.searchFilter.setValue(text);
        browser.keys("\uE007");
    }

    public getDownloadVideoStatus(): boolean {
        const elements = this.downLoadPopUp;
        const itemByText = elements.every((item) => {
            const itemByTexts = item.$('input').getAttribute('disabled');
            return itemByTexts == null
        });
        return itemByText;
    }

    public clickDownLoadPopUpButton(text: string) {
        waitUntil(() => this.downLoadPopUpButton[0].isExisting(), Timeouts.TEN_SECONDS, 'Download pop up button was not displayed');
        const button = this.getLownLoadPopUpOptionText(text);
        button.click();
    }

    public getLownLoadPopUpOptionText(text) {
        const elements = this.downLoadPopUpButton;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

}