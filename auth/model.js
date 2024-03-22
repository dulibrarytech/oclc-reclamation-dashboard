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

const DB =require('../config/db_config')();
const DB_TABLES =require('../config/db_tables_config')();
const TABLE = DB_TABLES.oclc_reclamation.users;
const AUTH_TASKS = require("../auth/tasks/auth_tasks");
const APP_ENDPOINTS = require('../app/endpoints')();
const USERS_ENDPOINTS = require('../users/endpoints')();
const LOGGER = require('../libs/log4');

/**
 * Checks if user has access to application
 * @param username
 * @param callback
 */
exports.check_auth_user = (username, callback) => {

    (async () => {

        try {

            const TASKS = new AUTH_TASKS(DB, TABLE);
            const data = await TASKS.check_auth_user(username);

            if (data === false) {
                callback({
                    status: 401,
                    message: 'Authentication failed'
                });
            } else {
                callback(data);
            }

        } catch (error) {
            LOGGER.module().error('ERROR: [/auth/model (check_auth_user)] unable to check user auth data ' + error.message);
            callback({
                status: 422,
                message: error.message
            });
        }

    })();
};

/**
 * Gets user profile data
 * @param id
 * @param callback
 */
exports.get_auth_user_data = (id, callback) => {

    (async () => {

        try {

            const TASKS = new AUTH_TASKS(DB, TABLE);
            const data = await TASKS.get_auth_user_data(id);
            let auth_data = {
                user_data: data,
                endpoints: {
                    app: APP_ENDPOINTS,
                    users: USERS_ENDPOINTS
                }
            };

            let response = {
                status: 200,
                message: 'User data retrieved.',
                data: auth_data
            };

            if (data === false) {
                response = {
                    status: 422,
                    message: 'Unable to retrieve user data.',
                }
            }

            callback(response);

        } catch (error) {
            LOGGER.module().error('ERROR: [/auth/model (get_auth_user_data)] unable to get user profile data ' + error.message);
            callback({
                status: 422,
                message: error.message
            });
        }

    })();
};
