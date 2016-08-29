'use strict';

// <%= hookPath %>
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

export default options => {
  options = Object.assign({}, defaults, options);

  return hook => {
    hook.<%= codeName %> = true;
  };
};
