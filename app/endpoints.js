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

const PREFIX = '/api/';
const VERSION = 'v1';
const ENDPOINT = '/oclc-reclamation';
const ENDPOINTS = {
    oclc_reclamation: {
        oclc_reclamation_set_records: {
            endpoint: `${PREFIX}${VERSION}${ENDPOINT}/set`,
            description: 'Gets records that are flagged as set in WorldCat',
            get: {
                params: 'token or api_key'
            }
        },
        oclc_reclamation_unset_records: {
            endpoint: `${PREFIX}${VERSION}${ENDPOINT}/unset`,
            description: 'Gets records that are flagged as unset in WorldCat',
            get: {
                params: 'token or api_key'
            }
        },
        oclc_reclamation_null_records: {
            endpoint: `${PREFIX}${VERSION}${ENDPOINT}/null`,
            description: 'Gets records that do not have an OCLC number',
            get: {
                params: 'token or api_key'
            }
        },
        oclc_reclamation_not_found_records: {
            endpoint: `${PREFIX}${VERSION}${ENDPOINT}/not_found`,
            description: 'Gets records that contain OCLC numbers that are in the catalog but not found in WorldCat',
            get: {
                params: 'token or api_key'
            }
        },
        oclc_reclamation_total_records: {
            endpoint: `${PREFIX}${VERSION}${ENDPOINT}/total_records`,
            description: 'Gets total number of catalog records',
            get: {
                params: 'token or api_key'
            }
        },
        oclc_reclamation_total_set_records: {
            endpoint: `${PREFIX}${VERSION}${ENDPOINT}/total_set_records`,
            description: 'Gets total number of records that are flagged as set in WorldCat',
            get: {
                params: 'token or api_key'
            }
        },
        oclc_reclamation_total_unset_records: {
            endpoint: `${PREFIX}${VERSION}${ENDPOINT}/total_unset_records`,
            description: 'Gets total number of records that are flagged as unset in WorldCat',
            get: {
                params: 'token or api_key'
            }
        },
        oclc_reclamation_total_null_records: {
            endpoint: `${PREFIX}${VERSION}${ENDPOINT}/total_null_records`,
            description: 'Gets total records that do not have an OCLC number',
            get: {
                params: 'token or api_key'
            }
        },
        oclc_reclamation_total_not_found_records: {
            endpoint: `${PREFIX}${VERSION}${ENDPOINT}/total_not_found_records`,
            description: 'Gets total records containing OCLC numbers that are in the catalog but not found in WorldCat',
            get: {
                params: 'token or api_key'
            }
        }
    }
};

module.exports = () => {
    return ENDPOINTS;
};
