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

/**
 * Gets Users
 * @param req
 * @param res
 */
exports.get_users = (req, res) => {

    if (req.query.id !== undefined && req.query.id.length !== 0) {

        let id = req.query.id;

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

    let user = req.body;

    MODEL.save_user(user, (data) => {
        res.status(data.status).send(data.data);
    });
};

/**
 * Updates user
 * @param req
 * @param res
 */
exports.update_user = (req, res) => {

    let user = req.body;
    let id = user.id;
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
