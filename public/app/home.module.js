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

const homeModule = (function () {

    'use strict';

    let obj = {};

    obj.init = () => {

        if (authModule.checkUserAuthData() === false) {
            authModule.getAuthUserData();
        }

        history.replaceState({}, '', '/dashboard/home');
        history.pushState({}, '', '/dashboard/home');

        domModule.html('#message', '<div class="alert alert-info">Loading Dashboard...</div>');

        setTimeout(() => {
            dashboardModule.get_stats();
            dashboardModule.get_unset_records();
        }, 1000);

        setTimeout(() => {
            document.querySelector('#stats').style.visibility = 'visible';
            document.querySelector('#reclamation-data').style.visibility = 'visible';
            domModule.html('#message', '');
        }, 2000);
    };

    return obj;

}());

homeModule.init();