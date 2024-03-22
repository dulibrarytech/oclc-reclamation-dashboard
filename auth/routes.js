/**

 Copyright 2023 University of Denver

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.

 */

'use strict';

const CORS = require('cors');
const CONFIG = require('../config/app_config')();
const CONTROLLER = require('../auth/controller');
const ENDPOINTS = require('../auth/endpoints');
const TOKENS = require('../libs/tokens');
const APP_PATH = '/oclc';
const ALLOW = ['https://' + CONFIG.host, 'http://localhost'];
const CORS_OPTIONS = function (req, callback) {

    let cors_options;

    if (ALLOW.indexOf(req.header('Origin')) !== -1) {
        cors_options = { origin: true }
    } else {
        cors_options = { origin: false }
    }

    callback(null, cors_options)
};

module.exports = function (app) {

    app.route(APP_PATH + '/dashboard')
    .get(CONTROLLER.get_dashboard_landing_page);

    app.route(ENDPOINTS().auth.login.endpoint)
        .get(TOKENS.verify);

    app.route(CORS(CORS_OPTIONS), ENDPOINTS().auth.sso.endpoint)
        .post(CONTROLLER.sso);

    app.route(ENDPOINTS().auth.authentication.endpoint)
        .get(TOKENS.verify, CONTROLLER.get_auth_user_data);
};