import { Timeouts } from '../../../infra/enum/timeouts';
import { BaseComponent } from '../../../infra/models/base-compents';
import { waitUntil } from '../../../infra/waiter/wait';

export class PostsPage extends BaseComponent {

    private get subMenus() { return $$('.sections div') }

    private get shadowThreeDots() { return $('.my-5') };

    private get threeDots() { return this.shadowThreeDots.shadow$('#three-dot-loader') };

    private get tableHeader() { return $$('.box-table thead tr th div span') }

    private get tableRows() { return $$('.box-table tbody tr') }

    private get rows(): WebdriverIO.Element[] { return $$('.box-table tbody tr') }

    private get filtersOption() { return $('#app .filter .select-column .icon') }

    private get closeFilter() { return $('#app .fit-content .title-filters .close') }

    private get postedOnFilter() { return $$('#app .fit-content .filter-div .checkbox-custom label') }

    private get publishedTableHeaders() { return $$('table thead tr th div span') }

    private get firstRow() { return $$('table tbody tr td .td-img-post') }

    private get graphTitles() { return $$('#app .abSideBar span') }

    private get videoLink() { return $('#app .abSideBar .post_img video') }

    private get graphCheckBox() { return $$('#app .abSideBar .checkbox-group input') }

    private get graphCanvas() { return $$('#app .abSideBar .graph canvas') }

    private get facebookLink() { return $('#app .abSideBar .blocks .header-bottom .fbLink') }

    private get graphNotice() { return $('.flex-column .greenScore div') }

    public isThreeDostExisting(): boolean {
        return this.threeDots.isExisting();
    }

    public isloaderLoaded(): boolean {
        return this.shadowThreeDots.isExisting();
    }

    public isTableLoaded(): boolean {
        return !this.isThreeDostExisting();
    }

    public waitTillTableReloads(): boolean {
        return waitUntil(() => this.isTableLoaded(), Timeouts.THIRTY_SECONDS, 'Table is not loaded, three dot is visible');
    }

    public isLoaderExisting(): boolean {
        if(this.isloaderLoaded()){
            return this.waitTillTableReloads()
        }
        else {
            browser.pause(5000);
            return true;
        }
    }

    public selectSubMenus(submenuName: string) {
        browser.pause(2000);
        const postTime = this.getSubMenuText(submenuName);
        postTime.click();
    }

    public getSubMenuText(text) {
        waitUntil(() => this.subMenus[1].isExisting(), Timeouts.THREE_SECONDS, 'Post sub menus was not displyed');
        const elements = this.subMenus;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

    public getSubMenuValues(): string[] {
        waitUntil(() => this.subMenus[0].isExisting(), Timeouts.FORTY_SECONDS, 'Main sub menu list was not displaying');
        return this.subMenus.map((cell) => {
            return cell.getText();
        });
    }

    public isSubMenuSelected(text: string): boolean {
        browser.pause(1000);
        waitUntil(() => this.subMenus[0].isExisting(), Timeouts.FORTY_SECONDS, 'Main sub menu list was not displaying');
        const menuOption = this.getMenuText(text);
        return menuOption.getAttribute('class').includes('section active')
    }

    public getMenuText(text) {
        const elements = this.subMenus;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text} in sub main menu list`);
        }
        return itemByText;
    }

    public getTableHeaderValues(): string[] {
        waitUntil(() => this.tableHeader[0].isExisting(), Timeouts.FORTY_SECONDS, 'Table header was not displaying');
        return this.tableHeader.map((cell) => {
            return cell.getText();
        });
    }

    public isTableRowExisting(): boolean {
        const tableLength = this.tableRows.length;
        if (tableLength > 0) {
            return true;
        }
    }

    public isSubMenuExisting(): boolean {
        return waitUntil(() => this.subMenus[1].isExisting(), Timeouts.FORTY_SECONDS, 'Post submenu was not displaying');
    }

    public clickOnFilterButton() {
        waitUntil(() => this.filtersOption.isExisting(), Timeouts.THREE_SECONDS, 'Filter button is not visible');
        this.filtersOption.click();
    }


    public selectPostedOnTimeSchedule(time: string) {
        browser.pause(2000);
        const postTime = this.getPostedOnTimeText(time);
        postTime.click();
    }

    public getPostedOnTimeText(text) {
        waitUntil(() => this.postedOnFilter[1].isExisting(), Timeouts.THREE_SECONDS, 'Filter div was not displayed');
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

    public clickCloseFilterButtonButton() {
        waitUntil(() => this.closeFilter.isExisting(), Timeouts.THREE_SECONDS, 'Filter div was not displayed');
        this.closeFilter.click();
    }

    public isPostVideoTitleExisting(): boolean {
        const rows = this.rows;
        const isPostIconExisting = rows.every(row => {
            let columnValue = row.$('td .td-video .cursor-link span').getText();
            return row.$('td .td-video .cursor-link span').getText() !== ''
        });
        return isPostIconExisting;
    }

    public videoPostTitle(): string[] {
        waitUntil(() => this.rows[0].$('td .td-video .cursor-link span').isExisting(), Timeouts.THREE_SECONDS, 'Filter div was not displayed');
        return this.rows.map((cell) => {
            return cell.$('td .td-video .cursor-link span').getText();
        });
    }

    public isPostVideoChannelExisting(): boolean {
        const rows = this.rows;
        const isPostIconExisting = rows.every(row => { return row.$('td .td-video .legend_page .small-img').getAttribute('title') !== '' });
        return isPostIconExisting;
    }

    public isPostDateExisting(): boolean {
        const rows = this.rows;
        const isPostIconExisting = rows.every(row => {
            return row.$$('td')[1].$('.field-period .status-date').getText() !== ''
        });
        return isPostIconExisting;
    }

    public isPostDateCreatorExisting(): boolean {
        const rows = this.rows;
        const isPostIconExisting = rows.every(row => {
            const ss = row.$$('td')[1].$('.field-period .legend_page span').getText();
            return row.$$('td')[1].$('.field-period .legend_page span').getText() !== ''
        });
        return isPostIconExisting;
    }


    public isPublishedEarningExisting(): boolean {
        const rows = this.rows;
        const isPostIconExisting = rows.every(row => {
            return row.$$('td')[2].$('.money').getText() !== ''
        });
        return isPostIconExisting;
    }

    public isPublishedViewExisting(): boolean {
        const rows = this.rows;
        const isPostIconExisting = rows.every(row => {
            return row.$$('td')[3].$('.small-txt').getText() !== ''
        });
        return isPostIconExisting;
    }

    public isPublishedSmashTargetExisting(): boolean {
        const rows = this.rows;
        const isPostIconExisting = rows.every(row => {
            return row.$$('td')[4].$('.small-txt').getText() !== ''
        });
        return isPostIconExisting;
    }

    public isPublishedSmashRateExisting(): boolean {
        const rows = this.rows;
        const isPostIconExisting = rows.every(row => {
            return row.$$('td')[5].$('div div').getText() !== ''
        });
        return isPostIconExisting;
    }

    public isPublishedSmashStatusExisting(): boolean {
        const rows = this.rows;
        const isPostIconExisting = rows.every(row => {
            return row.$$('td')[5].$('div div').getText() !== ''
        });
        return isPostIconExisting;
    }

    public isReportScoreExisting(): boolean {
        const rows = this.rows;
        const isPostIconExisting = rows.every(row => {
            return row.$$('td')[2].$('.score').getText() !== ''
        });
        return isPostIconExisting;
    }

    public isPublishingDateGapExisting(): boolean {
        const rows = this.rows;
        const isPostIconExisting = rows.every(row => {
            return row.$$('td')[3].$('.field-period div').getText() !== ''
        });
        return isPostIconExisting;
    }

    public isNumberOfCrosspostExisting(): boolean {
        const rows = this.rows;
        const isPostIconExisting = rows.every(row => {
            return row.$$('td')[4].$('.small-txt').getText() !== ''
        });
        return isPostIconExisting;
    }

    public isCrosspostEarningsExisting(): boolean {
        const rows = this.rows;
        const isPostIconExisting = rows.every(row => {
            return row.$$('td')[5].$('.money').getText() !== ''
        });
        return isPostIconExisting;
    }

    public isLastSevenDaysEarningExisting(): boolean {
        const rows = this.rows;
        const isPostIconExisting = rows.every(row => {
            return row.$$('td')[6].$('.money').getText() !== ''
        });
        return isPostIconExisting;
    }

    public isLastDayEarningExisting(): boolean {
        const rows = this.rows;
        const isPostIconExisting = rows.every(row => {
            return row.$$('td')[7].$('.money').getText() !== ''
        });
        return isPostIconExisting;
    }

    public selectPublihedTableHeader(headerName: string) {
        browser.pause(2000);
        const header = this.getHeaderText(headerName);
        header.click();
    }

    public getHeaderText(text) {
        waitUntil(() => this.publishedTableHeaders[1].isExisting(), Timeouts.THREE_SECONDS, 'Post sub menus was not displyed');
        const elements = this.publishedTableHeaders;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText().trim();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text}`);
        }
        return itemByText;
    }

    public ClickOnFirstRowIcon() {
        waitUntil(() => this.firstRow[0].isExisting(), Timeouts.THREE_SECONDS, 'First row was not displayed');
        this.firstRow[0].click();
    }

    public getGraphVideoTitle(): string {
        waitUntil(() => this.graphTitles[0].isExisting(), Timeouts.THREE_SECONDS, 'Graph video post title was not displayed');
        const title = this.graphTitles[0].getText();
        return title;
    }

    public isVideoLinkExisting(): boolean {
        return waitUntil(() => this.videoLink.isExisting(), Timeouts.THREE_SECONDS, 'Video was not displayed');
    }

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

    public isAbsoluteCheckBoxChecked(): boolean {
        const status = this.graphCheckBox[0].getProperty('checked');
        if(status === true){
            return true
        }
    }

    public isRelativeCheckBoxChecked(): boolean {
        const status = this.graphCheckBox[1].getProperty('checked');
        if(status === true){
            return true
        }
    }

    public isAbsoluteGraphDisplaying(): boolean {
        browser.pause(3000);
        const relativeGraph = this.graphCanvas[1].getAttribute('style');
        if( relativeGraph === 'display: none;'){
            return true;
        }
    }

    public isRelativeGraphDisplaying(): boolean {
        browser.pause(3000);
        const absoluteGraph = this.graphCanvas[0].getAttribute('style');
        if( absoluteGraph === 'display: none; height: 213px; width: 427px;'){
            return true;
        }
    }

    public ClickOnFBLink() {
        waitUntil(() => this.facebookLink.isExisting(), Timeouts.THREE_SECONDS, 'Facebook link was not displayed');
        this.facebookLink.click()
        browser.newWindow('https://www.facebook.com/')
    }

    /**
     * 
     * @param text 
     * here returning 
     */
    public isGraphDetailTextExisting(text: string): boolean {
        waitUntil(() => this.graphNotice.isExisting(), Timeouts.THREE_SECONDS, 'Graph notice was not displayed');
        const msg = this.graphNotice.getText();
        if(msg.includes(text)){
            return true;
        }
    }

}