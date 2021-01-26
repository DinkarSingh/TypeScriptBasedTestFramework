import { Timeouts } from '../../../infra/enum/timeouts';
import { waitUntil } from '../../../infra/waiter/wait';
import { BasePage } from '../base-Page';


export class Logout extends BasePage {

    private get profileButton() { return $('.username') }

    private get logOutButton() { return $('//a[contains(text(),"Logout")]') }

    /**
     * Checking the weather logout button existing or not
     */
    public isProfileNameExisting(): boolean {
        return waitUntil(() => this.profileButton.isExisting(), Timeouts.TEN_SECONDS, 'Profile name was not displayed');
    }


    /**
     * return the profile name text
     */
    public getProfileText(): string {
        waitUntil(() => this.profileButton.isExisting(), Timeouts.TEN_SECONDS, 'Profile name was not displayed');
        return this.profileButton.getText().trim();
    }

    /**
     * Checking the weather logout button existing or not
     */
    public isLogoutButtonExisting(): boolean {
        return waitUntil(() => this.logOutButton.isExisting(), Timeouts.TEN_SECONDS, 'Logout button was not displayed');
    }

    /**
     * Here click on logout button in home page
     */
    public clickOnLogoutButton() {
        waitUntil(() => this.logOutButton.isExisting(), Timeouts.TEN_SECONDS, 'Logout button was not displayed');
        this.logOutButton.click();
    }

}
