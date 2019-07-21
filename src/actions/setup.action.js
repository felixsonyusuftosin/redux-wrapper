/**
 * @file implementation of generic action, reads the actions from action dictionary  
 * This file will typically not require updates or edits unless for maintainance 
 */

// Local Imports

import {
    actionDictionary
} from './action.dictionary';

/**
 * third party imports 
 *  NA 
 */


/* ****************************************
 * Configure action structure 
 * ****************************************/
const REQUEST_ITEM = (PARAM) => `REQUEST_${ PARAM }`;
const RECIEVE_ITEM = (PARAM) => `RECIEVE_${ PARAM }`;
const FAIL_ITEM = (PARAM) => `FAIL_${ PARAM }`;

/**
 * @function setuUpActions set up actions statements as an object from the action types defined 
 * in the actionDictionary
 * @param { Object } actions - If you will like to pass a different set of actions from the one defined in the action dictionary pass in this variable
 * other wise it takes in a default parameter
 * @reaturn { Object } action objects 
 */
export const setUpActions = (actions = actionDictionary ) => {
    const actionObject = {};
    const allActions = Object.keys(actions);
    allActions.map((actionKey) => {
        const actionVar = actions[actionKey];
        if (!actionVar) {
            throw new Error(' You passed in a wrong action key, please check your action dictionary to ensure the key you passed in matches what is available ')
        }
        if (typeof actionVar === 'string') {
            actionObject[actionVar] = {
                request: REQUEST_ITEM(actionVar),
                recieve: RECIEVE_ITEM(actionVar),
                fail: FAIL_ITEM(actionVar)
            }
        } else if (actionVar.constructor == Array) {
            actionVar.map((layer) => {
                if (typeof layer !== 'string') {
                    throw new Error('Please ensure that the values of the actiondictionary arrays are string')
                }
                actionObject[layer] = {
                    request: REQUEST_ITEM(layer),
                    recieve: RECIEVE_ITEM(layer),
                    fail: FAIL_ITEM(layer)
                };
            })
        } else {
            throw new Error('Unsorpotted type passed in to action dictionary only strings and arrays are allowed for the value type ');
        }
    })
    return actionObject;
}