require("babel-register")({
    presets: ["env"],
});
// Import the rest of our application.
module.exports = require("./src/reducers/index.js");
const { setUpCombinedReducers } = require("./src/reducers");
const { dispatchActions } = require("./src/actions/action.creator");

exports.setUpCombinedReducers = function() {
    return setUpCombinedReducers;
};
exports.dispatchActions = function() {
    return dispatchActions;
};