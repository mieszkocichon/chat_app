'use strict';

const models = require('../server').models;
const initialThreadsModule = require('./initialThreads');

module.exports = function loginModule({ ws, email, password }) {
  return new Promise((resolve, reject) => {
    models.User.login({ email, password }, (error, result) => {
      if (error) {
        reject({
          msg: error,
          statusCode: -1
        });
      } else {
        const userObject = {
          id: result.userId.toString(),
          email,
          ws
        };

        ws.uid = userObject.id + new Date().getTime().toString();

        initialThreadsModule({ ws, userId: userObject.id })
          .then(_ => {
            models.User.findOne(
              { where: { id: result.userId }, include: 'Profile' },
              (error2, user) => {
                if (error2) {
                  ws.send(
                    JSON.stringify({
                      type: 'ERROR',
                      error2
                    })
                  );

                  resolve({
                    msg: error2,
                    statusCode: -1
                  });
                } else {
                  ws.send(
                    JSON.stringify({
                      type: 'LOGGEDIN',
                      data: {
                        session: result,
                        user
                      }
                    })
                  );

                  resolve({
                    msg: '',
                    content: {
                      userObject
                    },
                    statusCode: 0
                  });
                }
              }
            );
          })
          .catch(error2 => {
            reject({
              msg: error2,
              statusCode: -1
            });
          });
      }
    });
  });
};
