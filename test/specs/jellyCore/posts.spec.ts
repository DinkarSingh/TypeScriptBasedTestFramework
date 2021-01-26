import { expect } from 'chai';
import { CoreHomePage } from '../../../src/pages/jellycorePages/coreHomePage/coreHome.page';
import { projConfig } from '../../../src/infra/resources/projConfig';
import { TestBuildingBlocks } from '../../../src/infra/utilities/testBuildingBlock';
import { TestLogger } from '../../../src/infra/loggers/test-logger';
import { CoreMainMenuEnum } from '../../../src/infra/enum/coreMainMenu-enum'
import { PostsPage } from '../../../src/pages/jellycorePages/postsPage/posts.page';
import { NewPostPage } from '../../../src/pages/jellycorePages/newPostPage/newPost.Page';
const path = require('path');
import { PublishedTableHeaderEnum } from '../../../src/infra/enum/publishedTableHeader-enum';
import allureReporter from '@wdio/allure-reporter';
import { LoginDetails } from "../../../src/infra/models/login-detail";
import { BaseTestData } from "../../../src/infra/models/base-test-data";
import { JellycoreTestBuildingBlocks } from '../../../src/infra/utilities/jellycore-test-buildingBlock';
import { jellyCoreConfig } from '../../../src/infra/config/jellyCore.config';

let coreHomePage = new CoreHomePage();
const postsPage = new PostsPage();
const newPostPage = new NewPostPage();
let logger: TestLogger;
let testIndex = 0;
let testData: BaseTestData = new BaseTestData(undefined);
let jellycoreTestBuildingBlocks = new JellycoreTestBuildingBlocks(testData);


describe('Jellycore: Posts module test cases', () => {

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

    it('Verify that main menu options are displaying', () => {
        TestBuildingBlocks.addStepAndExecute(`Verify that in core home page new post button displaying`, () => {
            browser.pause(2000);
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
    });

    it('Verify that sub menu are displaying for posts main menu', () => {
        TestBuildingBlocks.addStepAndExecute(`Click on main menu Posts on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.POSTS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.POSTS)).to.equal(true, `${CoreMainMenuEnum.POSTS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the posts sub menus are displaying`, () => {
            postsPage.isLoaderExisting()
            const subMenuExisting = postsPage.getSubMenuValues();
            postsPage.isLoaderExisting()
            const isMainMenusExisting = ['Published', 'Scheduled', 'To Crosspost'].every((enumOption) => subMenuExisting.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, `Posts sub main menu was not displaying`);
            expect(postsPage.isSubMenuSelected('Published')).to.equal(true, `Published sub main menu was not selected bydefult`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that Published tabel header titles displaying`, () => {
            const tableHeader = postsPage.getTableHeaderValues();
            const isPublishedTableExisting = [PublishedTableHeaderEnum.PUBLISHED_DATE].every((enumOption) => tableHeader.includes(enumOption));
            expect(isPublishedTableExisting).to.equal(true, 'Published table header was not displaying');
        });
    });

    it('Verify that scheduled post displaying after the creating new show post', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Click on new post button`, () => {
            coreHomePage.clickOnNewPost();
            expect(newPostPage.getFormatLabelText()).to.equal('Choose format', 'New post butotn was displying');
        });
        TestBuildingBlocks.addStepAndExecute(`Enter the first step fields values for new show creation (Post)`, () => {
            const videoButton = newPostPage.isVideoButtonDisplaying();
            expect(videoButton).to.equal(true, 'Video button was not displaying');
            newPostPage.selectShowFormat();
            expect(newPostPage.getPostTitleText()).to.equal('Post', 'Post text was not displaying');
            const filePath = path.join(__dirname, '/../../../data/item_test_video.mov');
            const remoteFileName = browser.uploadFile(filePath);
            const fileUpload = newPostPage.getInputFile();
            browser.execute(
                // assign style to elem in the browser
                (el) => {
                    el.style.visibility = 'visible';
                },
                // pass in element so we don't need to query it again in the browser
                fileUpload
            );
            newPostPage.setVideoTextValue(remoteFileName);
            expect(newPostPage.getVideoTitle()).to.equal('item_test_video.mov', 'Video was not uploaded');

            newPostPage.enterProductId(projConfig.production);
            expect(newPostPage.isProductionIdDisplaying()).to.eq(true, 'Production Id was not displaying');

            newPostPage.enterStatusTextBox('Automation Test Beauty');
            expect(newPostPage.isStatusDisplaying()).to.eq(true, 'Status was not displaying');

            newPostPage.enterNameOfShow('Live Gameplay');
            //expect(newPostPage.isNameOfShowExisting('Live Gameplay')).to.eq(true, 'Name of show text was not selected');

            newPostPage.enterVideoTitle('Automation Test Beauty');
            expect(newPostPage.isVideoTitleExisting()).to.eq(true, 'Video was not displaying');

            const filePathThumbnail = path.join(__dirname, '/../../../data/maxresdefault.jpg');
            const remoteFile = browser.uploadFile(filePathThumbnail);
            const fileUploads = newPostPage.getThumbnailInputFile();
            browser.execute(
                // assign style to elem in the browser
                (el) => {
                    el.style.visibility = 'visible';
                },
                // pass in element so we don't need to query it again in the browser
                fileUploads
            );
            newPostPage.setThumbnailText(remoteFile);
            expect(newPostPage.getThumbnailText()).to.equal('maxresdefault.jpg', 'Thumbnail was not uploaded');

            newPostPage.enterFirstCommentTextBox('Test Comment');
            expect(newPostPage.isFirstCommentDisplaying()).to.eq(true, 'First comment was not displaying');
        });

        TestBuildingBlocks.addStepAndExecute(`Verify that Categorisation title displaying on the top of the page`, () => {
            newPostPage.clickValidateButton(Number(0));
            expect(newPostPage.getCategorisationTitleText()).to.equal('Categorisation', 'Post step was not completed');
        });

        TestBuildingBlocks.addStepAndExecute(`Enter the second step fields values for new Post creation (Categorisation)`, () => {
            const contentTypeInput = 'Original - Jellysmack images';
            newPostPage.selectContentType(contentTypeInput);
            expect(newPostPage.getCategorisationDropdownsText()).to.eq(contentTypeInput, `There is no ${contentTypeInput} content type found in the list`);

            const formatFirstInput = 'ASMR';
            const formatSecondInput = 'Other'
            newPostPage.selectFormat(formatFirstInput, formatSecondInput);
            expect(newPostPage.getSelectFormatTagText('1')).to.eq(formatFirstInput, `There is no ${formatFirstInput} content type found in the list`);
            expect(newPostPage.getSelectFormatTagText('2')).to.eq(formatSecondInput, `There is no ${formatSecondInput} content type found in the list`);


            const toneInput = 'Absurd (Insane/Strange/Odd)';
            newPostPage.selectTone(toneInput);
            expect(newPostPage.getSelectFormatTagText('3')).to.eq(toneInput, `There is no ${toneInput} content type found in the list`);

            const styleInput = 'Animated';
            const styleSecondInput = 'Hidden Camera';
            newPostPage.selectStyle(styleInput, styleSecondInput);
            expect(newPostPage.getSelectFormatTagText('4')).to.eq(styleInput, `There is no ${styleInput} content type found in the list`);
            expect(newPostPage.getSelectFormatTagText('5')).to.eq(styleSecondInput, `There is no ${styleSecondInput} content type found in the list`);

            newPostPage.clickTrendingButton();
            expect(newPostPage.isTrendingButtonDisplaying()).to.eq(true);

            /*const talentsPlayer = 'Other';
            const models = 'Fagerlibrothers';
            newPostPage.enterTalents(talentsPlayer, models);
            expect(newPostPage.isCategorisationTagSelected(models)).to.eq(true, `There is no ${models} content type found in the list`);*/

            const facebookInput = 'BEAUTY_FASHION';
            newPostPage.selectFacebook(facebookInput);
            expect(newPostPage.getSelectFormatTagText('6')).to.eq(facebookInput, `There is no ${facebookInput} content type found in the list`);

            const tags = 'beauty';
            newPostPage.enterTags(tags);
        });

        TestBuildingBlocks.addStepAndExecute(`Verify that Setup title displaying on the top of the page`, () => {
            newPostPage.clickValidateInformation();
            expect(newPostPage.getSetupTitleText()).to.equal('Setup', 'Setup title was not displaying');
        });

        TestBuildingBlocks.addStepAndExecute(`Enter the third step fields values for new Post creation (Setup)`, () => {
            const channelList = 'The Best Of Gaming Vids';
            newPostPage.setChannelSelection(channelList);
            expect(newPostPage.isValidateButtonDisplaying('2')).to.eq(true, 'Validate schedule button was not displaying');
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that Validation title displaying on the top of the page`, () => {
            newPostPage.clickValidateButton(Number(2));
            expect(newPostPage.getValidationTitletext()).to.eq('Validation', 'Validation title was not displaying');
        });

        TestBuildingBlocks.addStepAndExecute(`Enter the fourth step fields values for new Post creation (Validation)`, () => {
            const videoEditorName = '722';
            newPostPage.setVideoEditorName(videoEditorName);
            expect(newPostPage.isValidationDropdownDisplaying()).to.eq(true, 'Video editor name was not selected');

            const videoOwnerrName = '722';
            newPostPage.setVideoOwnerName(videoOwnerrName);
            expect(newPostPage.isValidateButtonDisplaying('3')).to.eq(true, 'Video owner name was not selected');
        });

        TestBuildingBlocks.addStepAndExecute(`Verify that scheduled post video table list is displaying`, () => {
            newPostPage.clickValidateButton(Number(3));
            postsPage.isLoaderExisting();
            expect(postsPage.isSubMenuExisting()).to.equal(true, 'Post sub menu name was not displayed');
            expect(postsPage.isSubMenuSelected('Scheduled')).to.equal(true, `Scheduled sub main menu was not selected`);
        });
    });

    it('Verify that published table has all the informaton', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Click on main menu Posts on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.POSTS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.POSTS)).to.equal(true, `${CoreMainMenuEnum.POSTS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the posts sub menus are displaying`, () => {
            postsPage.isLoaderExisting()
            const subMenuExisting = postsPage.getSubMenuValues();
            browser.pause(5000);
            const isMainMenusExisting = ['Published', 'Scheduled', 'To Crosspost'].every((enumOption) => subMenuExisting.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, `Posts sub main menu was not displaying`);
            expect(postsPage.isSubMenuSelected('Published')).to.equal(true, `Published sub main menu was not selected bydefult`);
        });
        browser.pause(3000);
        postsPage.clickOnFilterButton();
        postsPage.selectPostedOnTimeSchedule("Last month");
        postsPage.clickCloseFilterButtonButton()
        TestBuildingBlocks.addStepAndExecute(`Check the table published post video icon are displaying for each post`, () => {
            browser.pause(5000);
            const videoTitle = postsPage.isPostVideoTitleExisting();
            expect(videoTitle).to.equal(true, 'Published videos does not have video title');
        });
        TestBuildingBlocks.addStepAndExecute(`Check the table published post video title and creator name are displaying for each post`, () => {
            const videoTitle = postsPage.isPostVideoTitleExisting();
            const videoChannelName = postsPage.isPostVideoChannelExisting();
            expect(videoTitle).to.equal(true, 'Published videos does not have video title');
            expect(videoChannelName).to.equal(true, 'Published videos does not have video channel name');
        });
        TestBuildingBlocks.addStepAndExecute(`Check the table values for video published dates are displaying for each post`, () => {
            const publicationDate = postsPage.isPostDateExisting();
            const publicationDateCreator = postsPage.isPostDateCreatorExisting();
            expect(publicationDate).to.equal(true, 'Published videos does not have video dates');
            expect(publicationDateCreator).to.equal(true, 'Published videos does not have video creator name');
        });
        TestBuildingBlocks.addStepAndExecute(`Check the table values for video post Earnings are displaying for each post`, () => {
            const earningValues = postsPage.isPublishedEarningExisting();
            expect(earningValues).to.equal(true, 'Published videos does not have video earnings');
        });
        TestBuildingBlocks.addStepAndExecute(`Check the table values for video post view are displaying for each post`, () => {
            const viewValues = postsPage.isPublishedViewExisting();
            expect(viewValues).to.equal(true, 'Published videos does not have video view');
        });
        TestBuildingBlocks.addStepAndExecute(`Check the table values for video post smash target are displaying for each post`, () => {
            const smashTarget = postsPage.isPublishedSmashTargetExisting();
            expect(smashTarget).to.equal(true, 'Published videos does not have video smash target');
        });
        TestBuildingBlocks.addStepAndExecute(`Check the table values for video post smash rete are displaying for each post`, () => {
            const smashRate = postsPage.isPublishedSmashRateExisting();
            expect(smashRate).to.equal(true, 'Published videos does not have video smash rate');
        });
        TestBuildingBlocks.addStepAndExecute(`Check the table values for video post smash status are displaying for each post`, () => {
            const smashStatus = postsPage.isPublishedSmashStatusExisting();
            expect(smashStatus).to.equal(true, 'Published videos does not have video smash status');
        });
    });

    it('Verify that To Crosspost table has all the informaton', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Click on main menu Posts on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.POSTS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.POSTS)).to.equal(true, `${CoreMainMenuEnum.POSTS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the posts sub menus are displaying`, () => {
            postsPage.isLoaderExisting()
            const subMenuExisting = postsPage.getSubMenuValues();
            browser.pause(5000);
            const isMainMenusExisting = ['Published', 'Scheduled', 'To Crosspost'].every((enumOption) => subMenuExisting.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, `Posts sub main menu was not displaying`);
            expect(postsPage.isSubMenuSelected('Published')).to.equal(true, `Published sub main menu was not selected bydefult`);
        });
        TestBuildingBlocks.addStepAndExecute(`Select the To crosspost sub menu`, () => {
            const subMenu = "To Crosspost";
            postsPage.selectSubMenus(subMenu);
            expect(postsPage.isSubMenuSelected(subMenu)).to.equal(true, `${subMenu} sub main menu was not selected`);
        });
        postsPage.clickOnFilterButton();
        postsPage.selectPostedOnTimeSchedule("Last month");
        postsPage.clickCloseFilterButtonButton();
        TestBuildingBlocks.addStepAndExecute(`Check the videostitile for crosspost are displaying in the table`, () => {
            const videoTitle = postsPage.isPostVideoTitleExisting();
            expect(videoTitle).to.equal(true, 'Crosspost videos does not have video title');
        });
        TestBuildingBlocks.addStepAndExecute(`Check the table crosspost post video title and creator name are displaying for each post`, () => {
            const videoTitle = postsPage.isPostVideoTitleExisting();
            const videoChannelName = postsPage.isPostVideoChannelExisting();
            expect(videoTitle).to.equal(true, 'Crosspost videos does not have video title');
            expect(videoChannelName).to.equal(true, 'Crosspost videos does not have video channel name');
        });
        TestBuildingBlocks.addStepAndExecute(`Check the table values for video Crosspost dates are displaying for each post`, () => {
            const publicationDate = postsPage.isPostDateExisting();
            const publicationDateCreator = postsPage.isPostDateCreatorExisting();
            expect(publicationDate).to.equal(true, 'Crosspost videos does not have video dates');
            expect(publicationDateCreator).to.equal(true, 'Crosspost videos does not have video creator name');
        });
        TestBuildingBlocks.addStepAndExecute(`Check report scrore values are displaying in the crosspost table`, () => {
            const earningValues = postsPage.isReportScoreExisting();
            expect(earningValues).to.equal(true, 'Crosspost videos does not have video report scrore');
        });
        TestBuildingBlocks.addStepAndExecute(`Check publishing date gap values are displaying in the crosspost table`, () => {
            const viewValues = postsPage.isPublishingDateGapExisting();
            expect(viewValues).to.equal(true, 'Crosspost videos does not have publishing date gap');
        });
        TestBuildingBlocks.addStepAndExecute(`Check the number of crosspost values are displaying in the crosspost table`, () => {
            const smashTarget = postsPage.isNumberOfCrosspostExisting();
            expect(smashTarget).to.equal(true, 'Crosspost videos does not have video number of crosspost');
        });
        TestBuildingBlocks.addStepAndExecute(`Check the Earnings values are displaying in the crosspost table`, () => {
            const smashRate = postsPage.isCrosspostEarningsExisting();
            expect(smashRate).to.equal(true, 'Crosspost videos does not have video Earnings');
        });
        TestBuildingBlocks.addStepAndExecute(`Check the last 7 days earning values are displaying in the crosspost table`, () => {
            const smashStatus = postsPage.isLastSevenDaysEarningExisting();
            expect(smashStatus).to.equal(true, 'Crosspost videos does not have video last 7 days earning');
        });
        TestBuildingBlocks.addStepAndExecute(`Check the last day earning values are displaying in the crosspost table`, () => {
            const smashStatus = postsPage.isLastDayEarningExisting();
            expect(smashStatus).to.equal(true, 'Crosspost videos does not have video last day earning');
        });
    });

    it('Verify that graph linked is displaying as absolute and relative for published post', () => {
        allureReporter.addSeverity('critical');
        const absoluteGraph = "absolute";
        const relativeGraph = "relative";
        const page = "Page";
        const Vertical = "vertical";
        const All_Jellysmack = "All Jellysmack";
        TestBuildingBlocks.addStepAndExecute(`Click on main menu Posts on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.POSTS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.POSTS)).to.equal(true, `${CoreMainMenuEnum.POSTS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the posts sub menus are displaying`, () => {
            postsPage.isLoaderExisting()
            const subMenuExisting = postsPage.getSubMenuValues();
            browser.pause(5000);
            const isMainMenusExisting = ['Published', 'Scheduled', 'To Crosspost'].every((enumOption) => subMenuExisting.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, `Posts sub main menu was not displaying`);
            expect(postsPage.isSubMenuSelected('Published')).to.equal(true, `Published sub main menu was not selected bydefult`);
        });
        postsPage.clickOnFilterButton();
        postsPage.selectPostedOnTimeSchedule("All time");
        postsPage.clickCloseFilterButtonButton();
        postsPage.selectPublihedTableHeader("Smash rate");
        postsPage.waitTillTableReloads();
        const postTitle = postsPage.videoPostTitle();
        TestBuildingBlocks.addStepAndExecute(`Select the post from the list`, () => {
            postsPage.ClickOnFirstRowIcon();
            const graphVideoTitle = postsPage.getGraphVideoTitle();
            expect(graphVideoTitle).to.equal(postTitle[0], `Post tile ${postTitle} was different on graph title as ${graphVideoTitle}`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check that video is displaying`, () => {
            expect(postsPage.isVideoLinkExisting()).to.equal(true, `Graph video was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check that ${absoluteGraph} graph is displaying`, () => {
            expect(postsPage.isAbsoluteCheckBoxChecked()).to.equal(true, `${absoluteGraph} graph was not selected`);
            expect(postsPage.isAbsoluteGraphDisplaying()).to.equal(true, `${absoluteGraph} graph was not Displayed`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check that ${relativeGraph} graph was displaying`, () => {
            postsPage.selectGraphCheckBox(relativeGraph);
            browser.pause(3000);
            expect(postsPage.isRelativeCheckBoxChecked()).to.equal(true, `${relativeGraph} graph was not selected`);
            expect(postsPage.isRelativeGraphDisplaying()).to.equal(true, `${relativeGraph} graph was not Displayed`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check that ${relativeGraph} graph has page, Vercal and All Jellysmack`, () => {
            TestBuildingBlocks.addStepAndExecute(`Verify that ${page} radio button by default selected`, () => {
                expect(postsPage.isGraphDetailTextExisting('page')).to.equal(true, `Graph note text was not Displayed`);
            });
            TestBuildingBlocks.addStepAndExecute(`Click on the ${Vertical} radio button for relative graph`, () => {
                postsPage.selectGraphCheckBox(Vertical);
                browser.pause(3000);
            });
            TestBuildingBlocks.addStepAndExecute(`Verify that ${Vertical} radio button checked`, () => {
                expect(postsPage.isGraphDetailTextExisting(Vertical)).to.equal(true, `Graph note text was not Displayed`);
            });
            TestBuildingBlocks.addStepAndExecute(`Select the ${All_Jellysmack} radio button for relative graph`, () => {
                postsPage.selectGraphCheckBox('all');
                browser.pause(3000);
            });
            TestBuildingBlocks.addStepAndExecute(`Verify that ${All_Jellysmack} radio button checked`, () => {
                expect(postsPage.isGraphDetailTextExisting('AB tested in the past')).to.equal(true, `Graph note text was not Displayed`);
            });
        });
    });

    it('Verify that social platform link is working for published graph section', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Click on main menu Posts on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.POSTS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.POSTS)).to.equal(true, `${CoreMainMenuEnum.POSTS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the posts sub menus are displaying`, () => {
            postsPage.isLoaderExisting()
            const subMenuExisting = postsPage.getSubMenuValues();
            browser.pause(5000);
            const isMainMenusExisting = ['Published', 'Scheduled', 'To Crosspost'].every((enumOption) => subMenuExisting.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, `Posts sub main menu was not displaying`);
            expect(postsPage.isSubMenuSelected('Published')).to.equal(true, `Published sub main menu was not selected bydefault`);
        });
        postsPage.clickOnFilterButton();
        postsPage.selectPostedOnTimeSchedule("All time");
        postsPage.clickCloseFilterButtonButton();
        const postTitle = postsPage.videoPostTitle();
        TestBuildingBlocks.addStepAndExecute(`Select the post from the list`, () => {
            postsPage.ClickOnFirstRowIcon();
            const graphVideoTitle = postsPage.getGraphVideoTitle();
            expect(graphVideoTitle).to.equal(postTitle[0], `Post tile ${postTitle} was different on graph title as ${graphVideoTitle}`);
        });
        const graphVideoTitle = postsPage.getGraphVideoTitle().substring(0,20);
        TestBuildingBlocks.addStepAndExecute(`Click on the facebook link`, () => {
            postsPage.ClickOnFBLink();
        });
        /*TestBuildingBlocks.addStepAndExecute(`Verify that opened facebook has same title as video title`, () => {
            const videoTitle = browser.getTitle().split('-');
            const videoOnlyTitle = videoTitle[1].trim();
            expect(videoOnlyTitle).to.contains(graphVideoTitle, `Fecebook link was wrong`);
        });*/
    });

    it('Verify that graph linked is displaying as absolute and relative for to crosspost', () => {
        allureReporter.addSeverity('critical');
        const absoluteGraph = "absolute";
        const relativeGraph = "relative";
        const page = "Page";
        const Vertical = "vertical";
        const All_Jellysmack = "All Jellysmack";
        TestBuildingBlocks.addStepAndExecute(`Click on main menu Posts on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.POSTS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.POSTS)).to.equal(true, `${CoreMainMenuEnum.POSTS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the posts sub menus are displaying`, () => {
            postsPage.isLoaderExisting()
            const subMenuExisting = postsPage.getSubMenuValues();
            browser.pause(5000);
            const isMainMenusExisting = ['Published', 'Scheduled', 'To Crosspost'].every((enumOption) => subMenuExisting.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, `Posts sub main menu was not displaying`);
            expect(postsPage.isSubMenuSelected('Published')).to.equal(true, `Published sub main menu was not selected bydefult`);
        });
        TestBuildingBlocks.addStepAndExecute(`Select the To crosspost sub menu`, () => {
            const subMenu = "To Crosspost";
            postsPage.selectSubMenus(subMenu);
            expect(postsPage.isSubMenuSelected(subMenu)).to.equal(true, `${subMenu} sub main menu was not selected`);
        });
        postsPage.clickOnFilterButton();
        postsPage.selectPostedOnTimeSchedule("All time");
        postsPage.clickCloseFilterButtonButton();
        postsPage.selectPublihedTableHeader("Earnings");
        postsPage.waitTillTableReloads();
        const postTitle = postsPage.videoPostTitle();
        TestBuildingBlocks.addStepAndExecute(`Select the post from the list`, () => {
            postsPage.ClickOnFirstRowIcon();
            const graphVideoTitle = postsPage.getGraphVideoTitle();
            expect(graphVideoTitle).to.equal(postTitle[0], `Post tile ${postTitle} was different on graph title as ${graphVideoTitle}`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check that video is displaying`, () => {
            expect(postsPage.isVideoLinkExisting()).to.equal(true, `Graph video was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check that ${absoluteGraph} graph is displaying`, () => {
            expect(postsPage.isAbsoluteCheckBoxChecked()).to.equal(true, `${absoluteGraph} graph was not selected`);
            expect(postsPage.isAbsoluteGraphDisplaying()).to.equal(true, `${absoluteGraph} graph was not Displayed`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check that ${relativeGraph} graph is displaying`, () => {
            postsPage.selectGraphCheckBox(relativeGraph);
            browser.pause(3000);
            expect(postsPage.isRelativeCheckBoxChecked()).to.equal(true, `${relativeGraph} graph was not selected`);
            expect(postsPage.isRelativeGraphDisplaying()).to.equal(true, `${relativeGraph} graph was not Displayed`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check that ${relativeGraph} graph has page, Vercal and All Jellysmack`, () => {
            TestBuildingBlocks.addStepAndExecute(`Verify that ${page} radio button by default selected`, () => {
                expect(postsPage.isGraphDetailTextExisting('page')).to.equal(true, `Graph note text was not Displayed`);
            });
            TestBuildingBlocks.addStepAndExecute(`Click on the ${Vertical} radio button for relative graph`, () => {
                postsPage.selectGraphCheckBox(Vertical);
                browser.pause(3000);
            });
            TestBuildingBlocks.addStepAndExecute(`Verify that ${Vertical} radio button checked`, () => {
                expect(postsPage.isGraphDetailTextExisting(Vertical)).to.equal(true, `Graph note text was not Displayed`);
            });
            TestBuildingBlocks.addStepAndExecute(`Select the ${All_Jellysmack} radio button for relative graph`, () => {
                postsPage.selectGraphCheckBox('all');
                browser.pause(3000);
            });
            TestBuildingBlocks.addStepAndExecute(`Verify that ${All_Jellysmack} radio button checked`, () => {
                expect(postsPage.isGraphDetailTextExisting('AB tested in the past')).to.equal(true, `Graph note text was not Displayed`);
            });
        });
    });

    it('Verify that social platform link is working for to crosspost graph section', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Click on main menu Posts on page`, () => {
            coreHomePage.selectManuBar(CoreMainMenuEnum.POSTS);
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.POSTS)).to.equal(true, `${CoreMainMenuEnum.POSTS} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Check the posts sub menus are displaying`, () => {
            postsPage.isLoaderExisting()
            const subMenuExisting = postsPage.getSubMenuValues();
            browser.pause(5000);
            const isMainMenusExisting = ['Published', 'Scheduled', 'To Crosspost'].every((enumOption) => subMenuExisting.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, `Posts sub main menu was not displaying`);
            expect(postsPage.isSubMenuSelected('Published')).to.equal(true, `Published sub main menu was not selected bydefult`);
        });
        TestBuildingBlocks.addStepAndExecute(`Select the To crosspost sub menu`, () => {
            const subMenu = "To Crosspost";
            postsPage.selectSubMenus(subMenu);
            expect(postsPage.isSubMenuSelected(subMenu)).to.equal(true, `${subMenu} sub main menu was not selected`);
        });
        postsPage.clickOnFilterButton();
        postsPage.selectPostedOnTimeSchedule("All time");
        postsPage.clickCloseFilterButtonButton();
        postsPage.selectPublihedTableHeader("Earnings");
        postsPage.waitTillTableReloads();
        browser.pause(5000);
        const postTitle = postsPage.videoPostTitle();
        TestBuildingBlocks.addStepAndExecute(`Select the post from the list`, () => {
            browser.pause(5000);
            postsPage.ClickOnFirstRowIcon();
            const graphVideoTitle = postsPage.getGraphVideoTitle();
            expect(graphVideoTitle).to.equal(postTitle[0], `Post tile ${postTitle} was different on graph title as ${graphVideoTitle}`);
        });
        const graphVideoTitle = postsPage.getGraphVideoTitle().substring(0,20);
        TestBuildingBlocks.addStepAndExecute(`Click on the facebook link`, () => {
            postsPage.ClickOnFBLink();
        });
        /*TestBuildingBlocks.addStepAndExecute(`Verify that opened facebook has same title as video title`, () => {
            const videoTitle = browser.getTitle().split('-');
            const videoOnlyTitle = videoTitle[1].trim();
            expect(videoOnlyTitle).to.contains(graphVideoTitle, `Fecebook link was wrong`);
        });*/
    });

});