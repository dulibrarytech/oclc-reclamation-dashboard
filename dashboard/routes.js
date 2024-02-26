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
const CONTROLLER = require('../dashboard/controller');

module.exports = (app) => {

    app.route(APP_PATH)
    .get(CONTROLLER.get_dashboard);

    app.route(APP_PATH + '/dashboard/home')
        .get(CONTROLLER.get_dashboard_home);

    app.route(APP_PATH + '/dashboard/users')
        .get(CONTROLLER.get_dashboard_users);

    app.route(APP_PATH + '/dashboard/add-user')
    .get(CONTROLLER.get_dashboard_user_add_form);

    app.route(APP_PATH + '/dashboard/edit-user')
        .get(CONTROLLER.get_dashboard_user_edit_form);

    app.route(APP_PATH + '/dashboard/delete-user')
        .get(CONTROLLER.get_dashboard_user_delete_form);

    app.route(APP_PATH + '/dashboard/error')
    .get(CONTROLLER.get_dashboard_error);
};