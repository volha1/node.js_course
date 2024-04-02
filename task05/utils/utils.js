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

const sendUserNotFoundResponse = (res, id) => {
  res.writeHead(404, {
    'Content-Type': 'application/json',
    'Cache-Control': 'private, max-age=3600',
  });
  res.end(
    JSON.stringify({
      data: null,
      error: `User with id ${id} doesn't exist`,
    })
  );
};

const routeHandler = (routesConfig, req, res) => {
  const pathName = req.url;

  routesConfig.forEach(async (route) => {
    if (pathName.match(route.path) && req.method === route.method) {
      await route.handler(req, res);
    }
  });
};

module.exports = {
  parseRequestBody,
  createUserResponse,
  sendUserNotFoundResponse,
  routeHandler,
};
