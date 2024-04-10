const allRoles = {
  user: ['all'],
  shopKeeper: ['all'],
  realEstate: ['all'],
  serviceProvider: ['all'],
  strategicSalePartner: ['all'],
  admin: ['all'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));
const findRole = (userRole) => {
  return roles.find((role) => role === userRole);
};
module.exports = {
  roles,
  roleRights,
  findRole,
};
 