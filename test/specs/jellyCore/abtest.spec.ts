import { expect } from 'chai';
import { CoreHomePage } from '../../../src/pages/jellycorePages/coreHomePage/coreHome.page';
import { TestBuildingBlocks } from '../../../src/infra/utilities/testBuildingBlock';
import { TestLogger } from '../../../src/infra/loggers/test-logger';
import { CoreMainMenuEnum } from '../../../src/infra/enum/coreMainMenu-enum'
import { Abtest } from '../../../src/pages/jellycorePages/abTest/abtest.page';
import allureReporter from '@wdio/allure-reporter';
import { LoginDetails } from "../../../src/infra/models/login-detail";
import { BaseTestData } from "../../../src/infra/models/base-test-data";
import { JellycoreTestBuildingBlocks } from '../../../src/infra/utilities/jellycore-test-buildingBlock';
import { jellyCoreConfig } from '../../../src/infra/config/jellyCore.config';
const path = require('path');

let coreHomePage = new CoreHomePage();
const abtest = new Abtest();
let logger: TestLogger;
let testIndex = 0;
let testData: BaseTestData = new BaseTestData(undefined);
let jellycoreTestBuildingBlocks = new JellycoreTestBuildingBlocks(testData);


describe('Jellycore: Abtest module test cases', () => {

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

    it('Verify that new ab test post can create', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Verify that home page is displaying`, () => {
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.AB_TEST} on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.AB_TEST);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.AB_TEST)).to.equal(true, `${CoreMainMenuEnum.AB_TEST} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on new compaign button`, () => {
            abtest.waitTillTableReloads();
            expect(abtest.getNewButtonText()).to.equal('New Facebook AB test', `New compaign panel was not displaying`);
            abtest.clickNewCompaignButton(); 
            expect(abtest.isNewCompaignPanelOpened()).to.equal(true, `New compaign panel was not displaying`);
        });
        const campaingName = "QA automaton test";
        const pageName = "Gamology - The Best of Gaming";
        const audience = "3S VIEWS SEPHORA BRAND CONTENT";
        const location = "France";
        const expectTitle = "AB - QA automaton test";
        TestBuildingBlocks.addStepAndExecute(`Enter the ab test informations details`, () => {
            abtest.enterCampaignName(campaingName);
            abtest.selectCampaignPage(pageName);
            //abtest.selectCampaignAudience(audience);
            //abtest.selectCampaignGeolocation(location);
            expect(abtest.isValidationInfoButtonEnabled()).to.equal(true, `Validation information button was not enabled`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on validation information button`, () => {
            abtest.clickOnValidationButton()
            expect(abtest.isInformationTabsExisting()).to.equal(true, `Information tab was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Enter the second step informations`, () => {
            const filePath = path.join(__dirname, '/../../../data/item_test_video.mov');
            const remoteFileName = browser.uploadFile(filePath);
            const fileUpload = abtest.getInputFile();
            browser.execute(
                // assign style to elem in the browser
                (el) => {
                    el.style.visibility = 'visible';
                },
                // pass in element so we don't need to query it again in the browser
                fileUpload
            );
            abtest.setInputTextValue(remoteFileName);
            browser.pause(5000);
            expect(abtest.getVideoTitle()).to.equal('item_test_video.mov', 'Video was not uploaded');

            const filePathThumbnail = path.join(__dirname, '/../../../data/maxresdefault.jpg');
            const remoteFile = browser.uploadFile(filePathThumbnail);
            const fileUploads = abtest.getInputFile();
            browser.execute(
                // assign style to elem in the browser
                (el) => {
                    el.style.visibility = 'visible';
                },
                // pass in element so we don't need to query it again in the browser
                fileUploads
            );
            abtest.setInputTextValue(remoteFile);
            expect(abtest.getThumbnailText()).to.equal('maxresdefault.jpg', 'Thumbnail was not uploaded');

            abtest.enterTagLineInput('Beauty');
            browser.pause(2000);
            expect(abtest.isSecondStepValidationButtonEnabled()).to.equal(true, `Information tab was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on second step validation information button`, () => {
            abtest.clickOnValidationFileButton();
            expect(abtest.isCombinationTabsExisting()).to.equal(true, `Combination tab was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on combination validation information button`, () => {
            abtest.clickOnCombinationValidationFile();
            abtest.waitTillTableReloads();
            const postTitle = abtest.abtestPostTitles();
            expect(expectTitle).to.equal(postTitle[0], `Ab test ${campaingName} post was not displaying in table`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check that created abtest post is displaying in the table`, () => {
            const postTitle = abtest.abtestPostTitles();
            expect(expectTitle).to.equal(postTitle[0], `Ab test ${campaingName} post was not displaying in table`);
        });
    });

    it('Verify that new ab test with toggle activated post can create', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Verify that home page is displaying`, () => {
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.AB_TEST} on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.AB_TEST);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.AB_TEST)).to.equal(true, `${CoreMainMenuEnum.AB_TEST} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on new compaign button`, () => {
            abtest.waitTillTableReloads();
            expect(abtest.getNewButtonText()).to.equal('New Facebook AB test', `New compaign panel was not displaying`);
            abtest.clickNewCompaignButton();
            expect(abtest.isNewCompaignPanelOpened()).to.equal(true, `New compaign panel was not displaying`);
        });
        const campaingName = "QA automaton test";
        const pageName = "Gamology - The Best of Gaming";
        const audience = "3S VIEWS SEPHORA BRAND CONTENT";
        const location = "France";
        const expectTitle = "AB - QA automaton test";
        TestBuildingBlocks.addStepAndExecute(`Enter the ab test informations details`, () => {
            abtest.enterCampaignName(campaingName);
            abtest.selectCampaignPage(pageName);
            //abtest.selectCampaignAudience(audience);
            //abtest.selectCampaignGeolocation(location);
            abtest.selectCampaignNewCreatorTestingToggle();
            const toggleText = abtest.getToggleTextURL().split('Ex:')
            const url = toggleText[1].trim()
            abtest.enterTextToggleURL(url);
            expect(abtest.isValidationInfoButtonEnabled()).to.equal(true, `Validation information button was not enabled`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on validation information button`, () => {
            abtest.clickOnValidationButton()
            expect(abtest.isInformationTabsExisting()).to.equal(true, `Information tab was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Enter the second step informations`, () => {
            const filePath = path.join(__dirname, '/../../../data/item_test_video.mov');
            const remoteFileName = browser.uploadFile(filePath);
            const fileUpload = abtest.getInputFile();
            browser.execute(
                // assign style to elem in the browser
                (el) => {
                    el.style.visibility = 'visible';
                },
                // pass in element so we don't need to query it again in the browser
                fileUpload
            );
            abtest.setInputTextValue(remoteFileName);
            browser.pause(5000);
            expect(abtest.getVideoTitle()).to.equal('item_test_video.mov', 'Video was not uploaded');

            const filePathThumbnail = path.join(__dirname, '/../../../data/maxresdefault.jpg');
            const remoteFile = browser.uploadFile(filePathThumbnail);
            const fileUploads = abtest.getInputFile();
            browser.execute(
                // assign style to elem in the browser
                (el) => {
                    el.style.visibility = 'visible';
                },
                // pass in element so we don't need to query it again in the browser
                fileUploads
            );
            abtest.setInputTextValue(remoteFile);
            expect(abtest.getThumbnailText()).to.equal('maxresdefault.jpg', 'Thumbnail was not uploaded');

            abtest.enterTagLineInput('Beauty');
            browser.pause(2000);
            expect(abtest.isSecondStepValidationButtonEnabled()).to.equal(true, `Information tab was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on second step validation information button`, () => {
            abtest.clickOnValidationFileButton();
            expect(abtest.isCombinationTabsExisting()).to.equal(true, `Combination tab was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on combination validation information button`, () => {
            abtest.clickOnCombinationValidationFile();
            abtest.waitTillTableReloads();
            const postTitle = abtest.abtestPostTitles();
            expect(expectTitle).to.equal(postTitle[0], `Ab test ${campaingName} post was not displaying in table`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check that created abtest post is displaying in the table`, () => {
            const postTitle = abtest.abtestPostTitles();
            expect(expectTitle).to.equal(postTitle[0], `Ab test ${campaingName} post was not displaying in table`);
        });
    });


    it('Verify that ab test detail page has retention graph (absolute, relative) are displaying', () => {
        allureReporter.addSeverity('critical');
        const postName = "AB - MULLY-the boys go overweight";
        const absoluteGraph = "absolute";
        const relativeGraph = "relative";
        const page = "Page";
        const Vertical = "vertical";
        const All_Jellysmack = "All Jellysmack";
        TestBuildingBlocks.addStepAndExecute(`Verify that home page is displaying`, () => {
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.AB_TEST} on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.AB_TEST);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.AB_TEST)).to.equal(true, `${CoreMainMenuEnum.AB_TEST} main menu was not selected`);
        });
        abtest.waitTillTableReloads();
        abtest.selectStatusFilterOption('Finished');
        abtest.waitTillTableReloads();
        abtest.selectTableHeader('Score');
        abtest.waitTillTableReloads();
        const postTitle = abtest.getPostTitle();
        TestBuildingBlocks.addStepAndExecute(`Click on the post title`, () => {
            abtest.clickOnAbTestPost();
            const detailPostTitle = abtest.getDetailPostTitle();
            expect(postTitle).to.equal(detailPostTitle, `Post title was not same`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on the title for post details page`, () => {
            abtest.clickOnAbtestPost();
            expect(abtest.isAbTestSideBarExisting()).to.equal(true, `Ab test side bar was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check that ${absoluteGraph} graph is displaying`, () => {
            expect(abtest.isAbsoluteCheckBoxChecked()).to.equal(true, `${absoluteGraph} graph was not selected`);
            expect(abtest.isAbsoluteGraphDisplaying()).to.equal(true, `${absoluteGraph} graph was not Displayed`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check that ${relativeGraph} graph is displaying`, () => {
            abtest.selectGraphCheckBox(relativeGraph);
            browser.pause(3000);
            expect(abtest.isRelativeCheckBoxChecked()).to.equal(true, `${relativeGraph} graph was not selected`);
            expect(abtest.isRelativeGraphDisplaying()).to.equal(true, `${relativeGraph} graph was not Displayed`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check that ${relativeGraph} graph has page, Vercal and All Jellysmack`, () => {
            TestBuildingBlocks.addStepAndExecute(`Verify that ${page} radio button by default selected`, () => {
                expect(abtest.isGraphDetailTextExisting('page')).to.equal(true, `Graph note text was not Displayed`);
            });
            TestBuildingBlocks.addStepAndExecute(`Click on the ${Vertical} radio button for relative graph`, () => {
                abtest.selectGraphCheckBox(Vertical);
                browser.pause(3000);
            });
            TestBuildingBlocks.addStepAndExecute(`Verify that ${Vertical} radio button checked`, () => {
                expect(abtest.isGraphDetailTextExisting(Vertical)).to.equal(true, `Graph note text was not Displayed`);
            });
            TestBuildingBlocks.addStepAndExecute(`Select the ${All_Jellysmack} radio button for relative graph`, () => {
                abtest.selectGraphCheckBox('all');
                browser.pause(3000);
            });
            TestBuildingBlocks.addStepAndExecute(`Verify that ${All_Jellysmack} radio button checked`, () => {
                expect(abtest.isGraphDetailTextExisting('AB tested in the past')).to.equal(true, `Graph note text was not Displayed`);
            });
        });
    });

    it('Verify that abtest post has leader tag is displaying', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Verify that home page is displaying`, () => {
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.AB_TEST} on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.AB_TEST);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.AB_TEST)).to.equal(true, `${CoreMainMenuEnum.AB_TEST} main menu was not selected`);
        });
        abtest.waitTillTableReloads();
        abtest.selectStatusFilterOption('Finished');
        abtest.waitTillTableReloads();
        const postTitle = abtest.getPostTitle();
        TestBuildingBlocks.addStepAndExecute(`Click on the post title`, () => {
            abtest.clickOnAbTestPost();
            const detailPostTitle = abtest.getDetailPostTitle();
            expect(postTitle).to.equal(detailPostTitle, `Post title was not same`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check that leader tag is displaying on abtest post`, () => {
            const tagLeader = abtest.isLeaderTagExisting('Leader');
            expect(tagLeader).to.equal(true, `Leader tag was not displayed on post`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on the title for post details page`, () => {
            abtest.clickOnAbtestPost();
            expect(abtest.isAbTestSideBarExisting()).to.equal(true, `Ab test side bar was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check that leader tag is displaying on top of graph`, () => {
            const tagLeader = abtest.isSideBarLeaderTagExisting();
            expect(tagLeader).to.equal(true, `Leader tag was not displaying in the side bar`);
        });
    });


    it('Verify that why campaign is rejected with pop-up', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Verify that home page is displaying`, () => {
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.AB_TEST} on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.AB_TEST);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.AB_TEST)).to.equal(true, `${CoreMainMenuEnum.AB_TEST} main menu was not selected`);
        });
        abtest.waitTillTableReloads();
        abtest.selectStatusFilterOption('Rejected');
        abtest.waitTillTableReloads();
        TestBuildingBlocks.addStepAndExecute(`Click on the rejected button on the abtest table column`, () => {
            abtest.clickOnRejectionButton();
            const isPopUpExisting = abtest.isRejectionPopTextExisting();
            expect(isPopUpExisting).to.equal(true, `Rejection Pop-up was not displayed`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on the OK button on rejected pop-up`, () => {
            abtest.clickOnPopUpButton();
            expect(abtest.isRejectedPopUpExisting()).to.equal(false, `Rejection Pop-up was displayed`);
        });
    });

    it('Verify that able to filter the campaign with the statuses', () => {
        allureReporter.addSeverity('critical');
        const allStausFilter = "All Status";
        const activeFilter = "Active";
        const deletedFilter = "Deleted";
        const inReviewFilter = "In Review";
        const finishedFilter = "Finished";
        const rejectedFilter = "Rejected";
        TestBuildingBlocks.addStepAndExecute(`Verify that home page is displaying`, () => {
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.AB_TEST} on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.AB_TEST);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.AB_TEST)).to.equal(true, `${CoreMainMenuEnum.AB_TEST} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Select the status filter as ${activeFilter}`, () => {
            abtest.waitTillTableReloads();
            abtest.selectStatusFilterOption(activeFilter);
            const columnvalue = abtest.abtestPostStatusValues();
            const isAbtestStatusExisting = [activeFilter].every((enumOption) => columnvalue.includes(enumOption));
            expect(isAbtestStatusExisting).to.equal(true, `${activeFilter} status was not displaying in table`);
        });
        TestBuildingBlocks.addStepAndExecute(`Select the status filter as ${deletedFilter}`, () => {
            abtest.waitTillTableReloads();
            abtest.selectStatusFilterOption(deletedFilter);
            const columnvalue = abtest.abtestPostStatusValues();
            const isAbtestStatusExisting = [deletedFilter].every((enumOption) => columnvalue.includes(enumOption));
            expect(isAbtestStatusExisting).to.equal(true, `${deletedFilter} status was not displaying in table`);
        });
        TestBuildingBlocks.addStepAndExecute(`Select the status filter as ${inReviewFilter}`, () => {
            abtest.waitTillTableReloads();
            abtest.selectStatusFilterOption(inReviewFilter);
            const columnvalue = abtest.abtestPostStatusValues();
            const isAbtestStatusExisting = [inReviewFilter].every((enumOption) => columnvalue.includes(enumOption));
            expect(isAbtestStatusExisting).to.equal(true, `${inReviewFilter} status was not displaying in table`);
        });
        TestBuildingBlocks.addStepAndExecute(`Select the status filter as ${finishedFilter}`, () => {
            abtest.waitTillTableReloads();
            abtest.selectStatusFilterOption(finishedFilter);
            const columnvalue = abtest.abtestPostStatusValues();
            const isAbtestStatusExisting = [finishedFilter].every((enumOption) => columnvalue.includes(enumOption));
            expect(isAbtestStatusExisting).to.equal(true, `${finishedFilter} status was not displaying in table`);
        });
        TestBuildingBlocks.addStepAndExecute(`Select the status filter as ${rejectedFilter}`, () => {
            abtest.waitTillTableReloads();
            abtest.selectStatusFilterOption(rejectedFilter);
            const columnvalue = abtest.abtestPostStatusValues();
            const isAbtestStatusExisting = [rejectedFilter].every((enumOption) => columnvalue.includes(enumOption));
            expect(isAbtestStatusExisting).to.equal(true, `${rejectedFilter} status was not displaying in table`);
        });
    });

    it('Verify that select an audience in the dropdown when creating an AB Test (depending on the page the audience will change)', () => {
        allureReporter.addSeverity('critical');
        const campaingName = "QA automaton test";
        const pageName = "Beauty Studio";
        const audiance = "Lookalike (US, 1%) - People who like Beaut...";
        const locaiton = "United States"
        TestBuildingBlocks.addStepAndExecute(`Verify that home page is displaying`, () => {
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.AB_TEST} on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.AB_TEST);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.AB_TEST)).to.equal(true, `${CoreMainMenuEnum.AB_TEST} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on new compaign button`, () => {
            abtest.waitTillTableReloads();
            expect(abtest.getNewButtonText()).to.equal('New Facebook AB test', `New compaign panel was not displaying`);
            abtest.clickNewCompaignButton();
            expect(abtest.isNewCompaignPanelOpened()).to.equal(true, `New compaign panel was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Enter ab test campaign name`, () => {
            abtest.enterCampaignName(campaingName);
        });
        TestBuildingBlocks.addStepAndExecute(`Enter the page name ${pageName}`, () => {
            abtest.selectCampaignPage(pageName);
            expect(abtest.isAbtestPageValueDispalying(pageName)).to.equal(true, `${pageName} text was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that audiance name is selected as  ${audiance}`, () => {
            expect(abtest.isAbtestAudianceValueDispalying(audiance)).to.equal(true, `${audiance} text was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that geo location name is selected as  ${locaiton}`, () => {
            expect(abtest.isAbtestGeoLocationValueDispalying(locaiton)).to.equal(true, `${locaiton} text was not selected`);
        });
    });
});