import * as request from 'superagent';
import config from './dev';


function getValues() {
    return request.get(config.URI + "/values");
}

export {
    getValues
}