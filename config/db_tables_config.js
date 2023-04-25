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

const DB_TABLES_CONFIG = {
    oclc_reclamation: {
        records: process.env.RECORDS,
        users: process.env.USERS,
        v_set_records: process.env.V_SET_RECORDS,
        v_unset_records: process.env.V_UNSET_RECORDS,
        v_null_records: process.env.V_NULL_RECORDS,
        v_total_records: process.env.V_TOTAL_RECORDS,
        v_total_set_records: process.env.V_TOTAL_SET_RECORDS,
        v_total_unset_records: process.env.V_TOTAL_UNSET_RECORDS,
        v_total_null_records: process.env.V_TOTAL_NULL_RECORDS
    }
};

module.exports = () => {
    return DB_TABLES_CONFIG;
};
