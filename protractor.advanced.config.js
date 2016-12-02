require('ts-node/register');

exports.config = {
    useAllAngular2AppRoots: true,

    onPrepare: function () {

        // Eigener Reporter welcher im Fehlerfall einen Screenshot erstellt
        var fs = require('fs');
        jasmine.getEnv().addReporter(new function () {
            this.specDone = function (result) {
                if (result.failedExpectations.length > 0) {
                    browser.takeScreenshot().then(function (png) {
                        var stream = fs.createWriteStream(
                            'screenshots/' +
                            result.description.replace(/[\|&;\$%@"<>\(\)\+,\/]/g, "") + '.png'
                        );
                        stream.write(new Buffer(png, 'base64'));
                        stream.end();
                    });
                }
            };
        });

        browser.driver.manage().window().setSize(1280, 1024);

    },

    directConnect: true,

    specs: ['e2e/specs/*.e2e-spec.ts']

};
