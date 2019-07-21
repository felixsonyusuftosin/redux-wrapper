/**
 * Get rids of the missing requestAnimationFrame polyfill warning.
 * 
 * @link https://reactjs.org/docs/javascript-environment-requirements.html
 */
global.requestAnimationFrame = function(callback) {
    setTimeout(callback, 0);
};