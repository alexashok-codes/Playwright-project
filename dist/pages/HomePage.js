"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomePage = void 0;
const process_1 = __importDefault(require("process"));
class HomePage {
    constructor(page) {
        this.page = page;
    }
    async goto() {
        const url = process_1.default.env.BASE_URL;
        if (!url)
            throw new Error('BASE_URL is not defined in environment variables');
        await this.page.goto(url);
    }
    async goToContactPage() {
        await this.page.click('#nav-contact a');
        await this.page.waitForLoadState('networkidle');
    }
}
exports.HomePage = HomePage;
