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
const PREFIX = APP_PATH + '/api/';
const VERSION = 'v1';
const ENDPOINT = '/users';
const ENDPOINTS = {
    users: {
        endpoint: `${PREFIX}${VERSION}${ENDPOINT}`,
        get_users: {
            description: 'Gets user record',
            get: {
                description: 'Gets user record(s)',
                params: 'id, all records returned if no id is included, token or api_key'
            }
        },
        create_user: {
            description: 'Creates user record',
            post: {
                description: 'Creates user record',
                params: 'token or api_key',
                body: 'du_id, email, first_name, last_name'
            }
        },
        update_user: {
            description: 'Updates user record',
            put: {
                description: 'Updates user record',
                params: 'token or api_key',
                body: 'id, du_id, email, first_name, last_name'
            }
        },
        delete_user: {
            description: 'Deletes user',
            delete: {
                description: 'Deletes user record',
                params: 'id, token or api_key'
            }
        }
    }
};

module.exports = function () {
    return ENDPOINTS;
};
