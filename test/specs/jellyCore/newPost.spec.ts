import { expect } from 'chai';
import {CoreHomePage} from '../../../src/pages/jellycorePages/coreHomePage/coreHome.page';
import {NewPostPage} from '../../../src/pages/jellycorePages/newPostPage/newPost.Page';
import {projConfig} from '../../../src/infra/resources/projConfig';
import {TestBuildingBlocks} from '../../../src/infra/utilities/testBuildingBlock';
import allureReporter from '@wdio/allure-reporter';
import path from 'path';
import { LoginDetails } from "../../../src/infra/models/login-detail";
import { BaseTestData } from "../../../src/infra/models/base-test-data";
import { JellycoreTestBuildingBlocks } from '../../../src/infra/utilities/jellycore-test-buildingBlock'

let coreHomePage = new CoreHomePage();
const newPostPage = new NewPostPage();
let testIndex = 0;
let testData: BaseTestData = new BaseTestData(undefined);
let jellycoreTestBuildingBlocks = new JellycoreTestBuildingBlocks(testData);

describe('Jellycore: Create new video post', () => {

    before(() => {
        testData = new BaseTestData(new LoginDetails(projConfig.userID, projConfig.password));
        jellycoreTestBuildingBlocks = new JellycoreTestBuildingBlocks(testData);
        coreHomePage = jellycoreTestBuildingBlocks.navigateToCoreHomePage();
    });

    beforeEach(() => {
        testIndex = testIndex+1;
        coreHomePage = jellycoreTestBuildingBlocks.navigateToCoreHomePage();
    });

    it('Verify that user can create new post from core', () => {
        allureReporter.addSeverity('critical');
        TestBuildingBlocks.addStepAndExecute(`Click on new post button`, () => {
            browser.pause(2000);
            coreHomePage.clickOnNewPost();
            expect(newPostPage.getFormatLabelText()).to.equal('Choose format', 'New post butotn was displying');
        });

        TestBuildingBlocks.addStepAndExecute(`Enter the first step fields values for new Post creation (Post)`, () => {
            const videoButton = newPostPage.isVideoButtonDisplaying();
            expect(videoButton).to.equal(true, 'Video button was not displaying');
            newPostPage.selectVideoFormat();
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

            newPostPage.enterVideoTitleTextBox('Automation Test Beauty');
            expect(newPostPage.isVideoTitleDisplaying()).to.eq(true, 'Video title was not displaying');

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
            newPostPage.enterTalents(talentsPlayer, models);*/

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
            const channelList = 'Beauty Addict'
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

        TestBuildingBlocks.addStepAndExecute(`Verify that Main page dashboard is displaying`, () => {
            newPostPage.clickValidateButton(Number(3));
            browser.pause(2000);
            const url = browser.getUrl();
            expect(url).to.contains('posts', 'Jellysmack core dashboard was not displaying');
        });
    });
});