require("babel-register")({
    presets: ["env"],
});
// Import the rest of our application.

const { setUpCombinedReducers } = require("./src/reducers");
const { dispatchActions } = require("./src/actions/action.creator");

module.exports = {
    dispatchActions,
    setUpCombinedReducers,
};