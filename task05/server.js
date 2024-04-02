const http = require('http');
const {
  getUsers,
  getUserHobbies,
  createUser,
  updateUserHobbies,
  removeUser,
} = require('./controllers/userController');
const { routeHandler } = require('./utils/utils');

const url = '/api/users$';
const urlWithUserId = `/api/users/[a-zA-Z0-9-]+`;

const routesConfig = [
  { path: new RegExp(url), method: 'GET', handler: getUsers },
  { path: new RegExp(url), method: 'POST', handler: createUser },
  {
    path: new RegExp(`${urlWithUserId}`),
    method: 'DELETE',
    handler: removeUser,
  },
  {
    path: new RegExp(`${urlWithUserId}\/hobbies`),
    method: 'GET',
    handler: getUserHobbies,
  },
  {
    path: new RegExp(`${urlWithUserId}\/hobbies`),
    method: 'PATCH',
    handler: updateUserHobbies,
  },
];

const server = http.createServer(async (req, res) => {
  routeHandler(routesConfig, req, res);
});

server.listen(8000, () => {
  console.log('Server is running on port 8000');
});
