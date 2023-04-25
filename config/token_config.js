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

const TOKEN_CONFIG = {
    token_secret: process.env.TOKEN_SECRET,
    token_algo: process.env.TOKEN_ALGO,
    token_expires: process.env.TOKEN_EXPIRES,
    token_issuer: process.env.TOKEN_ISSUER
};

module.exports = () => {
    return TOKEN_CONFIG;
};