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

import {it, expect, beforeAll} from 'vitest';
require('dotenv').load();
const REQUEST = require('supertest');
const ENDPOINTS = require('../endpoints');
const EXPRESS = require('../../config/express');
const TOKEN_CONFIG = require('../../test/token_config')();
const APP = EXPRESS();
const TEST_USER_RECORDS = require('../../test/test_user_records')();
const DB = require('../../test/db')();
const USER_TASKS = require('../tasks/user_tasks');
const TABLE = 'tbl_users_test';
const LIB = new USER_TASKS(DB, TABLE);
const API_KEY = TOKEN_CONFIG.api_key;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

it('User Tasks get_users (Unit)', async function () {
    await expect(LIB.get_users()).resolves.toBeDefined();  // toHaveLength(17)
}, 10000);

it('User Tasks get_user (Unit)', async function () {
    const id = 1;
    await expect(LIB.get_user(id)).resolves.toHaveLength(1);
}, 10000);

it('User Tasks update_user (Unit Test)', async function () {

    let user = TEST_USER_RECORDS.user_record;
    let id = user.id;
    let data = { data: 1 };
    delete user.id;

    await expect(LIB.update_user(id, user)).resolves.toMatchObject(data);
}, 10000);

it('User Tasks check_username (Unit Test)', async function () {
    let username = TEST_USER_RECORDS.username;
    let data = { is_duplicate: true };
    await expect(LIB.check_username(username)).resolves.toMatchObject(data);
}, 10000);

it('User Tasks save_user (Unit Test)', async function () {
    let user = TEST_USER_RECORDS.user_record;
    user.du_id = '871095227';
    delete user.id;
    await expect(LIB.save_user(user)).resolves.toHaveLength(1);
}, 10000);

it('User Tasks delete_user (Unit Test)', async function () {
    let result = await DB(TABLE).max('id as id').first();
    await expect(LIB.delete_user(result.id)).resolves.toBe(1);
}, 10000);

it('Users API Endpoint get_users ' + ENDPOINTS().users.endpoint + ' (E2E)', async function() {
    let response = await REQUEST(APP)
        .get(ENDPOINTS().users.endpoint + '?api_key=' + API_KEY);
    expect(response.status).toBe(200);
}, 10000);

it('Users API Endpoint get_user ' + ENDPOINTS().users.endpoint + ' (E2E)', async function() {
    let id = 1;
    let response = await REQUEST(APP)
        .get(ENDPOINTS().users.endpoint + '?id=' + id + '&api_key=' + API_KEY);
    expect(response.status).toBe(200);
}, 10000);

it('Users API Endpoint save_user ' + ENDPOINTS().users.endpoint + ' (E2E)', async function() {
    let user = TEST_USER_RECORDS.user_record;
    delete user.is_active;
    let response = await REQUEST(APP)
        .post(ENDPOINTS().users.endpoint + '?api_key=' + API_KEY)
        .send(user);
    expect(response.status).toBe(201);
}, 10000);

it('Users API Endpoint delete_user ' + ENDPOINTS().users.endpoint + ' (E2E)', async function() {
    let result = await DB(TABLE).max('id as id').first();
    let response = await REQUEST(APP)
        .delete(ENDPOINTS().users.endpoint + '?id=' + result.id + '&api_key=' + API_KEY);
    expect(response.status).toBe(204);
}, 10000);
