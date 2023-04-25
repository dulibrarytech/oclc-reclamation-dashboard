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

const DB = require('../config/db_config')();
const DB_TABLES = require('../config/db_tables_config')();
const TABLE = DB_TABLES.oclc_reclamation.users;
const USER_TASKS = require('../users/tasks/user_tasks');
const LOGGER = require("../libs/log4");

/**
 * Gets all users
 * @param callback
 */
exports.get_users = (callback) => {

    (async () => {

        const TASKS = new USER_TASKS(DB, TABLE);
        const data = await TASKS.get_users();
        let response = {
            status: 200,
            message: 'User records retrieved.',
            data: data
        };

        if (data === false) {
            LOGGER.module().error('ERROR: [/users/model (get_users)] unable to retrieve user records.');
            response = {
                status: 422,
                message: 'Unable to retrieve user records.'
            }
        }

        callback(response);

    })();
};

/**
 * Gets one user record
 * @param id
 * @param callback
 */
exports.get_user = function (id, callback) {

    (async () => {

        const TASKS = new USER_TASKS(DB, TABLE);
        const data = await TASKS.get_user(id);
        let response = {
            status: 200,
            message: 'User retrieved.',
            data: data
        };

        if (data === false) {
            LOGGER.module().error('ERROR: [/users/model (get_user)] unable to retrieve user record.');
            response = {
                status: 422,
                message: 'Unable to retrieve user record.',
                data: []
            }
        }

        callback(response);

    })();
};

/**
 * Updates user data
 * @param id
 * @param user
 * @param callback
 */
exports.update_user = function (id, user, callback) {

    (async () => {

        const TASKS = new USER_TASKS(DB, TABLE);
        const data = await TASKS.update_user(id, user);
        let response = {
            status: 201,
            message: 'User record updated.',
            data: data
        };

        if (data === false) {
            LOGGER.module().error('ERROR: [/users/model (update_user)] unable to update user record.');
            response = {
                status: 422,
                message: 'Unable to update user record.'
            }
        }

        callback(response);

    })();
};

/**
 * Saves user data
 * @param user
 * @param callback
 */
exports.save_user = function (user, callback) {

    (async () => {

        const TASKS = new USER_TASKS(DB, TABLE);
        const data = await TASKS.save_user(user);

        let response = {
            status: 201,
            message: 'User record saved.',
            data: data
        };

        if (data === false) {
            LOGGER.module().error('ERROR: [/users/model (update_user)] unable to save user record.');
            response = {
                status: 422,
                message: 'Unable to save user record.'
            }
        }

        callback(response);

    })();
};

/**
 * Deletes user record
 * @param id
 * @param callback
 */
exports.delete_user = function (id, callback) {

    (async () => {

        const TASKS = new USER_TASKS(DB, TABLE);
        const data = await TASKS.delete_user(id);

        let response = {
            status: 204,
            message: 'User record deleted.'
        };

        if (data === false) {
            LOGGER.module().error('ERROR: [/users/model (update_user)] unable to delete user record.');
            response = {
                status: 422,
                message: 'Unable to delete user record.'
            }
        }

        callback(response);

    })();
};