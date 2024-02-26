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

const endpointsModule = (function () {

    'use strict';

    const APP_PATH = '/oclc';
    let obj = {};

    obj.save_oclc_reclamation_endpoints = (data) => {
        console.log(data);
        window.localStorage.setItem('oclc_reclamation_endpoints_users', JSON.stringify(data.endpoints.users));
        window.localStorage.setItem('oclc_reclamation_endpoints_app', JSON.stringify(data.endpoints.app));
    };

    obj.get_users_endpoints = () => {
        const oclc_reclamation_endpoints_users = window.localStorage.getItem('oclc_reclamation_endpoints_users');
        return JSON.parse(oclc_reclamation_endpoints_users);
    };

    obj.get_application_endpoints = () => {
        const oclc_reclamation_endpoints_app = window.localStorage.getItem('oclc_reclamation_endpoints_app');
        return JSON.parse(oclc_reclamation_endpoints_app);
    };

    obj.init = () => {
        return {
            authenticate: APP_PATH + '/api/v1/authenticate'
        }
    };

    return obj;

}());