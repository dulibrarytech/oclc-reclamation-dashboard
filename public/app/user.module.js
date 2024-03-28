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

const userModule = (function () {

    'use strict';

    const APP_PATH = '/oclc';
    const api = configModule.getApi();
    const endpoints = endpointsModule.get_users_endpoints();
    const users_table = '#users-data-table';
    let obj = {};

    const renderUsers = function (data) {

        let users = '';
        let user;

        users += `<thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Active</th>
            <th>Edit</th>
        </tr>
        </thead>`;

        users += '<tbody>';

        for (let i = 0; i < data.length; i++) {

            user = data[i];

            users += '<tr>';
            users += '<td>' + DOMPurify.sanitize(user.first_name) + '</td>';
            users += '<td>' + DOMPurify.sanitize(user.last_name) + '</td>';
            users += '<td>' + DOMPurify.sanitize(user.email) + '</td>';

            if (user.is_active === 1) {
                users += '<td>Active</td>';
            } else if (user.is_active === 0) {
                users += '<td>Inactive</td>';
            }

            users += '<td>';
            users += '&nbsp;';
            users += '<a class="btn btn-xs btn-default" href="' + APP_PATH + '/dashboard/edit-user?id=' + DOMPurify.sanitize(user.id) + '" title="Edit User"><i class="fa fa-edit"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;';
            users += '</td>';
            users += '</tr>';
        }

        users += '</tbody>';

        domModule.html(users_table, users);

        $(users_table).DataTable({
            responsive: true,
            order: [[2, 'asc']]
        });

        return false;
    };

    const renderUserDetails = function (data) {

        let user;

        for (let i = 0; i < data.length; i++) {

            user = data[i];

            domModule.val('#id', user.id);
            domModule.val('#username', user.du_id);
            domModule.val('#email', user.email);
            domModule.val('#first_name', user.first_name);
            domModule.val('#last_name', user.last_name);

            if (user.is_active === 1) {
                $('#is_active').prop('checked', true);
            } else {
                $('#is_active').prop('checked', false);
            }
        }

        return false;
    };

    obj.getUsers = function () {

        (async () => {

            let response = await httpModule.req({
                method: 'GET',
                url: api + endpoints.users.endpoint,
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': authModule.getUserToken()
                }
            });

            if (response.status === 200) {
                renderUsers(response.data);
            } else if (response.status === 401) {
                window.location.replace(APP_PATH + '/login');
            } else {
                window.location.replace(APP_PATH + '/dashboard/error?e=' + DOMPurify.sanitize(response.status));
            }

        })();
    };

    obj.getUserDetails = function () {

        (async () => {

            let id = helperModule.getParameterByName('id');
            let response = await httpModule.req({
                method: 'GET',
                url: api + endpoints.users.endpoint + '?id=' + id,
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': authModule.getUserToken()
                }
            });

            if (response.status === 200) {
                renderUserDetails(response.data);
            } else if (response.status === 401) {
                window.location.replace(APP_PATH + '/login');
            } else {
                window.location.replace(APP_PATH + '/dashboard/error?e=' + DOMPurify.sanitize(response.status));
            }

        })();
    };

    obj.checkUserData = function () {

        let data = window.sessionStorage.getItem('oclc_reclamation_user');

        if (data !== null) {
            return true;
        }

        return false;
    };

    const validate = function (div_id, value) {
        if (value.length === 0) {
            domModule.html(`#${div_id}_error`, '<span style="color: red"><i class="fa fa-exclamation-circle"></i> Please enter a value</span>')
            return false;
        } else {
            domModule.html(`#${div_id}_error`, '');
            return value;
        }
    };

    const getUserFormData = function () {
        return {
            du_id: validate('username', domModule.val('#username', null)),
            email: validate('email', domModule.val('#email', null)),
            first_name: validate('first_name', domModule.val('#first_name', null)),
            last_name: validate('last_name', domModule.val('#last_name', null))
        };
    };

    obj.addUser = function (event) {

        event.preventDefault();

        (async () => {

            let user = getUserFormData();

            for (let prop in user) {
                if (user[prop] === false) {
                    return false;
                }
            }

            domModule.hide('#user-form');
            domModule.html('#message', '<div class="alert alert-info">Adding User...</div>');

            let response = await httpModule.req({
                method: 'POST',
                url: api + endpoints.users.endpoint,
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': authModule.getUserToken()
                },
                data: JSON.stringify(user),
            });

            if (response.status === 201) {
                domModule.html('#message', '<div class="alert alert-success">User added.</div>');

                setTimeout(() => {
                    window.location.replace(APP_PATH + '/dashboard/users');
                }, 3000);

            } else if (response.status === 401) {
                window.location.replace(APP_PATH + '/login');
            } else if (response.status === 400) {
                console.log(response);
            } else {
                window.location.replace(APP_PATH + '/dashboard/error?e=' + DOMPurify.sanitize(response.status));
            }

        })();

        return false;
    };

    obj.updateUser = function (event) {

        event.preventDefault();

        (async () => {

            let user = getUserFormData();
            user.id = helperModule.getParameterByName('id');

            if ($('#is_active').prop('checked')) {
                user.is_active = 1;
            } else {
                user.is_active = 0;
            }

            for (let prop in user) {
                if (user[prop] === false) {
                    return false;
                }
            }

            domModule.hide('#user-form');
            domModule.html('#message', '<div class="alert alert-info">Updating User...</div>');

            let response = await httpModule.req({
                method: 'PUT',
                url: api + endpoints.users.endpoint,
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': authModule.getUserToken()
                },
                data: JSON.stringify(user),
            });

            if (response.status === 201) {

                domModule.html('#message', '<div class="alert alert-success">User updated.</div>');

                setTimeout(() => {
                    window.location.replace(APP_PATH + '/dashboard/users');
                }, 3000);

            } else if (response.status === 401) {
                window.location.replace('/login');
            } else {
                window.location.replace(APP_PATH + '/dashboard/error?e=' + DOMPurify.sanitize(response.status));
            }

        })();
    };

    obj.deleteUser = function () {

        // const endpoints = endpointsModule.endpoints();
        let id = helperModule.getParameterByName('id');
        domModule.hide('#user-delete-form');
        domModule.html('#message', '<div class="alert alert-info">Deleting User...</div>');

        let token = authModule.getUserToken();
        let url = api + endpoints.users.endpoint + '?id=' + id,
            request = new Request(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                mode: 'cors'
            });

        const callback = function (response) {

            if (response.status === 204) {

                domModule.html('#message', '<div class="alert alert-success">User deleted</div>');
                setTimeout(function () {
                    domModule.html('#message', null);
                    window.location.replace(APP_PATH + '/dashboard/users');
                }, 3000);

                return false;

            } else if (response.status === 401) {

                response.json().then(function (response) {

                    helperModule.renderError('Error: (HTTP status ' + response.status + '). Your session has expired.  You will be redirected to the login page momentarily.');

                    setTimeout(function () {
                        window.location.replace(APP_PATH + '/login');
                    }, 3000);
                });

            } else {
                helperModule.renderError('Error: (HTTP status ' + response.status + ').  Unable to delete user.');
            }
        };

        httpModule.req(request, callback);
    };

    obj.init = function () {
    };

    return obj;

}());
