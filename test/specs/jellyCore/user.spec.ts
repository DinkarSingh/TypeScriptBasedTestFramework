import { expect } from 'chai';
import { CoreHomePage } from '../../../src/pages/jellycorePages/coreHomePage/coreHome.page';
import { TestBuildingBlocks } from '../../../src/infra/utilities/testBuildingBlock';
import { TestLogger } from '../../../src/infra/loggers/test-logger';
import { CoreMainMenuEnum } from '../../../src/infra/enum/coreMainMenu-enum'
import { Users } from '../../../src/pages/jellycorePages/users/user.page';
import allureReporter from '@wdio/allure-reporter';
import { LoginDetails } from "../../../src/infra/models/login-detail";
import { BaseTestData } from "../../../src/infra/models/base-test-data";
import { JellycoreTestBuildingBlocks } from '../../../src/infra/utilities/jellycore-test-buildingBlock';
import { jellyCoreConfig } from '../../../src/infra/config/jellyCore.config';
const path = require('path');

let coreHomePage = new CoreHomePage();
const users = new Users();
let logger: TestLogger;
let testIndex = 0;
let testData: BaseTestData = new BaseTestData(undefined);
let jellycoreTestBuildingBlocks = new JellycoreTestBuildingBlocks(testData);


describe('Jellycore: User module test cases', () => {

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

    it('Verify that Users information are displaying', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.USERS}`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.USERS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.USERS)).to.equal(true, `${CoreMainMenuEnum.USERS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the user name title was displaying`, () => {
            const titleExisting = users.isUsersTitleExisting();
            expect(titleExisting).to.equal(true, `User title name was not existing in table`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the user videos column was displaying`, () => {
            const videosExisting = users.isVideosColumnExisting();
            expect(videosExisting).to.equal(true, `User videos was not existing in table`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the user conversions column was displaying`, () => {
            const conversionsExisting = users.isConversionsColumnExisting();
            expect(conversionsExisting).to.equal(true, `User conversions was not existing in table`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the user views column was displaying`, () => {
            const viewsExisting = users.isViewsColumnExisting();
            expect(viewsExisting).to.equal(true, `User views was not existing in table`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the user views videos column was displaying`, () => {
            const viewsExisting = users.isViewsVideosColumnExisting();
            expect(viewsExisting).to.equal(true, `User views videos was not existing in table`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the user earning videos column was displaying`, () => {
            const viewsExisting = users.isEarningVideosExisting();
            expect(viewsExisting).to.equal(true, `User earning videos was not existing in table`);
        });
    });

    it('Verify that user title matching in the details page', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.USERS}`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.USERS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.USERS)).to.equal(true, `${CoreMainMenuEnum.USERS} main menu was not selected`);
        });
        const titlName = users.userTitleNameText();
        const firstTitleName = titlName[0];
        const titleName = firstTitleName.split('\n');
        const title = titleName[0];
        TestBuildingBlocks.addStepAndExecute(`Click on option button for Open`, () => {
            users.ClickOnTableOptionButton();
            users.selectPopUpOptions('Open');
            const detailTitle = users.getDetailTitle();
            expect(detailTitle).to.contains(title, `User name ${title} is different from detail page ${detailTitle}`);
        });
    });
});
