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

const helperModule = (function () {

    'use strict';

    const APP_PATH = '/oclc';
    let obj = {};

    /**
     * Renders error message
     */
    obj.renderError = function () {
        let error = helperModule.getParameterByName('e');
        let auth_url = configModule.getApi() + APP_PATH + '/login';
        domModule.html('#message', `<div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> ERROR: ${DOMPurify.sanitize(error)} - <a href="${auth_url}">reauthenticate</a></div>`);
        history.replaceState({}, '', APP_PATH + '/dashboard/error');
        history.pushState({}, '', APP_PATH + '/dashboard/error');
    };

    /**
     * Gets url parameter
     * @param name
     * @param url
     * @returns {*}
     */
    obj.getParameterByName = (name, url) => {

        if (!url) {
            url = window.location.href;
        }

        name = name.replace(/[\[\]]/g, "\\$&");

        let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);

        if (!results) {
            return null;
        }

        if (!results[2]) {
            return '';
        }

        return decodeURIComponent(DOMPurify.sanitize(results[2].replace(/\+/g, " ")));
    };

    obj.init = () => {};

    return obj;

}());
