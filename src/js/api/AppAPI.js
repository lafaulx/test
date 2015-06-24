import request from 'superagent';
import Promise from 'bluebird';

import prepareAPIURL from '../utils/prepareAPIURL';

export default {
  getStructure() {
    let url = `/api/structure`;

    return new Promise((resolve, reject) => {
      return request
        .get(prepareAPIURL(url))
        .end((error, res) => {
          if (error) {
            return reject(error);
          } else if (res.error) {
            return reject(res.error);
          }

          resolve(res.body);
        });
    });
  }
}