import { by } from '../lib/custom-locator';
import { browser, element } from 'protractor';

describe('Flight Search', () => {

    beforeEach(() => {
        browser.get('http://localhost:8080');
        element(by.e2eLocator('login')).click();
        element(by.e2eLocator('flug-buchen')).click();
    });

    it('should find flights between Graz and Hamburg', () => {
        element(by.e2eLocator('search')).click();
        expect(element.all(by.tagName('flight-card')).count()).toBe(3);

        let flight = element(by.e2eLocator('flight-card-12'));

        expect(flight.getAttribute('style')).toContain('lightsteelblue');
        flight.element(by.tagName('input')).click();
        expect(flight.getAttribute('style')).toContain('orange');
    });

    it('should disable search button if from and to location are the same', () => {

        expect(element(by.e2eLocator('search')).isEnabled()).toBe(true);

        element(by.e2eLocator('to')).clear();
        element(by.e2eLocator('to')).sendKeys('Hamburg');

        expect(element(by.e2eLocator('search')).isEnabled()).toBe(false);

    });
});
