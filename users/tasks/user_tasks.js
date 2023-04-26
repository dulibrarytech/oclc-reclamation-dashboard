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

const LOGGER = require('../../libs/log4')

/**
 * User record tasks
 * @type {User_tasks}
 */
const User_tasks = class {

    constructor(DB, TABLE) {
        this.DB = DB;
        this.TABLE = TABLE;
    }

    /**
     * Gets all users
     * @return Promise array - data/boolean - false
     */
    get_users() {

        let promise = new Promise((resolve, reject) => {

            this.DB(this.TABLE)
                .select('*')
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    LOGGER.module().error('ERROR: [/users/tasks (get_users)] unable to get users ' + error.message);
                    reject(false);
                });
        });

        return promise.then((result) => {
            return result;
        }).catch((error) => {
            return error;
        });
    };

    /**
     * Gets single user record
     * @param id
     * @return Promise array - data/boolean - false
     */
    get_user(id) {

        let promise = new Promise((resolve, reject) => {

            this.DB(this.TABLE)
                .select('*')
                .where({
                    id: id
                })
                .then(function (data) {

                    if (data.length === 1) {
                        resolve(data);
                    } else {
                        reject(false);
                    }
                })
                .catch(function (error) {
                    LOGGER.module().error('ERROR: [/users/tasks (get_user)] unable to get user record ' + error.message);
                    reject(false);
                });
        });

        return promise.then((result) => {
            return result;
        }).catch((error) => {
            return error;
        });
    };


    /**
     * Updates user data
     * @param id
     * @param user
     * @return Promise object - data/boolean - false
     */
    update_user(id, user) {

        let promise = new Promise((resolve, reject) => {

            this.DB(this.TABLE)
                .where({
                    id: id
                })
                .update({
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    is_active: user.is_active
                })
                .then((data) => {

                    if (data === 1) {
                        resolve({
                            data: data
                        });
                    } else {
                        reject(false);
                    }

                    return null;
                })
                .catch((error) => {
                    LOGGER.module().fatal('FATAL: [/users/tasks (update_user)] unable to update user record ' + error.message);
                    reject(false);
                });
        });

        return promise.then((result) => {
            return result;
        }).catch((error) => {
            return error;
        });
    };

    /**
     * Checks if username already exists
     * @param username
     * @return Promise object - data/boolean - false
     */
    check_username(username) {

        let promise = new Promise((resolve, reject) => {

            this.DB(this.TABLE)
                .count('du_id as du_id')
                .where('du_id', username)
                .then((data) => {

                    if (data[0].du_id === 1) {
                        resolve({
                            is_duplicate: true
                        });
                    } else {
                        resolve({
                            is_duplicate: false
                        });
                    }

                })
                .catch((error) => {
                    LOGGER.module().error('ERROR: [/users/tasks (check_username)] unable to check username ' + error.message);
                    reject(false);
                });
        });

        return promise.then((result) => {
            return result;
        }).catch((error) => {
            return error;
        });
    };

    /**
     * Saves user data
     * @param user
     * @return Promise int - data/boolean - false
     */
    save_user(user) {

        let promise = new Promise((resolve, reject) => {

            user.email = user.email.toLowerCase();

            this.DB(this.TABLE)
                .insert(user)
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    LOGGER.module().error('ERROR: [/users/tasks (save_user)] unable to save user data ' + error.message);
                    reject(false);
                });
        });

        return promise.then((result) => {
            return result;
        }).catch((error) => {
            return error;
        });
    };

    /**
     * Deletes user data
     * @param id
     * @return Promise int - data/boolean - false
     */
    delete_user(id) {

        let promise = new Promise((resolve, reject) => {

            this.DB(this.TABLE)
                .where({
                    id: id
                })
                .del()
                .then((data) => {
                    resolve(data);
                })
                .catch((error) => {
                    LOGGER.module().error('ERROR: [/users/tasks (delete_user)] unable to delete user record ' + error.message);
                    reject(false);
                });
        });

        return promise.then((result) => {
            return result;
        }).catch((error) => {
            return error;
        });
    };
};

module.exports = User_tasks;
