import { Timeouts } from '../../../infra/enum/timeouts';
import { waitUntil } from '../../../infra/waiter/wait';
import { BasePage } from '../base-Page';


export class Channel extends BasePage {

    private get shadowThreeDots() { return $('.my-5') }

    private get threeDots() { return this.shadowThreeDots.shadow$('#three-dot-loader') }

    private get tableHeader() { return $$('.box-table thead tr th div span') }

    private get columnFilter() { return $('.filters-form .right .select-column') }

    private get columnFiltePanel() { return $$('.fit-content .column-div div  div div') }

    private get closeColumn() { return $('.fit-content .close .icon') }

    private get rows() { return $$('.box-table tbody tr') }

    private get dropDownFilter() { return $$('.filters-form .right .select') }

    private get dropDownFilterOption() { return $$('.filters-form .right .select select option') }

    private get periodOptions() { return $$('.calendar-wrapper') }

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
     * Here we are trying click on columns filter button
     */
    public clickColumnFilterButton() {
        waitUntil(() => this.columnFilter.isExisting(), Timeouts.THREE_SECONDS, 'Column filter was not displaying');
        this.columnFilter.click();
    }
    /**
     * Here we are verifying weather column filter panel is opened or not
    */

    public isColumnFilterOpenExisting(): boolean {
        return waitUntil(() => this.columnFiltePanel[0].isExisting(), Timeouts.THREE_SECONDS, 'Filter div was not displayed');
    }

    /**
     * Close column filter
     */
    public ClickCloseColumnFilterButton() {
        waitUntil(() => this.closeColumn.isExisting(), Timeouts.THREE_SECONDS, 'Column filter button was not displaying');
        this.closeColumn.click();
    }

    /**
     * 
     * @param columnName 
     * Select the column name from the column filter
     */
    public selectChannelColumn(columnName: string) {
        browser.pause(2000);
        const status = "selected";
        const postTime = this.getUnselectedColumnStatusText(columnName, status);
        postTime.click();
    }
    /**
     * 
     * @param text 
     * @param status 
     * Verify the text for column filter
     */
    public getUnselectedColumnStatusText(text, status) {
        waitUntil(() => this.columnFiltePanel[0].isExisting(), Timeouts.THREE_SECONDS, 'Filter div was not displayed');
        const elements = this.columnFiltePanel;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.$('.checkbox-label').getText().trim()
            const checkBoxStatus = item.getAttribute('class');
            return itemByTexts === `${text}` && !checkBoxStatus.includes!(status);
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

    /**
     * 
     * @param columnName 
     * Unselect the column name from the column filter
     */
    public unSelectColumns(columnName: string) {
        browser.pause(2000);
        const status = "selected";
        const postTime = this.getSelectedColumnStatusText(columnName, status);
        postTime.click();
    }

    /**
     * 
     * @param text 
     * @param status 
     * Verify the text for column filter
     */

    public getSelectedColumnStatusText(text, status) {
        waitUntil(() => this.columnFiltePanel[0].isExisting(), Timeouts.THREE_SECONDS, 'Filter div was not displayed');
        const elements = this.columnFiltePanel;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.$('.checkbox-label').getText().trim()
            const checkBoxStatus = item.getAttribute('class');
            return itemByTexts === `${text}` && checkBoxStatus.includes!(status);
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

    /**
     * Get the table header text values
     */
    public getTableHeaderValues(): string[] {
        waitUntil(() => this.tableHeader[0].isExisting(), Timeouts.FORTY_SECONDS, 'Table header was not displaying');
        return this.tableHeader.map((cell) => {
            return cell.getText();
        });
    }

    /**
     * checking the channel column values are displaying (Icon, title, creatorname)
     */
    public isChannelInfoExisting(): boolean {
        browser.pause(2000);
        const channelDetails = this.rows.every(row => {
            const icon = row.$$('td')[0].$('.info_channel div').isExisting();
            const title = row.$$('td')[0].$('.title-channel span').getText() !== '';
            const creatorName = row.$$('td')[0].$('.title-channel .title-verticals span').getText() !== '';
            return icon && title && creatorName;
        });
        return channelDetails;
    }

    /**
     * checking the view column values are displaying in all rows
     */
    public isVideoColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[1].$('.small-txt').getText() !== '';
        });
        return viewDeails;
    }

    /**
     * checking the earning column values are displying in all rows
     */
    public isPostsColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[2].$('.small-txt').getText() !== '';
        });
        return viewDeails;
    }

    /**
     * checking the Video column values are displying in all rows
     */
    public isXPostsColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[3].$('.small-txt').getText() !== '';
        });
        return viewDeails;
    }

    /**
     * checking the new fans column values are displying in all rows
     */
    public isPostingPaceColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[4].$('.small-txt').getText() !== '';
        });
        return viewDeails;
    }

    /**
     * checking the view video column values are displying in all rows
     */
    public isVideoImpressionColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[5].$('.small-txt').getText() !== '';
        });
        return viewDeails;
    }

    /**
    * checking the CTR column values are displying in all rows
    */
    public isCTRColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[6].$('.align-center').getText() !== '';
        });
        return viewDeails;
    }

    /**
     * checking the views column values are displying in all rows
     */
    public isViewsColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[7].$('.small-txt').getText() !== '';
        });
        return viewDeails;
    }

    /**
     * checking the CPM column values are displying in all rows
     */
    public isCPMColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[8].$('.small-txt').getText() !== '';
        });
        return viewDeails;
    }

    /**
     * checking the Earning column values are displying in all rows
     */
    public isEarningColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[9].$('.money').getText() !== '';
        });
        return viewDeails;
    }

    /**
     * here we are click on type of page filter dropdown
     */
    public clickTypeOfPageFilter() {
        waitUntil(() => this.dropDownFilter[0].isExisting(), Timeouts.FIVE_SECONDS, 'Filter was not displaying');
        this.dropDownFilter[0].click()
    }

    /**
     * here we are click on time period filter dropdown
     */
    public clickTimePeriodFilter() {
        waitUntil(() => this.dropDownFilter[1].isExisting(), Timeouts.FIVE_SECONDS, 'Filter was not displaying');
        this.dropDownFilter[1].click()
    }

    /**
     * here we are click on all verticals filter dropdown
     */
    public clickVericalFilter() {
        waitUntil(() => this.dropDownFilter[2].isExisting(), Timeouts.FIVE_SECONDS, 'Filter was not displaying');
        this.dropDownFilter[2].click()
    }

    /**
     * select the dowpdown filte (All page type and All verticals)
     */
    public selectDropdownFilter(filterOption: string) {
        waitUntil(() => this.columnFilter.isExisting(), Timeouts.THREE_SECONDS, 'Column filter button was not displaying');
        const filter = this.getTextsFromDropDown(filterOption);
        filter.click();
    }

    /**
     * 
     * @param text 
     * get the text from the filter downdown
     */
    public getTextsFromDropDown(text) {
        waitUntil(() => this.dropDownFilterOption[0].isExisting(), Timeouts.THREE_SECONDS, 'Filter div was not displayed');
        const elements = this.dropDownFilterOption;
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
     * here we returns the post title text
     */
    public getPostTitle(): string {
        waitUntil(() => this.rows[0].$$('td')[0].$('.title-channel span').isExisting(), Timeouts.THREE_SECONDS, 'Post title was not displaying');
        return this.rows[0].$$('td')[0].$('.title-channel span').getText();
    }

    /**
     * 
     * @param filterOption 
     * search for period text and clicking on this
     */
    public selectPeriodDropdownFilter(filterOption: string) {
        waitUntil(() => this.columnFilter.isExisting(), Timeouts.THREE_SECONDS, 'Column filter button was not displaying');
        const filter = this.getTimePeriodDropDown(filterOption);
        filter.click();
    }

    public getTimePeriodDropDown(text) {
        waitUntil(() => this.dropDownFilterOption[0].isExisting(), Timeouts.THREE_SECONDS, 'Filter div was not displayed');
        const elements = this.periodOptions;
        const visibleItem = elements.find((item) => item.getAttribute('class').includes('visible'))
        const visibleCheckboxes = visibleItem.$$('.calendar-wrapper .tooltip-date .calendar-body .wrapper-checkboxes div');
        const checkBoxToClick = visibleCheckboxes.find((checkboxItem) => {
            return checkboxItem.$('label').getText() === text;
        })
        if (checkBoxToClick === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return checkBoxToClick;
    }


    public clickPeriodValidation(filterOption: string) {
        waitUntil(() => this.columnFilter.isExisting(), Timeouts.THREE_SECONDS, 'Column filter button was not displaying');
        const validateButton = this.getPeriodValidationText(filterOption);
        validateButton.click();
    }

    public getPeriodValidationText(text) {
        const elements = this.periodOptions;
        const visibleItem = elements.find((item) => item.getAttribute('class').includes('visible'))
        const visibleCheckboxes = visibleItem.$$('.calendar-wrapper .tooltip-date .calendar-body .btn-block');
        const checkBoxToClick = visibleCheckboxes.find((checkboxItem) => {
            return checkboxItem.getText() === text;
        })
        if (checkBoxToClick === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return checkBoxToClick;
    }

}