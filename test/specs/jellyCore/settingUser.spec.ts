import { expect } from 'chai';
import { CoreHomePage } from '../../../src/pages/jellycorePages/coreHomePage/coreHome.page';
import { TestBuildingBlocks } from '../../../src/infra/utilities/testBuildingBlock';
import { TestLogger } from '../../../src/infra/loggers/test-logger';
import { Logout } from '../../../src/pages/jellycorePages/logout/logout.page';
import { CoreLogin } from '../../../src/pages/jellycorePages/login/coreLogin.page';
import { SettingUser } from '../../../src/pages/jellycorePages/settinguser/settingUser.page';
import { LoginDetails } from "../../../src/infra/models/login-detail";
import { BaseTestData } from "../../../src/infra/models/base-test-data";
import { JellycoreTestBuildingBlocks } from '../../../src/infra/utilities/jellycore-test-buildingBlock';
import { jellyCoreConfig } from '../../../src/infra/config/jellyCore.config';
import { CoreMainMenuEnum } from '../../../src/infra/enum/coreMainMenu-enum';
import allureReporter from '@wdio/allure-reporter';
const path = require('path');
import { projConfig } from '../../../src/infra/resources/projConfig';

let coreHomePage = new CoreHomePage();
const logout = new Logout();
const coreLogin = new CoreLogin();
const settingUser = new SettingUser();
let logger: TestLogger;
let testIndex = 0;
let testData: BaseTestData = new BaseTestData(undefined);
let jellycoreTestBuildingBlocks = new JellycoreTestBuildingBlocks(testData);


describe('Jellycore: User setting module test cases', () => {

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

    it('Verify that new user creation, edit and delete can be possible', () => {
        allureReporter.addSeverity('critical');
        const userLogin = 'QATest' + Math.floor((Math.random() * 1000000) + 1);
        const userName = 'QATest' + Math.floor((Math.random() * 1000000) + 1);
        const userPwd = "123";
        const userEmail = "d.karanvanshi@jellysmack.com";
        const userCountry = "France";
        const userLevel = "Employee";
        const userRole = "Community Manager";
        const userThematicChoice = "Gaming";
        TestBuildingBlocks.addStepAndExecute(`Verify that home page is displaying`, () => {
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.SETTING} and select the User`, () => {
            settingUser.moveToSettingMenu();
            settingUser.selectSettingOption('Users')
            expect(settingUser.isAddNewUserButtonExisting()).to.equal(true, `Add new users button was not displayed`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on button Add a new user`, () => {
            settingUser.clickOnAddNewUserButton();
            expect(settingUser.isTitlePageExisting()).to.equal(true, `Add new users panel was not displayed`);
        });
        TestBuildingBlocks.addStepAndExecute(`User creation steps`, () => {
            TestBuildingBlocks.addStepAndExecute(`Enter the new user login as ${userLogin}`, () => {
                settingUser.enterUserLogin(userLogin);
            });
            TestBuildingBlocks.addStepAndExecute(`Enter the new user name as ${userName}`, () => {
                settingUser.enterUserName(userName);
            });
            TestBuildingBlocks.addStepAndExecute(`Enter the new user password as ${userPwd}`, () => {
                settingUser.enterUserPassword(userPwd);
            });
            TestBuildingBlocks.addStepAndExecute(`Enter the new user email as ${userEmail}`, () => {
                settingUser.enterUserEmail(userEmail);
            });
            TestBuildingBlocks.addStepAndExecute(`Enter the new user country as ${userCountry}`, () => {
                settingUser.enterUserCountry(userCountry);
            });
            TestBuildingBlocks.addStepAndExecute(`Enter the new user country as ${userLevel}`, () => {
                settingUser.enterUserLevel(userLevel);
            });
            TestBuildingBlocks.addStepAndExecute(`Enter the new user role as ${userRole}`, () => {
                settingUser.enterUserRole(userRole);
            });
            TestBuildingBlocks.addStepAndExecute(`Enter the new user thematic choice as ${userThematicChoice}`, () => {
                settingUser.enterUserThematicChoice(userThematicChoice);
            });
            expect(settingUser.isAddThisUserButtonExisting()).to.equal(true, `Add new users button was not displayed`);
            TestBuildingBlocks.addStepAndExecute(`Click on Add this user button`, () => {
                settingUser.clickOnAddThisUserButton();
                expect(settingUser.isTableHeadersExisting()).to.equal(true, `Table header was not displayed in the list`);
            });
            TestBuildingBlocks.addStepAndExecute(`Verify successfully created the user`, () => {
                settingUser.enterUserForSearch(userName);
                expect(settingUser.isUserNameExistingAndDisplaying(userName)).to.equal(true, `${userName} was not displayed in the table list`);
            });
        });
        TestBuildingBlocks.addStepAndExecute(`Select the edit option for for the user`, () => {
            settingUser.selectActionOption('Edit');
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that edit panel is opened`, () => {
            expect(settingUser.isTitlePageExisting()).to.equal(true, `User edit panel was not displayed`);
        });
        const userEditName = 'QATest' + Math.floor((Math.random() * 1000000) + 1);
        TestBuildingBlocks.addStepAndExecute(`Edit the user details as ${userName}`, () => {
            TestBuildingBlocks.addStepAndExecute(`Enter the user login as ${userEditName}`, () => {
                settingUser.editUserLogin(userEditName);
            });
            TestBuildingBlocks.addStepAndExecute(`Click on Add this user button`, () => {
                settingUser.clickOnUpdateUserButton();
                expect(settingUser.isTableHeadersExisting()).to.equal(true, `Table header was not displayed in the list`);
            });
            TestBuildingBlocks.addStepAndExecute(`Verify successfully updated name as ${userEditName}`, () => {
                settingUser.updateSearchUser(userEditName);
                expect(settingUser.isUserNameExistingAndDisplaying(userEditName)).to.equal(true, `${userEditName} was not displayed in the table list`);
            });
        });
        TestBuildingBlocks.addStepAndExecute(`Delete the created user as ${userEditName}`, () => {
            settingUser.selectActionOption('Delete');
            expect(settingUser.isDeletePanelExisting()).to.equal(true, `Delete panel was not displaying`);
            settingUser.clickOnDeleteYesButton();
        });
    });

    it('Verify that newlly created user can Login', () => {
        allureReporter.addSeverity('critical');
        const userLogin = 'QATest' + Math.floor((Math.random() * 1000000) + 1);
        const userName = 'QATest' + Math.floor((Math.random() * 1000000) + 1);
        const userPwd = "123";
        const userEmail = "d.karanvanshi@jellysmack.com";
        const userCountry = "France";
        const userLevel = "Employee";
        const userRole = "Community Manager";
        const userThematicChoice = "Gaming";
        TestBuildingBlocks.addStepAndExecute(`Verify that home page is displaying`, () => {
            const menuExising = coreHomePage.getMenuMenuValues();
            const isMainMenusExisting = [CoreMainMenuEnum.HOME, CoreMainMenuEnum.POSTS, CoreMainMenuEnum.AB_TEST, CoreMainMenuEnum.CHANNELS, CoreMainMenuEnum.CREATORS, CoreMainMenuEnum.VERTICALS, CoreMainMenuEnum.PLANNING, CoreMainMenuEnum.USERS, CoreMainMenuEnum.SETTING].every((enumOption) => menuExising.includes(enumOption));
            expect(isMainMenusExisting).to.equal(true, 'Home page main menu was not displaying');
            expect(coreHomePage.isMenuSelected(CoreMainMenuEnum.HOME)).to.equal(true, `${CoreMainMenuEnum.HOME} main menu was not selected`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.SETTING} and select the User`, () => {
            settingUser.moveToSettingMenu();
            settingUser.selectSettingOption('Users')
            expect(settingUser.isAddNewUserButtonExisting()).to.equal(true, `Add new users button was not displayed`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on button Add a new user`, () => {
            settingUser.clickOnAddNewUserButton();
            expect(settingUser.isTitlePageExisting()).to.equal(true, `Add new users panel was not displayed`);
        });
        TestBuildingBlocks.addStepAndExecute(`User creation steps`, () => {
            TestBuildingBlocks.addStepAndExecute(`Enter the new user login as ${userLogin}`, () => {
                settingUser.enterUserLogin(userLogin);
            });
            TestBuildingBlocks.addStepAndExecute(`Enter the new user name as ${userName}`, () => {
                settingUser.enterUserName(userName);
            });
            TestBuildingBlocks.addStepAndExecute(`Enter the new user password as ${userPwd}`, () => {
                settingUser.enterUserPassword(userPwd);
            });
            TestBuildingBlocks.addStepAndExecute(`Enter the new user email as ${userEmail}`, () => {
                settingUser.enterUserEmail(userEmail);
            });
            TestBuildingBlocks.addStepAndExecute(`Enter the new user country as ${userCountry}`, () => {
                settingUser.enterUserCountry(userCountry);
            });
            TestBuildingBlocks.addStepAndExecute(`Enter the new user country as ${userLevel}`, () => {
                settingUser.enterUserLevel(userLevel);
            });
            TestBuildingBlocks.addStepAndExecute(`Enter the new user role as ${userRole}`, () => {
                settingUser.enterUserRole(userRole);
            });
            TestBuildingBlocks.addStepAndExecute(`Enter the new user thematic choice as ${userThematicChoice}`, () => {
                settingUser.enterUserThematicChoice(userThematicChoice);
            });
            expect(settingUser.isAddThisUserButtonExisting()).to.equal(true, `Add new users button was not displayed`);
            TestBuildingBlocks.addStepAndExecute(`Click on Add this user button`, () => {
                settingUser.clickOnAddThisUserButton();
                expect(settingUser.isTableHeadersExisting()).to.equal(true, `Table header was not displayed in the list`);
            });
            TestBuildingBlocks.addStepAndExecute(`Verify successfully created the user`, () => {
                settingUser.enterUserForSearch(userName);
                expect(settingUser.isUserNameExistingAndDisplaying(userName)).to.equal(true, `${userName} was not displayed in the table list`);
            });
        });
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
        TestBuildingBlocks.addStepAndExecute(`Enter the userID and password`, () => {
            coreLogin.login(userLogin, userPwd);
            expect(coreHomePage.isNewPostDisplaying()).to.equal(true, 'No home page displaying');
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that home page is displaying`, () => {
            expect(coreHomePage.isNewPostDisplaying()).to.equal(true, 'Home page menus are not displaying');
        });
        TestBuildingBlocks.addStepAndExecute(`Check the logout button is displaying in home page`, () => {
            expect(coreHomePage.isLogoutButtonExisting()).to.equal(true, `Logout button was not displaying`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on logout button on home page`, () => {
            coreHomePage.clickOnLogoutButton();
            expect(logout.isLogoutButtonExisting()).to.equal(true, `Logout button was not displaying in logout page`);
        });
        TestBuildingBlocks.addStepAndExecute(`Verify that profile name as ${userName}`, () => {
            const nametext = logout.getProfileText();
            expect(nametext).to.equal(userName, `Profile name was not matching`);
        });
        TestBuildingBlocks.addStepAndExecute(`Click on logout button`, () => {
            logout.clickOnLogoutButton();
            expect(coreLogin.isInputSubmitButtonExisting()).to.equal(true, `Log in page was not existing`);
        });
        TestBuildingBlocks.addStepAndExecute(`Enter the userID and password`, () => {
            coreLogin.login(projConfig.userID, projConfig.password);
            expect(coreHomePage.isNewPostDisplaying()).to.equal(true, 'No home page displaying');
        });
        TestBuildingBlocks.addStepAndExecute(`Click on main menu ${CoreMainMenuEnum.SETTING} and select the User`, () => {
            settingUser.moveToSettingMenu();
            settingUser.selectSettingOption('Users')
            expect(settingUser.isAddNewUserButtonExisting()).to.equal(true, `Add new users button was not displayed`);
        });
        TestBuildingBlocks.addStepAndExecute(`Delete the created user as ${userName}`, () => {
            settingUser.enterUserForSearch(userName);
            settingUser.selectActionOption('Delete');
            expect(settingUser.isDeletePanelExisting()).to.equal(true, `Delete panel was not displaying`);
            settingUser.clickOnDeleteYesButton();
        });
    });
});
