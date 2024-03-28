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

const APP_CONFIG = require('../config/app_config')();
const CONFIG = require('../config/webservices_config')();
const TOKEN = require('../libs/tokens');
const MODEL = require('../auth/model');
const VALIDATOR = require('validator');

exports.sso = function (req, res) {

    if (req.body.employeeID === undefined || req.body.HTTP_HOST === undefined) {

        res.status(403).send({
            message: 'You do not have access to this resource.'
        });
        return false;
    }

    if (!VALIDATOR.isNumeric(req.body.employeeID) || !VALIDATOR.isFQDN(req.body.HTTP_HOST)) {

        res.status(403).send({
            message: 'You do not have access to this resource.'
        });

        return false;
    }

    if (req.body.employeeID.length > 10) {

        res.status(400).send({
            message: 'Bad Request.'
        });

        return false;
    }

    const APP_PATH = '/oclc';
    const USERNAME = req.body.employeeID;
    const SSO_HOST = req.body.HTTP_HOST;
    delete req.body;

    if (SSO_HOST === CONFIG.ssoHost) {

        let token = TOKEN.create(USERNAME);
        token = encodeURIComponent(token);

        MODEL.check_auth_user(USERNAME, (result) => {

            if (result.auth === true) {
                res.redirect(APP_PATH + '/dashboard/home?t=' + token + '&id=' + parseInt(result.data));
            } else {
                res.status(403).send({
                    message: 'You do not have access to this resource.'
                });
            }
        });

    } else {
        res.status(401).send({
            message: 'Authentication failed.'
        });
    }
};

exports.get_auth_user_data = function (req, res) {

    if (req.query.id === undefined || !VALIDATOR.isNumeric(req.query.id)) {

        res.status(400).send({
            message: 'Bad Request.'
        });

        return false;
    }

    const id = parseInt(req.query.id);
    delete req.query;

    MODEL.get_auth_user_data(id, (data) => {
        res.status(data.status).send(data.data);
    });
};

exports.get_dashboard_landing_page = function (req, res) {
    res.render('dashboard-landing', {
        host: APP_CONFIG.host,
        appname: APP_CONFIG.app_name,
        appversion: APP_CONFIG.app_version,
        organization: APP_CONFIG.organization
    });
};
