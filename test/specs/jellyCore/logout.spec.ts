import { expect } from 'chai';
import { CoreHomePage } from '../../../src/pages/jellycorePages/coreHomePage/coreHome.page';
import { TestBuildingBlocks } from '../../../src/infra/utilities/testBuildingBlock';
import { TestLogger } from '../../../src/infra/loggers/test-logger';
import { Logout } from '../../../src/pages/jellycorePages/logout/logout.page';
import { CoreLogin } from '../../../src/pages/jellycorePages/login/coreLogin.page';
import { LoginDetails } from "../../../src/infra/models/login-detail";
import { BaseTestData } from "../../../src/infra/models/base-test-data";
import { JellycoreTestBuildingBlocks } from '../../../src/infra/utilities/jellycore-test-buildingBlock';
import { jellyCoreConfig } from '../../../src/infra/config/jellyCore.config';
const path = require('path');

let coreHomePage = new CoreHomePage();
const logout = new Logout();
const coreLogin = new CoreLogin();
let logger: TestLogger;
let testIndex = 0;
let testData: BaseTestData = new BaseTestData(undefined);
let jellycoreTestBuildingBlocks = new JellycoreTestBuildingBlocks(testData);


describe('Jellycore: Logout module test cases', () => {

    before(() => {
        logger = new TestLogger();
        testData = new BaseTestData(new LoginDetails(jellyCoreConfig.JellycoreEmail, jellyCoreConfig.JellycorePassword));
        jellycoreTestBuildingBlocks = new JellycoreTestBuildingBlocks(testData);
        coreHomePage = jellycoreTestBuildingBlocks.navigateToCoreHomePage();
    });

    beforeEach(() => {
        testIndex++;
        coreHomePage = jellycoreTestBuildingBlocks.navigateToCoreHomePage();
    });

    it('Verify that Logout process working', () => {
        TestBuildingBlocks.addStepAndExecute(`Check the logout button is displaying in home page`, () => {
            expect(coreHomePage.isLogoutButtonExisting()).to.equal(true, `Logout button was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on logout button on home page`, () => {
            coreHomePage.clickOnLogoutButton();
            expect(logout.isLogoutButtonExisting()).to.equal(true, `Logout button was not displaying in logout page`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that profile name in logout button`, () => {
            expect(logout.isProfileNameExisting()).to.equal(true, `Profile name was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on logout button`, () => {
            logout.clickOnLogoutButton();
            expect(coreLogin.isInputSubmitButtonExisting()).to.equal(true, `Log in page was not existing`);
        });
    });
});
