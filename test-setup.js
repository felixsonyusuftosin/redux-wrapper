/**
 * @file Boiler plate setup for enzyme to work with jest 
 */

const  Adapter = require('enzyme-adapter-react-16');
// third party imports 
const Enzyme = require('enzyme')

// local imports 
// N/A

Enzyme.configure({
    adapter: new Adapter()
});