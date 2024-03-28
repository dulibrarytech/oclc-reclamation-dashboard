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

const authModule = (function () {

    'use strict';

    const APP_PATH = '/oclc';
    const api = configModule.getApi();
    const init_endpoints = endpointsModule.init();
    let obj = {};

    obj.getUserToken = () => {

        let data = JSON.parse(window.sessionStorage.getItem('oclc_reclamation_token'));

        if (data !== null && data.token === null) {

            setTimeout(function () {
                window.location.replace(APP_PATH + '/login');
            }, 0);

        } else if (data === null) {
            window.location.replace(APP_PATH + '/login');
        } else {
            return DOMPurify.sanitize(data.token);
        }
    };

    obj.getAuthUserData = () => {

        let id = helperModule.getParameterByName('id');
        authModule.saveToken();

        if (id !== null) {

            (async () => {

                let token = authModule.getUserToken();
                let url = api + init_endpoints.authenticate + '?id=' + id;
                let response = await httpModule.req({
                    method: 'GET',
                    url: url,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    }
                });

                if (response.status === 200) {
                    authModule.saveUserAuthData(response.data);
                } else if (response.status === 401) {

                    helperModule.renderError('Error: (HTTP status ' + response.status + '). Your session has expired.  You will be redirected to the login page momentarily.');

                    setTimeout(function () {
                        window.location.replace(APP_PATH + '/login');
                    }, 3000);

                } else {
                    helperModule.renderError('Error: (HTTP status ' + response.status + '). Unable to retrieve user profile.');
                    window.location.replace(APP_PATH + '/login');
                }

            })();
        }
    };

    obj.checkUserAuthData = () => {
        let data = window.sessionStorage.getItem('oclc_reclamation_user');

        if (data !== null) {
            return true;
        }

        return false;
    };

    obj.saveUserAuthData = (data) => {

        let user = {
            uid: DOMPurify.sanitize(data.user_data.data[0].id),
            name: DOMPurify.sanitize(data.user_data.data[0].first_name) + ' ' + DOMPurify.sanitize(data.user_data.data[0].last_name)
        };

        endpointsModule.save_oclc_reclamation_endpoints(data);
        window.sessionStorage.setItem('oclc_reclamation_user', JSON.stringify(user));
    };

    obj.saveToken = () => {

        let token = helperModule.getParameterByName('t');

        if (token !== null) {

            let data = {
                token: DOMPurify.sanitize(token)
            };

            window.sessionStorage.setItem('oclc_reclamation_token', JSON.stringify(data));
        }
    };

    obj.init = function () {};

    return obj;

}());
