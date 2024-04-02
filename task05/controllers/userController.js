const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../models/userModel');
const {
  parseRequestBody,
  createUserResponse,
  sendUserNotFoundResponse,
} = require('../utils/utils');

async function getUsers(req, res) {
  try {
    const users = await getAll();
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    });

    res.end(
      JSON.stringify({
        data: users.map((user) => createUserResponse(user)),
        error: null,
      })
    );
  } catch (error) {
    console.log(error);
  }
}

async function getUserHobbies(req, res) {
  try {
    const id = req.url.split('/')[3];
    const user = await getById(id);
    if (!user) {
      sendUserNotFoundResponse(res, id);
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ hobbies: user.hobbies }));
  } catch (error) {
    console.log(error);
  }
}

async function createUser(req, res) {
  try {
    const { name, email, hobbies } = await parseRequestBody(req);
    const user = { name, email, hobbies };
    const userCreated = await create(user);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        data: createUserResponse(userCreated),
        error: null,
      })
    );
  } catch (error) {
    console.log(error);
  }
}

async function updateUserHobbies(req, res) {
  try {
    const id = req.url.split('/')[3];
    const user = await getById(id);

    if (!user) {
      sendUserNotFoundResponse(res, id);
    }
    const { hobbies } = await parseRequestBody(req);
    const userForUpdate = {
      ...user,
      hobbies: [...new Set([...user.hobbies, ...hobbies])],
    };
    const updatedUser = await update(id, userForUpdate);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        data: createUserResponse(updatedUser),
        error: null,
      })
    );
  } catch (error) {
    console.log(error);
  }
}

async function removeUser(req, res) {
  try {
    const id = req.url.split('/')[3];
    console.log(id);
    const user = await getById(id);
    if (!user) {
      sendUserNotFoundResponse(res, id);
    }
    await remove(id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        data: {
          success: true,
        },
        error: null,
      })
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getUsers,
  getUserHobbies,
  createUser,
  updateUserHobbies,
  removeUser,
};
