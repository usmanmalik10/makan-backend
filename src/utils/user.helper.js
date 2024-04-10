const AccessControl = require('accesscontrol');
const { grantList } = require('../config/grantList');

const ac = new AccessControl(grantList);

const hasPermission = (roles, resource, requiredRight) => {
  let allowed = false;
    switch (requiredRight) {
      case 'create:any':
        allowed = ac.can(roles).createAny(resource);
        break;
      case 'read:any':
        allowed = ac.can(roles).readAny(resource);
        break;
      case 'update:any':
        allowed = ac.can(roles).updateAny(resource);
        break;
      case 'delete:any':
        allowed = ac.can(roles).deleteAny(resource);
        break;
      case 'create:own':
        allowed = ac.can(roles).createOwn(resource);
        break;
      case 'update:own':
        allowed = ac.can(roles).updateOwn(resource);
        break;
      case 'read:own':
        allowed = ac.can(roles).readOwn(resource);
        break;
      case 'delete:own':
        allowed = ac.can(roles).deleteOwn(resource);
        break;
      default:
        break;
    }
  return allowed;
};

module.exports = {
  hasPermission,
};
