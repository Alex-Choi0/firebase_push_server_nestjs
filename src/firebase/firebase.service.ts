import { Injectable } from '@nestjs/common';
const { google } = require('googleapis');

@Injectable()
export class FirebaseService {
  async getAccessToken() {
    return new Promise(function (resolve, reject) {
      const pathArray: string[] = __dirname.split('/');
      console.log(pathArray);
      console.log(__dirname.split('/').length - 3);
      let path: string = '/';

      for (let i = 1; i < pathArray.length - 2; i++) {
        path += '/' + pathArray[i];
      }

      console.log(path);
      const key = require(`${path}/firebase.json`);
      console.log(key);
      const MESSAGING_SCOPE =
        'https://www.googleapis.com/auth/firebase.messaging';
      const SCOPES = [MESSAGING_SCOPE];
      const jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        SCOPES,
        null,
      );
      jwtClient.authorize(function (err, tokens) {
        if (err) {
          reject(err);
          return;
        }
        resolve(tokens.access_token);
      });
    });
  }
}
