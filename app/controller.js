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

const MODEL = require('../app/model');

exports.get_unset_records = (req, res) => {
    MODEL.get_unset_records((data) => {
        res.status(data.status).send(data.data);
    });
};

exports.get_set_records = (req, res) => {
    MODEL.get_set_records((data) => {
        res.status(data.status).send(data.data);
    });
};

exports.get_null_records = (req, res) => {
    MODEL.get_null_records((data) => {
        res.status(data.status).send(data.data);
    });
};

exports.get_not_found_records = (req, res) => {
    MODEL.get_not_found_records((data) => {
        res.status(data.status).send(data.data);
    });
};

exports.get_total_catalog_records = (req, res) => {
    MODEL.get_total_catalog_records((data) => {
        res.status(data.status).send(data.data);
    });
};

exports.get_total_set_records = (req, res) => {
    MODEL.get_total_set_records((data) => {
        res.status(data.status).send(data.data);
    });
};

exports.get_total_unset_records = (req, res) => {
    MODEL.get_total_unset_records((data) => {
        res.status(data.status).send(data.data);
    });
};

exports.get_total_null_records = (req, res) => {
    MODEL.get_total_null_records((data) => {
        res.status(data.status).send(data.data);
    });
};

exports.get_total_not_found_records = (req, res) => {
    MODEL.get_total_not_found_records((data) => {
        res.status(data.status).send(data.data);
    });
};
