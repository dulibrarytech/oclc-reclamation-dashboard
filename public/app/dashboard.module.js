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

const dashboardModule = (function () {

    'use strict';

    const APP_PATH = '/oclc';
    const api = configModule.getApi();
    const data_table = '#data-table';
    const card_title = '.card-title';
    let obj = {};

    obj.get_stats = () => {

        const endpoints = endpointsModule.get_application_endpoints();
        let stats = [];
        let token = authModule.getUserToken();

        stats.push(endpoints.oclc_reclamation.oclc_reclamation_total_records.endpoint);
        stats.push(endpoints.oclc_reclamation.oclc_reclamation_total_null_records.endpoint);
        stats.push(endpoints.oclc_reclamation.oclc_reclamation_total_set_records.endpoint);
        stats.push(endpoints.oclc_reclamation.oclc_reclamation_total_unset_records.endpoint);
        stats.push(endpoints.oclc_reclamation.oclc_reclamation_total_not_found_records.endpoint);

        stats.forEach((endpoint) => {

            (async () => {

                let response = await httpModule.req({
                    method: 'GET',
                    url: api + endpoint,
                    headers: {
                        'Content-Type': 'application/json',
                        'x-access-token': token
                    }
                });

                if (response.status === 200) {

                    if (response.data[0].total_catalog_records !== undefined) {
                        domModule.html('.total-cataloged-records', DOMPurify.sanitize(response.data[0].total_catalog_records.toLocaleString()));
                    }

                    if (response.data[0].total_catalog_unset_records !== undefined) {
                        domModule.html('.total-unset-records', DOMPurify.sanitize(response.data[0].total_catalog_unset_records.toLocaleString()));
                    }

                    if (response.data[0].total_catalog_set_records !== undefined) {
                        domModule.html('.total-set-records', DOMPurify.sanitize(response.data[0].total_catalog_set_records.toLocaleString()));
                    }

                    if (response.data[0].total_catalog_null_records !== undefined) {
                        domModule.html('.total-null-records', DOMPurify.sanitize(response.data[0].total_catalog_null_records.toLocaleString()));
                    }

                    if (response.data[0].total_not_found_records !== undefined) {
                        domModule.html('.total-notfound-records', DOMPurify.sanitize(response.data[0].total_not_found_records.toLocaleString()));
                    }

                } else if (response.status === 401) {
                    window.location.replace(APP_PATH + '/login');
                } else {
                    window.location.replace(APP_PATH + '/dashboard/error?status=' + DOMPurify.sanitize(response.status));
                }

            })();
        });
    };

    obj.get_unset_records = () => {

        const endpoints = endpointsModule.get_application_endpoints();

        if ($.fn.dataTable.isDataTable(data_table)) {
            $(data_table).DataTable().clear().destroy();
        }

        let header = `<thead>
            <tr>
                <th>MMS ID</th>
                <th style="width: 15%">OCLC Number</th>
                <th style="width: 30%">Title</th>
                <th>Worldcat ID</th>
                <th>ISBN</th>
            </tr>
            </thead>`;

        domModule.html(card_title, '<i class="fa fa-square-o"></i>&nbsp;&nbsp;These records are available in Alma and WorldCat but are not SET in WorldCat');
        domModule.html(data_table, header);

        $(data_table).DataTable({
            ajax: {
                url: api + endpoints.oclc_reclamation.oclc_reclamation_unset_records.endpoint + '?t=' + authModule.getUserToken(),
                dataSrc: ''
            },
            order: [[2, 'asc']],
            columns: [
                {data: 'mms_id'},
                {data: 'current_worldcat_oclc_number'},
                {data: 'title'},
                {data: 'worldcat_id'},
                {data: 'isbn'}
            ],
            dom: 'lBfrtip',
            buttons: [
                {
                    extend: 'csvHtml5',
                    text: 'Export to CSV',
                    title: '',
                    filename: `oclc_reclamation_unset_export_${Date.now()}`,
                    action: function (e, dt, button, config) {
                        domModule.html('#message', '<div class="alert alert-info">Exporting data...</div>');
                        setTimeout(function () {
                            $.fn.dataTable.ext.buttons.csvHtml5.action.call(this, e, dt, button, config);
                            domModule.html('#message', '');
                        }, 500);
                    },
                },
            ],
            lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]]
        });
    };

    obj.get_set_records = () => {

        const endpoints = endpointsModule.get_application_endpoints();

        if ($.fn.dataTable.isDataTable(data_table)) {
            $(data_table).DataTable().clear().destroy();
        }

        let header = `<thead>
            <tr>
                <th style="width: 30%">MMS ID</th>
                <th style="30%">OCLC Number</th>
                <th style="width: 30%">Title</th>
                <th>Worldcat ID</th>
                <th>ISBN</th>
            </tr>
            </thead>`;

        domModule.html(card_title, '<i class="fa fa-square"></i>&nbsp;&nbsp;These records are available in Alma and WorldCat and are SET in WorldCat');
        domModule.html(data_table, header);

        $(data_table).DataTable({
            ajax: {
                url: api + endpoints.oclc_reclamation.oclc_reclamation_set_records.endpoint + '?t=' + authModule.getUserToken(),
                dataSrc: ''
            },
            order: [[2, 'asc']],
            columns: [
                {data: 'mms_id'},
                {data: 'current_worldcat_oclc_number'},
                {data: 'title'},
                {data: 'worldcat_id'},
                {data: 'isbn'}
            ],
            lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]]
        });
    };

    obj.get_null_records = () => {

        const endpoints = endpointsModule.get_application_endpoints();

        if ($.fn.dataTable.isDataTable(data_table)) {
            $(data_table).DataTable().clear().destroy();
        }

        let header = `<thead>
            <tr>
                <th style="width: 30%;">MMS ID</th>
                <th style="width: 70%">Title</th>
            </tr>
            </thead>`;

        domModule.html(card_title, '<i class="fa fa-circle-o"></i>&nbsp;&nbsp;These records are available in Alma but do not have an OCLC number or an ISBN');
        domModule.html(data_table, header);

        $(data_table).DataTable({
            ajax: {
                url: api + endpoints.oclc_reclamation.oclc_reclamation_null_records.endpoint + '?t=' + authModule.getUserToken(),
                dataSrc: ''
            },
            order: [[1, 'asc']],
            columns: [
                {data: 'mms_id'},
                {data: 'title'}
            ],
            dom: 'lBfrtip',
            buttons: [
                {
                    extend: 'csvHtml5',
                    text: 'Export to CSV',
                    title: '',
                    filename: `oclc_reclamation_no_oclc_numbers_export_${Date.now()}`,
                    action: function (e, dt, button, config) {
                        domModule.html('#message', '<div class="alert alert-info">Exporting data...</div>');
                        setTimeout(function () {
                            $.fn.dataTable.ext.buttons.csvHtml5.action.call(this, e, dt, button, config);
                            domModule.html('#message', '');
                        }, 500);
                    },
                },
            ],
            lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]]
        });
    };

    obj.get_not_found_records = () => {

        const endpoints = endpointsModule.get_application_endpoints();

        if ($.fn.dataTable.isDataTable(data_table)) {
            $(data_table).DataTable().clear().destroy();
        }

        let header = `<thead>
            <tr>
                <th style="width: 20%">MMS ID</th>
                <th style="width: 30%">Title</th>
                <th>OCLC Numbers</th>
                <th>ISBN</th>
            </tr>
            </thead>`;

        domModule.html(card_title, '<i class="fa fa-ban"></i>&nbsp;&nbsp;These records are available in Alma, have OCLC Numbers, but were not found on WorldCat');
        domModule.html(data_table, header);

        $(data_table).DataTable({
            ajax: {
                url: api + endpoints.oclc_reclamation.oclc_reclamation_not_found_records.endpoint + '?t=' + authModule.getUserToken(),
                dataSrc: ''
            },
            order: [[2, 'asc']],
            columns: [
                {data: 'mms_id'},
                {data: 'title'},
                {data: 'oclc_numbers'},
                {data: 'isbn'}
            ],
            dom: 'lBfrtip',
            buttons: [
                {
                    extend: 'csvHtml5',
                    text: 'Export to CSV',
                    title: '',
                    filename: `oclc_reclamation_not_found_export_${Date.now()}`,
                    action: function (e, dt, button, config) {
                        domModule.html('#message', '<div class="alert alert-info">Exporting data...</div>');
                        setTimeout(function () {
                            $.fn.dataTable.ext.buttons.csvHtml5.action.call(this, e, dt, button, config);
                            domModule.html('#message', '');
                        }, 500);
                    },
                },
            ],
            lengthMenu: [[10, 20, 50, 100], [10, 20, 50, 100]]
        });
    };

    return obj;

}());