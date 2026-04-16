"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const HomePage_1 = require("../pages/HomePage");
(0, cucumber_1.Given)('I go to the contact page from the home page', async function () {
    const home = new HomePage_1.HomePage(this.page);
    await home.goto();
    await home.goToContactPage();
});
