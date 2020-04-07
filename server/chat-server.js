'use strict';

const WebSocket = require('ws');

const Events = require('./events/events');
const ProcessEmitter = require('./process-emitter');

const processEmitter = new ProcessEmitter({ low: 70, hight: 95 });

const events = new Events();
events.initialize(processEmitter);

processEmitter.emit('initial_project');

const ws = new WebSocket.Server({
  port: 8080
});

ws.on('connection', (ws) => {
  ws.on('close', (request) => {
    processEmitter.emit('close_connection', { request });
  });

  ws.on('message', (message) => {
    processEmitter.fuseTaskManager({
      task: processEmitter.emit('message', { ws, message })
    });
  });
});
