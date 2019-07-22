/**
 * @file define actionCreators for hwew
 */

// local imports
import { setUpActions } from "./setup.action";

/**
 * @function returnActionsAsync passes the appropriate async actions to the reducer
 * @param { string } actionDictionaryKey
 */
export const returnActionsAsync = (actionDictionaryKey, actionDictionary) => {
    const actionSet = setUpActions(actionDictionary)[actionDictionaryKey];
    if (!actionSet) {
        throw new Error(
            `The dictKey ${actionDictionaryKey} does not match any parameter of the actionDictionary object `
        );
    }
    // return appropriate action types
    const returnSet = {
        request() {
            return {
                type: actionSet.request,
                fetching: true,
                payload: null,
            };
        },
        recieve(data) {
            return {
                type: actionSet.recieve,
                fetching: false,
                payload: data,
            };
        },
        fail(error) {
            return {
                type: actionSet.fail,
                fetching: false,
                payload: error,
            };
        },
    };
    return returnSet;
};

/**
 * @function returnActionSync passes the appropriate synchronous action to the store
 * @param  { Object } - value, to be passed to the reducer
 *  @param { string } - actionDictionaryKey
 */
const returnActionsSync = (actionDictionaryKey, actionDictionary) => {
    return {
        recieve(value) {
            return {
                type: `RECIEVE_${actionDictionaryKey}`,
                fetching: false,
                payload: value,
            };
        },
    };
};

/**
 * @function dispatchActions
 * @description dispatch actions to the the action creators
 * @param { string } dictKey - the actionDictionary key that is being called
 * @param { Object  } eventAction the action to pass to events could be a promise, function or an object
 * @param { boolean  }  async  if request is asynchronous is it true otherwuse it is false
 * @param { parameters } parameters array to call with parameters
 * */
export const dispatchActions = (
    dictKey,
    eventAction,
    asynchronous = true,
    parameters = [],
    actionDictionary
) => {
    if (!dictKey || !eventAction) {
        throw new Error(" !invalid request didnt pass in adequate parameters ");
    }

    if (!asynchronous) {
        const actions = returnActionsSync(dictKey);

        if (typeof eventAction === "function") {
            return actions.recieve(eventAction.apply(this, parameters));
        } else {
            return actions.recieve(eventAction);
        }
    } else {
        const actions = returnActionsAsync(dictKey, actionDictionary);
        return async dispatch => {
            dispatch(actions.request());
            const eventPromise = eventAction.apply(this, parameters);
            return Promise.resolve(eventPromise)
                .then(value => {
                    try {
                        return value
                            .json()
                            .then(v => {
                                return dispatch(actions.recieve(v));
                            })
                            .catch(err => {
                                return dispatch(actions.recieve(value));
                            });
                    } catch (err) {
                        // value can not be converted from json so we send as it is
                        return dispatch(actions.recieve(value));
                    }
                })
                .catch(err => {
                    return dispatch(actions.fail(err.message));
                });
        };
    }
};