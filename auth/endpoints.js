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
const ENDPOINT = '/authenticate/';
const ENDPOINTS = {
    auth: {
        login: {
            endpoint: APP_PATH + `/login`,
            description: 'Used to check if application token exists and redirect user to sso login or dashboard',
            get: {
                params: 'none'
            }
        },
        sso: {
            endpoint: APP_PATH + `/sso`,
            description: 'Receives DU authproxy payload after SSO authentication has occurred',
            post: {
                body: 'sso payload - employeeID, HTTP_HOST'
            }
        },
        authentication: {
            endpoint: `${PREFIX}${VERSION}${ENDPOINT}`,
            description: 'Gets user profile data',
            get: {
                params: 'token or api_key, id',
            }
        }
    }
};

module.exports = () => {
    return ENDPOINTS;
};
