// TypeScript Unterstüzung für Protractor
require('ts-node/register');

// Protractor Konfiguration
exports.config = {
    // Flag zum aktivieren der Protractor Unterstützung für Angular 2
    useAllAngular2AppRoots: true,

    onPrepare: function () {
        // Einstellung der Browser Auflösung
        browser.driver.manage().window().setSize(1280, 1024);
    },

    directConnect: true,

    // capabilities: {
    //     'browserName': 'chrome'
    // },

    // Alternative für mehrere Browser
    //multiCapabilities:[
    //  {
    //    'browserName' : 'safari'
    //  },
    //  {
    //    'browserName' : 'firefox'
    //  },
    //  {
    //    'browserName' : 'chrome'
    //  }
    //],

    specs: ['e2e/specs/*.e2e-spec.ts'],
    //suites: {
    //  home: 'tests/e2e/home/**/*.spec.js',
    //  search: [
    //    'tests/e2e/search/**/*.spec.js',
    //    'tests/e2e/different_search/**/*.spec.js'
    //  ]
    //},

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
};
