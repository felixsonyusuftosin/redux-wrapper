require("@babel/register")({
  presets: ["@babel/preset-env"]
});

// Import the rest of our application.

const { setUpCombinedReducers } = require("./reducers");
const {
  dispatchActions,
  dispatchActionAsync,
  dispatchActionSync
} = require("./actions/action.creator");

module.exports = {
  dispatchActions,
  setUpCombinedReducers,
  dispatchActionAsync,
  dispatchActionSync
};
