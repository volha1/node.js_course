const parseRequestBody = (req) =>
  new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      resolve(JSON.parse(body));
    });

    req.on('error', (error) => {
      reject(error);
    });
  });

const createUserResponse = (user) => {
  return {
    user: user,
    links: {
      self: `/api/users/${user.id}`,
      hobbies: `/api/users/${user.id}/hobbies`,
    },
  };
};

module.exports = {
  parseRequestBody, createUserResponse
};
