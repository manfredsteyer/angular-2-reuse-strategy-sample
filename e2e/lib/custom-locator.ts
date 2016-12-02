/// <reference path="../../node_modules/protractor/built/index" />
/// <reference path="../../node_modules/@types/jasmine/index" />

import { by as orgBy } from 'protractor';
import { ProtractorBy } from 'protractor/built/locators';

orgBy.addLocator('e2eLocator', (value, parentElement) => {
    let using = parentElement || document;
    return using.querySelectorAll(`[flightE2eLocator="${value}"]`);
});

interface ProtractorByWithE2eLocator extends ProtractorBy {
    e2eLocator?(value, parentElement?);
}
export let by: ProtractorByWithE2eLocator = orgBy;
