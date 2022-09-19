const axios = require('axios');
function lists() {
    return axios.get('./list.json')
 } 
export {
    lists
}