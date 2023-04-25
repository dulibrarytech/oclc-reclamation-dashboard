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
const OCLC_RECLAMATION_TASKS = require('../app/tasks/oclc_reclamation_tasks');
const TASKS = new OCLC_RECLAMATION_TASKS(DB, DB_TABLES);
const LOGGER = require('../libs/log4');

/**
 * Gets records flagged as unset in WorldCat
 * @param callback
 */
exports.get_unset_records = (callback) => {

    (async () => {

        try {

            let data = await TASKS.get_unset_records();

            if (data === false) {
                LOGGER.module().error('ERROR: [/app/model (get_unset_records)] unable to get records');
                callback({
                    status: 422,
                    message: 'unable to get records'
                });
            } else {
                callback({
                    status: 200,
                    message: 'unset records',
                    data: data
                });
            }

        } catch (error) {
            LOGGER.module().error('ERROR: [/app/model (get_unset_records)] unable to get records ' + error.message);
            callback({
                status: 422,
                message: error.message
            });
        }

    })();
};

/**
 * Gets records that are flagged as set in WorldCat
 * @param callback
 */
exports.get_set_records = (callback) => {

    (async () => {

        try {

            let data = await TASKS.get_set_records();

            if (data === false) {
                LOGGER.module().error('ERROR: [/app/model (get_set_records)] unable to get records');
                callback({
                    status: 422,
                    message: 'unable to get records'
                });
            } else {
                callback({
                    status: 200,
                    message: 'set records',
                    data: data
                });
            }

        } catch (error) {
            LOGGER.module().error('ERROR: [/app/model (get_set_records)] unable to get records ' + error.message);
            callback({
                status: 422,
                message: error.message
            });
        }

    })();
};

/**
 * Gets records that do not have OCLC numbers
 * @param callback
 */
exports.get_null_records = (callback) => {

    (async () => {

        try {

            let data = await TASKS.get_null_records();

            if (data === false) {
                LOGGER.module().error('ERROR: [/app/model (get_null_records)] unable to get records');
                callback({
                    status: 422,
                    message: 'unable to get records'
                });
            } else {
                callback({
                    status: 200,
                    message: 'null records',
                    data: data
                });
            }

        } catch (error) {
            LOGGER.module().error('ERROR: [/app/model (get_null_records)] unable to get records ' + error.message);
            callback({
                status: 422,
                message: error.message
            });
        }

    })();
};

/**
 * Gets records that contain OCLC numbers but are not found in WorldCat
 * @param callback
 */
exports.get_not_found_records = (callback) => {

    (async () => {

        try {

            let data = await TASKS.get_not_found_records();

            if (data === false) {
                LOGGER.module().error('ERROR: [/app/model (get_not_found_records)] unable to get records');
                callback({
                    status: 422,
                    message: 'unable to get records'
                });
            } else {
                callback({
                    status: 200,
                    message: 'not found records',
                    data: data
                });
            }

        } catch (error) {
            LOGGER.module().error('ERROR: [/app/model (get_not_found_records)] unable to get records ' + error.message);
            callback({
                status: 422,
                message: error.message
            });
        }

    })();
};

/**
 * Gets total number of catalog records
 * @param callback
 */
exports.get_total_catalog_records = (callback) => {

    (async () => {

        try {

            let data = await TASKS.get_total_catalog_records();

            if (data === false) {
                LOGGER.module().error('ERROR: [/app/model (get_total_catalog_records)] unable to get records');
                callback({
                    status: 422,
                    message: 'unable to get records'
                });
            } else {
                callback({
                    status: 200,
                    message: 'total number of catalog records',
                    data: data
                });
            }

        } catch (error) {
            LOGGER.module().error('ERROR: [/app/model (get_total_catalog_records)] unable to get records ' + error.message);
            callback({
                status: 422,
                message: error.message
            });
        }

    })();
};

/**
 * Gets total number of records that are flagged as set in WorldCat
 * @param callback
 */
exports.get_total_set_records = (callback) => {

    (async () => {

        try {

            let data = await TASKS.get_total_set_records();

            if (data === false) {
                LOGGER.module().error('ERROR: [/app/model (get_total_set_records)] unable to get records');
                callback({
                    status: 422,
                    message: 'unable to get records'
                });
            } else {
                callback({
                    status: 200,
                    message: 'total set records',
                    data: data
                });
            }

        } catch (error) {
            LOGGER.module().error('ERROR: [/app/model (get_total_set_records)] unable to get records ' + error.message);
            callback({
                status: 422,
                message: error.message
            });
        }

    })();
};

/**
 * Gets total number of records that are flagged as unset in WorldCat
 * @param callback
 */
exports.get_total_unset_records = (callback) => {

    (async () => {

        try {

            let data = await TASKS.get_total_unset_records();

            if (data === false) {
                LOGGER.module().error('ERROR: [/app/model (get_total_unset_records)] unable to get records');
                callback({
                    status: 422,
                    message: 'unable to get records'
                });
            } else {
                callback({
                    status: 200,
                    message: 'total unset records',
                    data: data
                });
            }

        } catch (error) {
            LOGGER.module().error('ERROR: [/app/model (get_total_unset_records)] unable to get records ' + error.message);
            callback({
                status: 422,
                message: error.message
            });
        }

    })();
};

/**
 * Gets total number of records that do not have oclc numbers
 * @param callback
 */
exports.get_total_null_records = (callback) => {

    (async () => {

        try {

            let data = await TASKS.get_total_null_records();

            if (data === false) {
                LOGGER.module().error('ERROR: [/app/model (get_total_null_records)] unable to get records');
                callback({
                    status: 422,
                    message: 'unable to get records'
                });
            } else {
                callback({
                    status: 200,
                    message: 'total unset records',
                    data: data
                });
            }

        } catch (error) {
            LOGGER.module().error('ERROR: [/app/model (get_total_null_records)] unable to get records ' + error.message);
            callback({
                status: 422,
                message: error.message
            });
        }

    })();
};

/**
 * Gets total number of records containing oclc numbers but are not found in WorldCat
 * @param callback
 */
exports.get_total_not_found_records = (callback) => {

    (async () => {

        try {

            let data = await TASKS.get_total_not_found_records();

            if (data === false) {
                LOGGER.module().error('ERROR: [/app/model (get_total_not_found_records)] unable to get records');
                callback({
                    status: 422,
                    message: 'unable to get records'
                });
            } else {
                callback({
                    status: 200,
                    message: 'total not found records',
                    data: data
                });
            }

        } catch (error) {
            LOGGER.module().error('ERROR: [/app/model (get_total_not_found_records)] unable to get records ' + error.message);
            callback({
                status: 422,
                message: error.message
            });
        }

    })();
};
