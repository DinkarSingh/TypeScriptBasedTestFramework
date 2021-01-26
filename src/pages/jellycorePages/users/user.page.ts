import { Timeouts } from '../../../infra/enum/timeouts';
import { waitUntil } from '../../../infra/waiter/wait';
import { BasePage } from '../base-Page';


export class Users extends BasePage {

    private get shadowThreeDots() { return $('.my-5') }

    private get threeDots() { return this.shadowThreeDots.shadow$('#three-dot-loader') }

    private get rows() { return $$('table tbody tr') }

    private get optionButton() { return $$('.action-position .action-button') }

    private get optionLoeadPop() { return $('#app .action-unavailable') }

    private get popUpOtions() { return $$('#app .action-button .item-action span') }

    private get detailTitleName() { return $('.user-infos h1') }

    /**
     * checking loader dot are existing or not
     */
    public isThreeDostExisting(): boolean {
        return this.threeDots.isExisting();
    }

    /**
     * Loader doot are visible or not
     */
    public isloaderLoaded(): boolean {
        return this.shadowThreeDots.isExisting();
    }

    /**
     * Checking loader is unvisible or not
     */
    public isTableLoaded(): boolean {
        return !this.isThreeDostExisting();
    }

    /**
     * waiting till table loader loeads
     */
    public waitTillTableReloads(): boolean {
        return waitUntil(() => this.isTableLoaded(), Timeouts.THIRTY_SECONDS, 'Table is not loaded, three dot is visible');
    }

    public isLoaderExisting(): boolean {
        if (this.isloaderLoaded()) {
            return this.waitTillTableReloads()
        }
        else {
            browser.pause(5000);
            return true;
        }
    }

    /**
     * Checking weather users video titile are displaying or not
     */
    public isUsersTitleExisting(): boolean {
        const rows = this.rows;
        const isUserTitleNameExisting = rows.every(row => {
            let columnValue = row.$('.inline-flex span').getText();
            return row.$('.inline-flex span').getText().trim() !== ''
        });
        return isUserTitleNameExisting;
    }

    /**
     * Here returning the user title name text
     */
    public userTitleNameText(): string[] {
        waitUntil(() => this.rows[0].$('.inline-flex span').isExisting(), Timeouts.THREE_SECONDS, 'user title was not displayed');
        return this.rows.map((cell) => {
            return cell.$('.inline-flex span').getText();
        });
    }

    /**
     *  video column has all the values in table
     */
    public isVideosColumnExisting(): boolean {
        const rows = this.rows;
        const isColumnvValueExists = rows.every(row => {
            return row.$$('td')[1].$('.small-txt').getText() !== '';
        });
        return isColumnvValueExists;
    }

    /**
     *  Conversions column has all the values in table
     */
    public isConversionsColumnExisting(): boolean {
        const rows = this.rows;
        const isColumnvValueExists = rows.every(row => {
            return row.$$('td')[2].$('.small-txt').getText() !== '';
        });
        return isColumnvValueExists;
    }

    /**
     *  Views column has all the values in table
     */
    public isViewsColumnExisting(): boolean {
        const rows = this.rows;
        const isColumnvValueExists = rows.every(row => {
            return row.$$('td')[3].$('.small-txt').getText() !== '';
        });
        return isColumnvValueExists;
    }

    /**
     *  Views videos column has all the values in table
     */
    public isViewsVideosColumnExisting(): boolean {
        const rows = this.rows;
        const isColumnvValueExists = rows.every(row => {
            return row.$$('td')[4].$('.small-txt').getText() !== '';
        });
        return isColumnvValueExists;
    }


    /**
     * Earning videos column has all the values in table
     */
    public isEarningVideosExisting(): boolean {
        const rows = this.rows;
        const isPostIconExisting = rows.every(row => {
            return row.$$('td')[7].$('.money').getText() !== ''
        });
        return isPostIconExisting;
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
     * Select the options 
     */
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


    /**
     * returning the detail user title 
     */
    public getDetailTitle(): string {
        waitUntil(() => this.detailTitleName.isExisting(), Timeouts.FORTY_SECONDS, 'User title name was not displaying');
        return this.detailTitleName.getText();
    }
}
