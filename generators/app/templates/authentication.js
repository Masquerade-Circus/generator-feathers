'use strict';

import authentication from 'feathers-authentication';
<% for (var i = 0; i < authentication.length; i++) { %>
import <%= S(authentication[i].name).capitalize().s %>{Strategy} from '<%= authentication[i].strategy %>';<% if (authentication[i].tokenStrategy) { %>
import <%= S(authentication[i].name).capitalize().s %><% if (authentication[i].tokenStrategyExposedNormally) { %>{<% } %>Strategy<% if (authentication[i].tokenStrategyExposedNormally) { %>}<% } %> from '<%= authentication[i].tokenStrategy %>';<% }} %>

module.exports = function() {
  const app = this;

  let config = app.get('auth');
  <% for (var i = 0; i < authentication.length; i++) { %>
  config.<%= authentication[i].name %>.strategy = <%= S(authentication[i].name).capitalize().s %>Strategy;<% if (authentication[i].tokenStrategy) { %>
  config.<%= authentication[i].name %>.tokenStrategy = <%= S(authentication[i].name).capitalize().s %>TokenStrategy;<% }} %>

  <% if(authentication.length) { %>app.set('auth', config);<% } %>
  app.configure(authentication(config));
};
