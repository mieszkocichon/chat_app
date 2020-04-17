'use strict';

const models = require('../server').models;

module.exports = function initialThreadsModule({ ws, userId }) {
  return new Promise((resolve, reject) => {
    models.Thread.find(
      {
        where: {
          users: userId
        },
        include: 'Messages'
      },
      (error, threads) => {
        if (!error && threads) {
          threads.map((thread, threadId) => {
            models.User.find(
              {
                where: {
                  id: {
                    inq: thread.users
                  }
                }
              },
              (error2, users) => {
                thread.profiles = users;

                if (!error2 && threadId === threads.length - 1) {
                  ws.send(
                    JSON.stringify({
                      type: 'INITIAL_THREADS',
                      data: threads
                    })
                  );

                  resolve({
                    msg: '',
                    statusCode: 0
                  });
                }

                reject({
                  msg: error2,
                  statusCode: -1
                });
              }
            );
          });

          resolve({
            msg: '',
            statusCode: 0
          });
        } else {
          resolve({
            msg: error,
            statusCode: -1
          });
        }
      }
    );
  });
};
