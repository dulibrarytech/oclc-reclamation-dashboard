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

const domModule = (function () {

    'use strict';

    let obj = {};

    /**
     * Injects data into DOM via id or class
     * @param selector
     * @param data
     * @returns {boolean}
     */
    obj.html = function(selector, data) {

        let result = true;

        if (selector.indexOf('#') !== -1) {

            let id = document.querySelector(selector);

            if (id) {
                id.innerHTML = data;
            }

        } else if (selector.indexOf('.') !== -1) {

            let classArr = document.querySelectorAll(selector);

            if (classArr.length > 1) {
                for (let i=0;i<classArr.length;i++) {
                    classArr[i].innerHTML = data;
                }

            } else if (classArr.length === 1) {
                document.querySelector(selector).innerHTML = data;
            } else {
                // Class not found
                result = false;
            }

        } else {
            // A proper selector (id or class) has not been defined
            result = false;
        }

        return result;
    };

    /**
     * Gets or sets form field data
     * @param selector
     * @param data
     * @returns {*}
     */
    obj.val = function(selector, data) {

        let result = true;

        if (selector.indexOf('#') !== -1 || selector.indexOf('.') !== -1) {

            let id = document.querySelector(selector);

            if (id && data !== null) {
                id.value = DOMPurify.sanitize(data);
            }

            return id.value.trim();

        } else {
            // A proper selector (id or class) has not been defined
            result = false;
        }

        return result;
    };

    /**
     * Gets form field data
     * @param selector
     * @returns {string}
     */
    obj.serialize = function(selector) {

        let vals = [];
        let form = document.querySelector(selector);

        for (let i = 0; i < form.elements.length; i++) {
            let elems = form.elements[i];
            if (elems.name.length !== 0 && elems.value.length !== 0) {
                vals.push(encodeURIComponent(DOMPurify.sanitize(elems.name)) + "=" + encodeURIComponent(DOMPurify.sanitize(elems.value).trim()));
            }
        }

        return vals.join('&');
    };

    /**
     * Hides element
     * @param selector
     */
    obj.hide = function(selector) {

        let result = true;

        if (selector.indexOf('#') !== -1) {

            let id = document.querySelector(selector);

            if (id) {
                id.style.display = 'none';
            }

        } else if (selector.indexOf('.') !== -1) {

            let classArr = document.querySelectorAll(selector);

            if (classArr.length > 1) {
                for (let i = 0; i < classArr.length; i++) {
                    classArr[i].style.display = 'none';
                }

            } else if (classArr.length === 1) {
                document.querySelector(selector).style.display = 'none';
            } else {
                // Class not found
                result = false;
            }
        }

        return result;
    };

    /**
     * Shows element
     * @param selector
     */
    obj.show = function(selector) {

        let result = true;

        if (selector.indexOf('#') !== -1) {

            let id = document.querySelector(selector);

            if (id) {
                id.style.display = 'block';
            }

        } else if (selector.indexOf('.') !== -1) {

            let classArr = document.querySelectorAll(selector);

            if (classArr.length > 1) {
                for (let i = 0; i < classArr.length; i++) {
                    classArr[i].style.display = 'block';
                }

            } else if (classArr.length === 1) {
                document.querySelector(selector).style.display = 'block';
            } else {
                // Class not found
                result = false;
            }
        }

        return result;
    };

    /**
     * Empties contents of element
     * @param selector
     * @returns {boolean}
     */
    obj.empty = function(selector) {

        let elem = document.querySelector(selector);

        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }

        return true;
    };

    /**
     * Changes element id value
     * @param currentId
     * @param newId
     */
    obj.id = function(currentId, newId) {
        let elem = document.getElementById(currentId);
        elem.id = newId;
    };

    /**
     * Gets element reference by selector
     * @param selector
     * @returns {Element}
     */
    obj.getElement = function(selector) {
        return document.querySelector(selector);
    };

    return obj;

}());