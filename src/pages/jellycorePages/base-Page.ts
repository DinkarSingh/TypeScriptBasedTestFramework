import { BaseComponent } from "../../infra/models/base-compents";

export abstract class BasePage extends BaseComponent {

    protected relativeUrl: string = '';
    public navigateToPage() {
        const baseUrl = this.getBaseUrl();
        const url = `${baseUrl}${this.relativeUrl}`;
        try {
            browser.url(url);
        } catch (err) {
            if (err.message.toString().includes('Session')) {
                browser.reloadSession();
                browser.url(url);
            }
        }

        this.logger.info(`Navigated to url ${url}`);
    }

    public getBaseUrl() {
        return browser.config.baseUrl;
    }

}