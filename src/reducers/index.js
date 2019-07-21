import { combineReducers } from "redux";
import { reducerObject } from "./reducer";
import { convertStringToCamelCase } from "../utils/strings";

/**
 * @function updateReducersObject create an array of reducers from the actionDictionary
 */
const updateReducersObject = actionDictionary => {
    const mergedReducers = {};
    const objectDict = reducerObject(actionDictionary);
    Object.keys(objectDict).map(key => {
        if (key !== "TEST_STORE") {
            mergedReducers[
                String(convertStringToCamelCase(key.toLocaleLowerCase()))
            ] = objectDict[key];
        }
        return mergedReducers;
    });
    return mergedReducers;
};
/**
 * Returns a combinecd reducer
 * @param {Object} actionDictionary
 * @param {reducerObject} otherReducers
 */
export const setUpCombinedReducers = (actionDictionary, otherReducers = {}) =>
    combineReducers({ otherReducers, ...updateReducersObject(actionDictionary) });