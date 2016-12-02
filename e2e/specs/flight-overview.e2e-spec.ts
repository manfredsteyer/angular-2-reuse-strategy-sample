import { browser, by, element } from 'protractor';

describe('Flight Overview', () => {
    it('should find a welcome message', () => {
        browser.get('http://localhost:8080');
        let expectedHeaderText = 'Welcome!';

        // Suche mittels des TagNamens
        let elem = element(by.tagName('h1'));

        // Methoden, wie getText, liefern ein Promise zurück
        elem.getText().then(function (text) {
            expect(text).toBe(expectedHeaderText);
        });

        // Automatisch Promises aufzulösen
        expect(elem.getText()).toBe(expectedHeaderText);
    });
});
