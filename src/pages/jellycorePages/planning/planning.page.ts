import { Timeouts } from '../../../infra/enum/timeouts';
import {BaseComponent} from '../../../infra/models/base-compents';
import { waitUntil } from '../../../infra/waiter/wait';

export class PlanningPage extends BaseComponent {

    private get changeChannel() { return $('#btn-tooltip-channels') }

    private get titleChangeChannel() { return $('.title span')}

    private get channelList() { return $$('.box-list li a span')} 

    private get selectedChannel() { return $('//*[@id="btn-tooltip-channels"]/span[1]')} 

    private get availableDatesTable() { return $$('.calendar .content .col .cell div a svg use')} 

    private get popUpTitle() { return $('.popin span span ')}

    private get popUpClose() { return $('.popin a ')}

    private get submitNewSchedule() { return $('.popin-content a')}

    private get preMoveKey() { return $('.page-title ul li .prev')}

    private get nextMoveKey() { return $('.page-title ul li .next')}

    private get calenderCell() { return $$('.calendar .head .cell')}
    

    public isChangeChannelExisting(): boolean {
        waitUntil(() => this.changeChannel.isExisting(), Timeouts.FORTY_SECONDS, 'Change channel button not displaying');
        return this.changeChannel.isExisting();
    }

    public clickOnButtonChangeChannel() {
        waitUntil(() => this.changeChannel.isExisting(), Timeouts.FORTY_SECONDS, 'Change channel button not displaying');
        this.changeChannel.click();
    }

    public isTitleChangeChannelExisting(): boolean {
        waitUntil(() => this.changeChannel.isExisting(), Timeouts.FORTY_SECONDS, 'Change channel title not displaying');
        return this.titleChangeChannel.isExisting();
    }

    public selectChannelList(text: string) {
        waitUntil(() => this.channelList[0].isExisting(), Timeouts.FORTY_SECONDS, 'Channel list is not displaying');
        const chennel = this.getChannelText(text);
        chennel.doubleClick(); 
    }

    public getChannelText(text) {
        const elements = this.channelList;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getText();
            return itemByTexts === `${text}`;
        });
        if (itemByText === undefined) {
            throw new Error(`Can't find list item by name ${text} in sub main menu list`);
        }
        return itemByText;
    }

    public isSelectedChannelExisting(text: string): boolean {
        waitUntil(() => this.selectedChannel.isExisting(), Timeouts.FORTY_SECONDS, 'selected channel was not selected');
        const selectedChannel = this.selectedChannel.getText();
        if(selectedChannel === text){
            return true;
        }
    }

    public selectAvailableDates() {
        waitUntil(() => this.availableDatesTable[0].isExisting(), Timeouts.FIVE_SECONDS, 'Available dates are not displaying');
        const date = this.getEditDates();
        date.$('..').click();
    }


    public getEditDates() {
        const elements = this.availableDatesTable;
        const itemByText = elements.find((item) => {
            const itemByTexts = item.getAttribute('xlink:href');
            return itemByTexts === '#icon-edit'
        });
        if (itemByText === undefined) {
            throw new Error(`Available dates are not available`);
        }
        return itemByText;
    }

    public isPopUpTitleExisting(): boolean {
        return waitUntil(() => this.popUpTitle.isExisting(), Timeouts.FORTY_SECONDS, 'Available dates pop up not displaying');
    }

    public closePopUpButton() {
        waitUntil(() => this.popUpClose.isExisting(), Timeouts.FORTY_SECONDS, 'Cross symbol for pop up not displaying');
        this.popUpClose.click();
    }

    public isNewScheduleExisting(): boolean {
        return waitUntil(() => this.submitNewSchedule.isExisting(), Timeouts.FORTY_SECONDS, 'New schedule button not displaying');
    }

    public clickPreMoveKey() {
        waitUntil(() => this.preMoveKey.isExisting(), Timeouts.FORTY_SECONDS, 'schdule prev key was not displayed');
        this.preMoveKey.click();
    }

    public clickNextMoveKey() {
        waitUntil(() => this.nextMoveKey.isExisting(), Timeouts.FORTY_SECONDS, 'schdule next key was not displayed');
        this.nextMoveKey.click();
    }

    public getHeaderDateText(): string {
        waitUntil(() => this.calenderCell[1].isExisting(), Timeouts.FORTY_SECONDS, 'Planning dates were not displayed');
        return this.calenderCell[1].getText();
    }

}