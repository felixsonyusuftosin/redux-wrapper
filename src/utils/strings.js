/**
 * @file - define files for string manipulations
 */

// third party imports
import humps from "humps";

/**
 * @function converStringToSnakeCase
 * @description converts string to a snake case
 * @param { string } input
 * @return { string } snaked case text
 */
export const convertStringToSnakeCase = value => {
  if (value) {
    value = humps.decamelize(value);
  }
  return value;
};

/**
 * @function convertStringToTitleCase
 * @description converts  string to titleCase
 * @param { string } input
 * @return { string } Title Case text
 */
export const convertStringToTitleCase = value => {
  return value.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

/**
 * @function convertStringToCamelCase
 * @description converts  any object fields to camel case
 * @param { object } obj input object that fields needs to  be converted
 * @return { object | string } then pobject returned after fields has being converted to camelcase
 */
export const convertStringToCamelCase = obj => {
  if (typeof obj === "object") {
    return humps.camelizeKeys(obj);
  } else {
    obj = obj.toLowerCase();
    return humps.camelize(obj);
  }
};

/**
 * @function composeValidationErrorMessages
 * @description compose error messages from an array of string
 */
export const composeValidationErrorMessages = arrayOfErrorMessages => {
  let composedErrorString = "";
  arrayOfErrorMessages.map(errorMessage => {
    if (composedErrorString)
    composedErrorString =  composedErrorString.concat(` and ${errorMessage}`);
    else composedErrorString = composedErrorString.concat(errorMessage);
  });
  return composedErrorString.toLowerCase();
};
