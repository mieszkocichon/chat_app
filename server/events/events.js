'use strict';

const { dump } = require('dumper.js');
const loginModule = require('../modules/login');
const initialThreadsModule = require('../modules/initialThreads');
const models = require('../server').models;
const match = require('../../utils/match');

module.exports = class Events {
  initialize(processEmitter) {
    processEmitter.on('initial_project', () => {
      setImmediate(() => {
        const name = 'asd32wsddrfeuol';
        const email = `${name}@asu0jioew.com`;

        const data = {
          username: name,
          password: '123123123',
          email,
          name,
        };

        models.User.findOrCreate(
          { where: { email: { like: email } } },
          data,
          (_error, _users) => {}
        );
      });
    });

    processEmitter.on('close_connection', ({ request }) => {
      let clientIndex = -1;

      const clients = processEmitter.clients;
      clients.map((c, i) => {
        if ((c) => c.ws._closeCode === request) {
          clientIndex = i;
        }
      });

      if (clientIndex > -1) {
        clients.splice(clientIndex, 1);
      }

      processEmitter.setClients({ clients });
    });

    processEmitter.on('message', ({ ws, message }) => {
      dump(JSON.parse(message));
      const parsed = JSON.parse(message);

      if (parsed) {
        match(parsed.type)
          .on(
            (x) => x === 'SIGNUP',
            () =>
              processEmitter.fuseTaskManager({
                task: processEmitter.emit('sign_up', { ws, data: parsed.data }),
              })
          )
          .on(
            (x) => x === 'CONNECT_WITH_TOKEN',
            () =>
              processEmitter.fuseTaskManager({
                task: processEmitter.emit('connect_with_token', {
                  ws,
                  data: parsed.data,
                }),
              })
          )
          .on(
            (x) => x === 'LOGIN',
            () =>
              processEmitter.fuseTaskManager({
                task: processEmitter.emit('login', { ws, data: parsed.data }),
              })
          )
          .on(
            (x) => x === 'SEARCH',
            () =>
              processEmitter.fuseTaskManager({
                task: processEmitter.emit('search', { ws, data: parsed.data }),
              })
          )
          .on(
            (x) => x === 'FIND_THREAD',
            () =>
              processEmitter.fuseTaskManager({
                task: processEmitter.emit('find_thread', {
                  ws,
                  data: parsed.data,
                }),
              })
          )
          .on(
            (x) => x === 'THREAD_LOAD',
            () =>
              processEmitter.fuseTaskManager({
                task: processEmitter.emit('thread_load', {
                  ws,
                  data: parsed.data,
                }),
              })
          )
          .on(
            (x) => x === 'ADD_MESSAGE',
            () =>
              processEmitter.fuseTaskManager({
                task: processEmitter.emit('add_message', {
                  ws,
                  data: parsed.data,
                }),
              })
          )
          .otherwise((_) => console.log('Nothing to see here.'));
      }
    });

    processEmitter.on('sign_up', ({ ws, data }) => {
      models.User.create(data, (error, user) => {
        if (error) {
          ws.send(
            JSON.stringify({
              type: 'ERROR',
              error,
            })
          );
        } else {
          models.Profile.create(
            {
              userId: user.id,
              name: data.name,
              email: data.email,
            },
            (profileError, profile) => {}
          );
        }
      });
    });

    processEmitter.on('connect_with_token', ({ ws, data }) => {
      models.User.findById(data.userId, (error2, user) => {
        if (!error2 && user) {
          const userObject = {
            id: data.userId.toString(),
            email: user.email,
            ws,
          };

          ws.uid = userObject.id + new Date().getTime().toString();

          processEmitter.setClients({ clients: userObject });

          initialThreadsModule({ ws, userId: userObject.id }).catch((_) => {});
        }
      });
    });

    processEmitter.on('login', ({ ws, data }) => {
      loginModule({ ws, email: data.email, password: data.password })
        .then((result) => {
          processEmitter.setClients({ clients: result.content.userObject });
        })
        .catch((_) => {});
    });

    processEmitter.on('search', ({ ws, data }) => {
      models.User.find(
        { where: { email: { like: data } } },
        (error2, users) => {
          if (!error2 && users) {
            ws.send(
              JSON.stringify({
                type: 'GOT_USERS',
                data: {
                  users,
                },
              })
            );
          }
        }
      );
    });

    processEmitter.on('find_thread', ({ ws, data }) => {
      models.Thread.findOne(
        {
          where: {
            users: {
              inq: data,
            },
          },
        },
        (error, thread) => {
          if (!error && thread) {
            ws.send(
              JSON.stringify({
                type: 'ADD_THREAD',
                data: thread,
              })
            );
          } else {
            models.Thread.create(
              {
                lastUpdated: new Date(),
                users: data,
              },
              (error2, thread) => {
                if (!error2 && thread) {
                  processEmitter.clients
                    .filter((u) => thread.users.indexOf(u.id.toString()) > -1)
                    .map((client) => {
                      client.ws.send(
                        JSON.stringify({
                          type: 'ADD_THREAD',
                          data: thread,
                        })
                      );
                    });
                } else {
                }
              }
            );
          }
        }
      );
    });

    processEmitter.on('thread_load', ({ ws, data }) => {
      models.Message.find(
        {
          where: {
            threadId: data.threadId,
          },
          order: 'date DESC',
          skip: data.skip,
          limit: 10,
        },
        (error2, messages) => {
          if (!error2 && messages) {
            ws.send(
              JSON.stringify({
                type: 'GOT_MESSAGES',
                threadId: data.threadId,
                messages,
              })
            );
          }
        }
      );
    });

    processEmitter.on('add_message', ({ ws, data }) => {
      models.Thread.findById(data.threadId, (error2, thread) => {
        if (!error2 && thread) {
          models.Message.upsert(data.message, (error3, message) => {
            if (!error3 && message) {
              processEmitter.clients
                .filter(
                  (client) => thread.users.indexOf(client.id.toString()) > -1
                )
                .map((client) => {
                  client.ws.send(
                    JSON.stringify({
                      type: 'ADD_MESSAGE_TO_THREAD',
                      threadId: data.threadId,
                      message,
                    })
                  );
                });
            }
          });
        }
      });
    });
  }
};
