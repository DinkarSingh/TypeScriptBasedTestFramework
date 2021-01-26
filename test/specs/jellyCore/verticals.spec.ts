import { expect } from 'chai';
import { CoreHomePage } from '../../../src/pages/jellycorePages/coreHomePage/coreHome.page';
import { TestBuildingBlocks } from '../../../src/infra/utilities/testBuildingBlock';
import { TestLogger } from '../../../src/infra/loggers/test-logger';
import { CoreMainMenuEnum } from '../../../src/infra/enum/coreMainMenu-enum';
import { Vertical } from '../../../src/pages/jellycorePages/vertical/vertical.page';
import allureReporter from '@wdio/allure-reporter';
import { LoginDetails } from "../../../src/infra/models/login-detail";
import { BaseTestData } from "../../../src/infra/models/base-test-data";
import { JellycoreTestBuildingBlocks } from '../../../src/infra/utilities/jellycore-test-buildingBlock';
import { jellyCoreConfig } from '../../../src/infra/config/jellyCore.config';
import { VerticalHeader } from '../../../src/infra/enum/verticalHeader-enum';

let coreHomePage = new CoreHomePage();
const vertical = new Vertical();
let logger: TestLogger;
let testIndex = 0;
let testData: BaseTestData = new BaseTestData(undefined);
let jellycoreTestBuildingBlocks = new JellycoreTestBuildingBlocks(testData);


describe('Jellycore: Vertical module test cases', () => {

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

    it('Verify that selected column filter displaying channels table header', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Verify that in core home page new post button displaying`, () => {
            browser.pause(2000);
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.VERTICALS} on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.VERTICALS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.VERTICALS)).to.equal(true, `${CoreMainMenuEnum.VERTICALS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on column filter button`, () => {
            vertical.clickColumnFilterButton();
            expect(vertical.isColumnFilterOpenExisting()).to.equal(true, `Column filter panel was not opened`);
        });
        TestBuildingBlocks.addStepAndExecute(`Select the column ${VerticalHeader.PROFITABILITY} from filter`, () => {
            vertical.selectChannelColumn(VerticalHeader.PROFITABILITY);
            const tableHeader = vertical.getTableHeaderValues();
            const isPublishedTableExisting = [VerticalHeader.PROFITABILITY].every((enumOption) => tableHeader.includes(enumOption));
            expect(isPublishedTableExisting).to.equal(true, `Selectd column ${VerticalHeader.PROFITABILITY} was not displaying in the table`);
        });
        TestBuildingBlocks.addStepAndExecute(`Unselect the column ${VerticalHeader.PROFITABILITY} from filter`, () => {
            vertical.unSelectColumns(VerticalHeader.PROFITABILITY);
            vertical.ClickCloseColumnFilterButton();
            const tableHeader = vertical.getTableHeaderValues();
            const isPublishedTableExisting = [VerticalHeader.PROFITABILITY].every((enumOption) => tableHeader.includes(enumOption));
            expect(isPublishedTableExisting).to.equal(false, `Selectd column ${VerticalHeader.PROFITABILITY} was displaying in the table`);
        });
    });

    it('Verify that time period filter applied', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Verify that in core home page new post button displaying`, () => {
            browser.pause(2000);
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.VERTICALS} on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.VERTICALS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.VERTICALS)).to.equal(true, `${CoreMainMenuEnum.VERTICALS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on time period dropdown filter`, () => {
            vertical.clickTimePeriodFilter();
        });
        const options = "Last 30 days";
        const optionAll = "Last 7 days";
        TestBuildingBlocks.addStepAndExecute(`Select time period as ${options} from the dropdown`, () => {
            vertical.selectPeriodDropdownFilter(options);
            vertical.clickPeriodValidation('Validate');
            expect(vertical.isPeriodStatusExisting(options)).to.equal(true, `${options} post are not displaying`)
        });
        TestBuildingBlocks.addStepAndExecute(`Select time period as ${optionAll} from the dropdown`, () => {
            vertical.clickTimePeriodFilter();
            vertical.selectPeriodDropdownFilter(optionAll);
            vertical.clickPeriodValidation('Validate');
            expect(vertical.isPeriodStatusExisting(optionAll)).to.equal(true, `${optionAll} post are not displaying`)
        });
    });

    it('Verify that vertical table has all the informaton', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Verify that in core home page new post button displaying`, () => {
            browser.pause(2000);
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.VERTICALS} on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.VERTICALS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.VERTICALS)).to.equal(true, `${CoreMainMenuEnum.VERTICALS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that vertical valus are displaying in the each column`, () => {
            vertical.waitTillTableReloads();
            expect(vertical.isVerticalInfoExisting()).to.equal(true, `vertical details was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that views valus are displaying in the each column`, () => {
            expect(vertical.isViewColumnExisting()).to.equal(true, `Views details was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that earning valus are displaying in the each column`, () => {
            expect(vertical.isEeaningColumnExisting()).to.equal(true, `Earning details was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that video valus are displaying in the each column`, () => {
            expect(vertical.isVideosColumnExisting()).to.equal(true, `Video details was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that fan valus are displaying in the each column`, () => {
            expect(vertical.isFanColumnExisting()).to.equal(true, `Fan details was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that new fans valus are displaying in the each column`, () => {
            expect(vertical.isNewFansColumnExisting()).to.equal(true, `New fans details was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that view video valus are displaying in the each column`, () => {
            expect(vertical.isViewVideoColumnExisting()).to.equal(true, `View video details was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that avg watch time valus are displaying in the each column`, () => {
            expect(vertical.isAvgWatchTimeColumnExisting()).to.equal(true, `Avg watch time details was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that Earning videos valus are displaying in the each column`, () => {
            expect(vertical.isEarningVideosColumnExisting()).to.equal(true, `Earning videos details was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that spendings videos valus are displaying in the each column`, () => {
            expect(vertical.isSpendingsColumnExisting()).to.equal(true, `spendings videos details was not displaying`);
        });
    });
});