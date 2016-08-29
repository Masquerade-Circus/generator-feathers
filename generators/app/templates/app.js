'use strict';

import path from 'path';
import favicon from 'serve-favicon';
import compress from 'compression';<% if (cors) { %>
import cors from 'cors';<% } %>
import feathers from 'feathers';
import configuration from 'feathers-configuration';
import hooks from 'feathers-hooks';<% if (providers.indexOf('rest') !== -1) { %>
import rest from 'feathers-rest';
import bodyParser from 'body-parser';<% } %><% if (providers.indexOf('socket.io') !== -1) { %>
import socketio from 'feathers-socketio';<% } %><% if (providers.indexOf('primus') !== -1) { %>
import primus from 'feathers-primus';<% } %>
import middleware from './middleware';
import services from './services';

const app = feathers();

app.configure(configuration(path.join(__dirname, '..')));<% if (cors === 'whitelisted') { %>

const whitelist = app.get('corsWhitelist');
const corsOptions = {
  origin(origin, callback){
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};<% } %>

app.use(compress())<% if (cors) { %>
  .options('*', cors(<% if (cors === 'whitelisted') { %>corsOptions<% } %>))
  .use(cors(<% if (cors === 'whitelisted') { %>corsOptions<% } %>))<% } %>
  .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
  .use('/', feathers.static( app.get('public') ))<% if(providers.indexOf('rest') !== -1) { %>
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))<% } %>
  .configure(hooks())<% if (providers.indexOf('rest') !== -1) { %>
  .configure(rest())<% } %><% if (providers.indexOf('socket.io') !== -1) { %>
  .configure(socketio())<% } %><% if(providers.indexOf('primus') !== -1) { %>
  .configure(primus({ transformer: 'websockets' }))<% } %>
  .configure(services)
  .configure(middleware);

module.exports = app;
