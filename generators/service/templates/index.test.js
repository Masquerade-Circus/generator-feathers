'use strict';

import assert from 'assert';
import app from '../../../src/app';

describe('<%= name %> service', () => {
    it('registered the <%= pluralizedName %> service', () => {
        assert.ok(app.service('<%= pluralizedName %>'));
    });
});
