import { Timeouts } from '../../../infra/enum/timeouts';
import { waitUntil } from '../../../infra/waiter/wait';
import { BasePage } from '../base-Page';


export class Vertical extends BasePage {

    private get shadowThreeDots() { return $('.my-5') }

    private get threeDots() { return this.shadowThreeDots.shadow$('#three-dot-loader') }

    private get tableHeader() { return $$('.box-table thead tr th div span') }

    private get columnFilter() { return $('.filters-form .right .select-column') }

    private get columnFiltePanel() { return $$('.fit-content .column-div div  div div') }

    private get closeColumn() { return $('.fit-content .close .icon') }

    private get rows() { return $$('.box-table tbody tr') }

    private get dropDownFilter() { return $('.filters-form .right .select') }

    private get periodOptions() { return $$('.calendar-wrapper') }

    private get periodStatus() { return $('.select-date select option') }

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
     * here we returns the post title text
     */
    public getVideoCountText(): string {
        waitUntil(() => this.rows[0].$$('td')[3].$('.small-txt').isExisting(), Timeouts.THREE_SECONDS, 'Post title was not displaying');
        return this.rows[0].$$('td')[3].$('.small-txt').getText();
    }

    /**
     * here we are click on time period filter dropdown
     */
    public clickTimePeriodFilter() {
        waitUntil(() => this.dropDownFilter.isExisting(), Timeouts.FIVE_SECONDS, 'Filter was not displaying');
        this.dropDownFilter.click()
    }

    /**
     * 
     * @param filterOption 
     * search for period text and clicking on this
     */
    public selectPeriodDropdownFilter(filterOption: string) {
        const filter = this.getTimePeriodDropDown(filterOption);
        filter.click();
    }

    public getTimePeriodDropDown(text) {
        browser.pause(3000);
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

    /**
     * 
     * @param filterOption 
     * here we are click on validate the time period button
     */
    public clickPeriodValidation(filterOption: string) {
        waitUntil(() => this.columnFilter.isExisting(), Timeouts.THREE_SECONDS, 'Column filter button was not displaying');
        const validateButton = this.getPeriodValidationText(filterOption);
        validateButton.click();
    }

    /**
     * 
     * @param text 
     * here checking period status change or not
     */
    public isPeriodStatusExisting(text: string): boolean {
        waitUntil(() => this.periodStatus.isExisting(), Timeouts.THREE_SECONDS, 'Period staus was not displaying');
        const period = this.periodStatus.getText().trim();
        if(period === `${text}`){
            return true;
        }
    }

    /**
     * 
     * @param text 
     * Here we returning the text for button
     */
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


    /**
     * checking the vertical column values are displaying (Icon and vertical name)
     */
    public isVerticalInfoExisting(): boolean {
        browser.pause(2000);
        const channelDetails = this.rows.every(row => {
            const icon = row.$$('td')[0].$('.info_channel div').isExisting();
            const verticalName = row.$$('td')[0].$('.info_channel span').getText() !== '';
            return icon && verticalName;
        });
        return channelDetails;
    }

     /**
     * checking the view column values are displaying in all rows
     */
    public isViewColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[1].$('.small-txt').getText() !== '';
        });
        return viewDeails;
    }

    /**
     * checking the earning column values are displying in all rows
     */
    public isEeaningColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[2].$('.money span').getText() !== '';
        });
        return viewDeails;
    }

     /**
     * checking the Video column values are displying in all rows
     */
    public isVideosColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[3].$('.small-txt').getText() !== '';
        });
        return viewDeails;
    }

    /**
     * checking the Fan column values are displying in all rows
     */
    public isFanColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[4].$('.small-txt').getText() !== '';
        });
        return viewDeails;
    }

    /**
     * checking the new fans column values are displying in all rows
     */
    public isNewFansColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[5].$('.small-txt').getText() !== '';
        });
        return viewDeails;
    }

     /**
     * checking the view video column values are displying in all rows
     */
    public isViewVideoColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[6].$('.small-txt').getText() !== '';
        });
        return viewDeails;
    }

    /**
    * checking the avg watch time column values are displying in all rows
    */
    public isAvgWatchTimeColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[7].$('.align-right').getText() !== '';
        });
        return viewDeails;
    }

    /**
     * checking the earning videos column values are displying in all rows
     */
    public isEarningVideosColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[8].$('.money span').getText() !== '';
        });
        return viewDeails;
    }

    /**
     * checking the earning videos column values are displying in all rows
     */
    public isSpendingsColumnExisting(): boolean {
        const viewDeails = this.rows.every(row => {
            return row.$$('td')[9].$('.money span').getText() !== '';
        });
        return viewDeails;
    }


}