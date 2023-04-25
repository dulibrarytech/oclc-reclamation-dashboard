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

const LOGGER = require('../../libs/log4');

/**
 * Object contains tasks used to query oclc reclamation records
 * @param DB
 * @param TABLES
 * @type {Oclc_reclamation_tasks}
 */
const Oclc_reclamation_tasks = class {

    constructor(DB, TABLES) {
        this.DB = DB;
        this.TABLES = TABLES;
    }

    /**
     * Gets records that are flagged as unset in WorldCat
     * @return Promise array - data/boolean - false
     */
    get_unset_records = () => {

        let promise = new Promise((resolve, reject) => {

            this.DB(this.TABLES.oclc_reclamation.v_unset_records)
            .select('*')
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                LOGGER.module().error('ERROR: [/app/oclc_reclamation_tasks (get_unset_records)] unable to get records ' + error.message);
                reject(false);
            });

        });

        return promise.then((result) => {
            return result;
        }).catch((error) => {
            return error;
        });
    }

    /**
     * Gets records that are flagged as set in WorldCat
     * @return Promise array - data/boolean - false
     */
    get_set_records = () => {

        let promise = new Promise((resolve, reject) => {

            this.DB(this.TABLES.oclc_reclamation.v_set_records)
            .select('*')
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                LOGGER.module().error('ERROR: [/app/oclc_reclamation_tasks (get_set_records)] unable to get records ' + error.message);
                reject(false);
            });

        });

        return promise.then((result) => {
            return result;
        }).catch((error) => {
            return error;
        });
    }

    /**
     * Gets records that don't have an OCLC number
     * @return Promise array - data/boolean - false
     */
    get_null_records = () => {

        let promise = new Promise((resolve, reject) => {

            this.DB(this.TABLES.oclc_reclamation.v_null_records)
            .select('mms_id', 'title')
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                LOGGER.module().error('ERROR: [/app/oclc_reclamation_tasks (get_null_records)] unable to get records ' + error.message);
                reject(false);
            });

        });

        return promise.then((result) => {
            return result;
        }).catch((error) => {
            return error;
        });
    }

    /**
     * Gets records that contain OCLC numbers that are in the catalog but not found in WorldCat
     * @return Promise array - data/boolean - false
     */
    get_not_found_records = () => {

        let promise = new Promise((resolve, reject) => {

            this.DB(this.TABLES.oclc_reclamation.records)
            .select('mms_id', 'title', 'oclc_numbers', 'isbn')
            .where({
                is_null: 0,
                is_worldcat_record_found: 0
            })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                LOGGER.module().error('ERROR: [/app/oclc_reclamation_tasks (get_not_found_records)] unable to get records ' + error.message);
                reject(false);
            });

        });

        return promise.then((result) => {
            return result;
        }).catch((error) => {
            return error;
        });
    }

    /**
     * Gets total number of catalog records
     * @return Promise array - data/boolean - false
     */
    get_total_catalog_records = () => {

        let promise = new Promise((resolve, reject) => {

            this.DB(this.TABLES.oclc_reclamation.v_total_records)
            .select('*')
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                LOGGER.module().error('ERROR: [/app/oclc_reclamation_tasks (get_total_catalog_records)] unable to get records ' + error.message);
                reject(false);
            });

        });

        return promise.then((result) => {
            return result;
        }).catch((error) => {
            return error;
        });
    }

    /**
     * Gets total number of records that are flagged as set in WorldCat
     * @return Promise array - data/boolean - false
     */
    get_total_set_records = () => {

        let promise = new Promise((resolve, reject) => {

            this.DB(this.TABLES.oclc_reclamation.v_total_set_records)
            .select('*')
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                LOGGER.module().error('ERROR: [/app/oclc_reclamation_tasks (get_total_set_records)] unable to get records ' + error.message);
                reject(false);
            });

        });

        return promise.then((result) => {
            return result;
        }).catch((error) => {
            return error;
        });
    }

    /**
     * Gets total number of records that are flagged as unset in WorldCat
     * @return Promise array - data/boolean - false
     */
    get_total_unset_records = () => {

        let promise = new Promise((resolve, reject) => {

            this.DB(this.TABLES.oclc_reclamation.v_total_unset_records)
            .select('*')
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                LOGGER.module().error('ERROR: [/app/oclc_reclamation_tasks (get_total_unset_records)] unable to get records ' + error.message);
                reject(false);
            });

        });

        return promise.then((result) => {
            return result;
        }).catch((error) => {
            return error;
        });
    }

    /**
     * Gets total records containing OCLC numbers that are in the catalog but not found in WorldCat
     * @return Promise array - data/boolean - false
     */
    get_total_not_found_records = () => {

        let promise = new Promise((resolve, reject) => {

            this.DB(this.TABLES.oclc_reclamation.records)
            .count('id as total_not_found_records')
            .where({
                is_null: 0,
                is_worldcat_record_found: 0
            })
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                LOGGER.module().error('ERROR: [/app/oclc_reclamation_tasks (get_total_unset_records)] unable to get records ' + error.message);
                reject(false);
            });

        });

        return promise.then((result) => {
            return result;
        }).catch((error) => {
            return error;
        });
    }

    /**
     * Gets total records that do not have an OCLC number
     * @return Promise array - data/boolean - false
     */
    get_total_null_records = () => {

        let promise = new Promise((resolve, reject) => {

            this.DB(this.TABLES.oclc_reclamation.v_total_null_records)
            .select('*')
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                LOGGER.module().error('ERROR: [/app/oclc_reclamation_tasks (get_total_null_records)] unable to get records ' + error.message);
                reject(false);
            });

        });

        return promise.then((result) => {
            return result;
        }).catch((error) => {
            return error;
        });
    }
};

module.exports = Oclc_reclamation_tasks;
