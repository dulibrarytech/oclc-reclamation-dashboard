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

const CONTROLLER = require('./controller'),
    ENDPOINTS = require('./endpoints'),
    TOKEN = require('../libs/tokens');

module.exports = (app) => {

    app.route(ENDPOINTS().oclc_reclamation.oclc_reclamation_unset_records.endpoint)
        .get(TOKEN.verify, CONTROLLER.get_unset_records);

    app.route(ENDPOINTS().oclc_reclamation.oclc_reclamation_set_records.endpoint)
        .get(TOKEN.verify, CONTROLLER.get_set_records);

    app.route(ENDPOINTS().oclc_reclamation.oclc_reclamation_null_records.endpoint)
        .get(TOKEN.verify, CONTROLLER.get_null_records);

    app.route(ENDPOINTS().oclc_reclamation.oclc_reclamation_not_found_records.endpoint)
    .get(TOKEN.verify, CONTROLLER.get_not_found_records);

    app.route(ENDPOINTS().oclc_reclamation.oclc_reclamation_total_records.endpoint)
        .get(TOKEN.verify, CONTROLLER.get_total_catalog_records);

    app.route(ENDPOINTS().oclc_reclamation.oclc_reclamation_total_set_records.endpoint)
        .get(TOKEN.verify, CONTROLLER.get_total_set_records);

    app.route(ENDPOINTS().oclc_reclamation.oclc_reclamation_total_unset_records.endpoint)
        .get(TOKEN.verify, CONTROLLER.get_total_unset_records);

    app.route(ENDPOINTS().oclc_reclamation.oclc_reclamation_total_null_records.endpoint)
        .get(TOKEN.verify, CONTROLLER.get_total_null_records);

    app.route(ENDPOINTS().oclc_reclamation.oclc_reclamation_total_not_found_records.endpoint)
        .get(TOKEN.verify, CONTROLLER.get_total_not_found_records);
};