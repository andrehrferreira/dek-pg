'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _scope = require('@dekproject/scope');

var _require = require('pg'),
    Client = _require.Client;

exports.default = function () {
    try {
        var dbConfig = {};
        var env = process.env;
        var configApproved = true;

        if (env.hasOwnProperty('PG_USER') || !!env.PG_USER) dbConfig['PG_USER'] = env.PG_USER;

        if (env.hasOwnProperty('PG_PASSWORD') || !!env.PG_PASSWORD) dbConfig['PG_PASSWORD'] = env.PG_PASSWORD;

        if (env.hasOwnProperty('PG_HOST') && !!env.PG_HOST) dbConfig['PG_HOST'] = env.PG_HOST;else {
            configApproved = false;
            console.log('[ PostgreSQL ] - There is no PG_HOST variable in the .env file.');
        }

        if (env.hasOwnProperty('PG_PORT') && !!env.PG_PORT) dbConfig['PG_PORT'] = env.PG_PORT;else {
            configApproved = false;
            console.log('[ PostgreSQL ] - There is no PG_PORT variable in the .env file.');
        }

        if (env.hasOwnProperty('PG_DB') && !!env.PG_DB) dbConfig['PG_DB'] = env.PG_DB;else {
            configApproved = false;
            console.log('[ PostgreSQL ] - There is no PG_DB variable in the .env file');
        }

        if (!configApproved) {
            console.log('[ PostgreSQL ] - Please correct the above errors before restarting the application.');
            process.exit(-1);
        } else {
            try {
                var client = new Client({
                    host: dbConfig['PG_HOST'],
                    port: dbConfig['PG_PORT'],
                    user: dbConfig['PG_USER'],
                    password: dbConfig['PG_PASSWORD'],
                    database: dbConfig['PG_DB']
                });

                client.connect(function (err) {
                    if (process.env.DEBUG == 'true') {
                        if (err) console.log('[ PostgreSQL ] -', err.stack);else {
                            console.log('[ PostgreSQL ] - PostgreSQL successfully signed');
                            _scope.$.set("pg", client);
                        }
                    }
                });
            } catch (e) {
                console.log('[ PostgreSQL ] - ' + e.message);
            }
        }
    } catch (e) {
        console.log('[ PostgreSQL ] - ' + e.message);
    }
};
//# sourceMappingURL=index.js.map