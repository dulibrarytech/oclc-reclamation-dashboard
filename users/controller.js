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

const MODEL = require('../users/model');
const VALIDATOR = require("validator");

/**
 * Gets Users
 * @param req
 * @param res
 */
exports.get_users = (req, res) => {

    if (req.query.id !== undefined && req.query.id.length !== 0) {

        if (!VALIDATOR.isNumeric(req.query.id)) {

            res.status(400).send({
                message: 'Bad Request.'
            });

            return false;
        }

        let id = parseInt(req.query.id);
        delete req.query;

        MODEL.get_user(id, (data) => {
            res.status(data.status).send(data.data);
        });

        return false;
    }

    MODEL.get_users((data) => {
        res.status(data.status).send(data.data);
    });
};

/**
 * Saves user
 * @param req
 * @param res
 */
exports.save_user = (req, res) => {

    const result = validate(req.body, 'save');

    if (result === false) {

        res.status(400).send({
            message: 'Bad Request.'
        });

        return false;
    }

    let user = req.body;

    MODEL.save_user(user, (data) => {
        res.status(data.status).send(data.data);
    });
};

/**
 * Validates input
 * @param data
 * @param type (create, update)
 * @return {boolean}
 */
function validate (data, type) {

    let errors = [];

    if (type === 'update') {

        if (!VALIDATOR.isNumeric(data.id) || data.id.length > 20) {
            errors.push(-1);
            return false;
        }

        if (typeof data.is_active !== 'number' || data.is_active.length > 1) {
            errors.push(-1);
            return false;
        }
    }

    if (!VALIDATOR.isNumeric(data.du_id) || data.du_id.length > 10) {
        errors.push(-1);
        return false;
    }

    if (!VALIDATOR.isEmail(data.email) || data.email.length > 100) {
        errors.push(-1);
        return false;
    } else if (!/@du.edu\s*$/.test(data.email)) {
        errors.push(-1);
        return false;
    }

    if (!VALIDATOR.isAlpha(data.first_name) || !VALIDATOR.isAlpha(data.last_name)) {
        errors.push(-1);
        return false;
    }
    console.log(errors);
    if (errors.length > 0) {
        return false;
    }

    return true;
}

/**
 * Updates user
 * @param req
 * @param res
 */
exports.update_user = (req, res) => {

    const result = validate(req.body, 'update')

    if (result === false) {

        res.status(400).send({
            message: 'Bad Request.'
        });

        return false;
    }

    let user = req.body;
        user.email = user.email.toLocaleLowerCase();

    const id = parseInt(user.id);
    delete req.body;
    delete user.id;

    MODEL.update_user(id, user, (data) => {
        res.status(data.status).send(data.data);
    });
};

/**
 * Deletes user
 * @param req
 * @param res
 */
exports.delete_user = (req, res) => {

    let id = req.query.id;

    MODEL.delete_user(id, (data) => {
        res.status(data.status).send(data.data);
    });
};
