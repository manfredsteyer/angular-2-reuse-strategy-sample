var webpack = require('webpack');

// Karma Konfiguration
module.exports = function(config) {
    config.set({
        // Das benötigte Test Framework
        frameworks: ['jasmine'],

        // Ausgabe der Testergebnisse
        reporters: ['progress'],

        // Der ausführende Browser
        browsers: ['Chrome'],

        // Durch diesen Flag werden die Tests ausgeführt und karma sowie der Browser danach beendet
        singleRun: true,

        // Konfiguration aller Dateien welche während des Tests benötigt werden
        files: [
            'app/main.spec.ts'
        ],

        // Dateien welche vor dem eigentlichen Test durch ein preprocessor Module bearbeitet werden müssen
        preprocessors: {
            'app/main.spec.ts': ['webpack', 'sourcemap']
        },

        // Die webpack preprocessor Konfiguration um TypeScript in JavaScript zu transpilieren.
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        test: /\.ts$/,
                        loaders: [
                            'angular2-router-loader?loader=system',
                            'angular2-template-loader',
                            'awesome-typescript-loader'
                        ],
                        exclude: /node_modules/
                    },
                    {test: /\.(html|css)$/, loader: 'raw-loader'}
                ]
            },
            resolve: {
                extensions: ['.ts', '.js']
            },
            plugins: [
                // https://github.com/webpack/karma-webpack/issues/109
                new webpack.SourceMapDevToolPlugin({
                    filename: null, // if no value is provided the sourcemap is inlined
                    test: /\.(ts|js)($|\?)/i // process .js and .ts files only
                }),
                // https://github.com/angular/angular/issues/11580
                new webpack.ContextReplacementPlugin(
                    /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
                    __dirname + './src'
                )
            ]
        },

        // Der webpack preprocessor soll nur relevante logs ausgeben.
        webpackMiddleware: { stats: 'errors-only'}

    });
};
