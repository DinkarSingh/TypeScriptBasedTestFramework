import { Timeouts } from '../../infra/enum/timeouts';
import { waitUntil } from '../../infra/waiter/wait';
import { CoreHomePage } from "../../pages/jellycorePages/coreHomePage/coreHome.page";
import { CoreLogin } from '../../pages/jellycorePages/login/coreLogin.page';
import { TestBuildingBlocks } from "./testBuildingBlock";

export class JellycoreTestBuildingBlocks extends TestBuildingBlocks {

    public navigateToCoreHomePage(): CoreHomePage {
        const coreHomePage: CoreHomePage = new CoreHomePage();
        coreHomePage.navigateToPage();
        const loginPage = new CoreLogin();
        if (!loginPage.isUserLoggedIn()) {
          loginPage.login(this.testData.loginDetails.email, this.testData.loginDetails.password);
        } waitUntil(() => coreHomePage.isPageLoaded(), Timeouts.FIVE_SECONDS, 'Home page wasn\'t loaded');
        return new CoreHomePage();
      }

}