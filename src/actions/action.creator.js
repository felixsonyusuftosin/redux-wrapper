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
        error: false
      };
    },
    recieve(data) {
      return {
        type: actionSet.recieve,
        fetching: false,
        payload: data,
        error: false
      };
    },
    fail(error) {
      return {
        type: actionSet.fail,
        fetching: false,
        payload: null,
        error
      };
    }
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
        error: false
      };
    }
  };
};

/**
 * @function dispatchActionSync a dispatcher for synchronous requests. This does not use redux thunk middleware to update the store
 * @param { dictKey:string } - the key (Snake Cased and Uppercasew ) in the store  as defined in the  ActionDIctionary. Typically this is the value we are updating
 * @param { values:any } - Any value you want to pass into the store , could also be of type function, if this is the case please pass in the parameters to the function as the last argument
 * @param { actionDictionary: Object } -  Object containing {KEY:VALUE } pairs of actions defined in the action dictionary, this is what is camelized and passed into the store
 * @param { parameters:any[]} -  If values (above ) is a function, please pass the positional array of parameters as the last argument to the function
 */
export const dispatchActionSync = (
  dictKey,
  values,
  actionDictionary,
  parameters = []
) => {
  if (!dictKey) {
    throw new Error(" !invalid request didnt pass in adequate parameters ");
  }
  const actions = returnActionsSync(dictKey);

  if (typeof values === "function") {
    return actions.recieve(values.apply(this, parameters));
  } else {
    return actions.recieve(values);
  }
};

/**
 * @function dispatchActionSync a dispatcher for synchronous requests. This does not use redux thunk middleware to update the store
 * @param { dictKey:string } - the key (Snake Cased and Uppercasew ) in the store  as defined in the  ActionDIctionary. Typically this is the value we are updating
 * @param { methods: Promise } - Any function (Promise) that resolves to a value that should be passed into the store if this is the case please pass in the parameters to the function as the last argument
 * @param { actionDictionary: Object } -  Object containing {KEY:VALUE } pairs of actions defined in the action dictionary, this is what is camelized and passed into the store
 * @param { parameters:any[]} -  please pass the positional array of parameters for the methods above  as the last argument to the function
 */
export const dispatchActionAsync = (
  dictKey,
  method,
  actionDictionary,
  parameters = []
) => {
  if (!dictKey) {
    throw new Error(" !invalid request didnt pass in adequate parameters ");
  }
  const actions = returnActionsAsync(dictKey, actionDictionary);
  return async dispatch => {
    dispatch(actions.request());
    try {
      const values = await method.apply(this, parameters);
      return dispatch(actions.recieve(values));
    } catch (err) {
      return dispatch(actions.fail(err.message));
    }
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
  if (!dictKey) {
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
