const resources = { users: 'users', business: 'business', userOrder: 'userOrder'};

const permissions = {
  create: 'create:any',
  read: 'read:any',
  update: 'update:any',
  delete: 'delete:any',
  createOwn: 'create:own',
  updateOwn: 'update:own',
  deleteOwn: 'delete:own',
  readOwn: 'read:own',
};

module.exports = {
  permissions,
  resources, 
};