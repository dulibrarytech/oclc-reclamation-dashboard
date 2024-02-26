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

const APP_PATH = '/oclc';
const CONFIG = require('../config/app_config')();

exports.get_dashboard = function (req, res) {
    res.redirect(APP_PATH + '/dashboard/home');
};

exports.get_dashboard_home = (req, res) => {
    res.render('dashboard-home', {
        host: CONFIG.host,
        appname: CONFIG.app_name,
        appversion: CONFIG.app_version,
        organization: CONFIG.organization
    });
};

exports.get_dashboard_error = (req, res) => {
    res.render('dashboard-error', {
        host: CONFIG.host,
        appname: CONFIG.app_name,
        appversion: CONFIG.app_version,
        organization: CONFIG.organization
    });
};

exports.get_dashboard_users = (req, res) => {
    res.render('dashboard-users', {
        host: CONFIG.host,
        appname: CONFIG.app_name,
        appversion: CONFIG.app_version,
        organization: CONFIG.organization
    });
};

exports.get_dashboard_user_detail = (req, res) => {
    res.render('dashboard-users-detail', {
        host: CONFIG.host,
        appname: CONFIG.app_name,
        appversion: CONFIG.app_version,
        organization: CONFIG.organization
    });
};

exports.get_dashboard_user_add_form = (req, res) => {
    res.render('dashboard-add-user', {
        host: CONFIG.host,
        appname: CONFIG.app_name,
        appversion: CONFIG.app_version,
        organization: CONFIG.organization
    });
};

exports.get_dashboard_user_edit_form = (req, res) => {
    res.render('dashboard-edit-user', {
        host: CONFIG.host,
        appname: CONFIG.app_name,
        appversion: CONFIG.app_version,
        organization: CONFIG.organization
    });
};

exports.get_dashboard_user_delete_form = (req, res) => {
    res.render('dashboard-delete-user', {
        host: CONFIG.host,
        appname: CONFIG.app_name,
        appversion: CONFIG.app_version,
        organization: CONFIG.organization
    });
};
