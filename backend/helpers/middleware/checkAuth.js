import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  const tokenWithBearer = req.headers.authorization || '';
  console.log('tokenWithBearer', tokenWithBearer)
  const pureToken = tokenWithBearer.replace(/Bearer\s?/, '');

  if (!pureToken) {
    return res.status(403).json({
      message: 'No access'
    });
  }

  try {
    const decodedToken = jwt.verify(pureToken, 'secret-shop');
    console.log(decodedToken)
    req.userId = decodedToken._id;
    console.log('req.userId', req.userId)
    next();
  } catch (err) {
    console.log('No access', err)
    return res.status(403).json({
      message: 'No access'
    });
  }

  // console.log('token', token)
  // res.send(pureToken);
  // next();
}

export default checkAuth;