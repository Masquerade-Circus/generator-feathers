'use strict';

import globalHooks from '../../../hooks';
import hooks from 'feathers-hooks';
<% if (authentication) { %>import {hooks as auth} from 'feathers-authentication';<% } %>

var before = {
  all: [<% if (authentication && name !== 'user') { %>
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  <% } %>],
  find: [<% if (authentication && name === 'user') { %>
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  <% } %>],
  get: [<% if (authentication && name === 'user') { %>
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: <% if (database === 'mongodb' || database === 'nedb') { %>'_id'<% } else { %>'id'<% } %> })
  <% } %>],
  create: [<% if (authentication && name === 'user') { %>
    auth.hashPassword()
  <% } %>],
  update: [<% if (authentication && name === 'user') { %>
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: <% if (database === 'mongodb' || database === 'nedb') { %>'_id'<% } else { %>'id'<% } %> })
  <% } %>],
  patch: [<% if (authentication && name === 'user') { %>
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: <% if (database === 'mongodb' || database === 'nedb') { %>'_id'<% } else { %>'id'<% } %> })
  <% } %>],
  remove: [<% if (authentication && name === 'user') { %>
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: <% if (database === 'mongodb' || database === 'nedb') { %>'_id'<% } else { %>'id'<% } %> })
  <% } %>]
};

var after = {
  all: [<% if (authentication && name === 'user') { %>hooks.remove('password')<% } %>],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

export default {before, after}
