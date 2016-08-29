'use strict';

import assert from 'assert';
import <%= codeName %> from '../../../../<%= hookPath %>';

describe('<%= service %> <%= codeName %> hook', () => {
  it('hook can be used', () => {
    const mockHook = {
      type: '<%= type %>',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    <%= codeName %>()(mockHook);

    assert.ok(mockHook.<%= codeName %>);
  });
});
