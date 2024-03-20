const http = require('http');
const {
  getUsers,
  getUserHobbies,
  createUser,
  updateUserHobbies,
  removeUser,
} = require('./controllers/userController');

const url = '/api/users';
const urlWithUserId = `${url}/[a-zA-Z0-9-]+`;

const server = http.createServer(async (req, res) => {
  const pathName = req.url;

  if (pathName === url && req.method === 'GET') {
    await getUsers(req, res);
  } else if (pathName === url && req.method === 'POST') {
    await createUser(req, res);
  } else if (
    req.url.match(new RegExp(`${urlWithUserId}`)) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.split('/')[3];
    await removeUser(req, res, id);
  } else if (
    req.url.match(new RegExp(`${urlWithUserId}\/hobbies`)) &&
    req.method === 'GET'
  ) {
    const id = req.url.split('/')[3];
    await getUserHobbies(req, res, id);
  } else if (
    req.url.match(new RegExp(`${urlWithUserId}\/hobbies`)) &&
    req.method === 'PATCH'
  ) {
    const id = req.url.split('/')[3];
    await updateUserHobbies(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "This route doesn't exist" }));
  }
});

server.listen(8000, () => {
  console.log('Server is running on port 8000');
});
