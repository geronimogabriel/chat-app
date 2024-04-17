import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // cookie cannot be accessed or modified in any way by the browser
    sameSite:"strict" ,// cookie is sent only to the same origin as the request
    secure: process.env.NODE_ENV !== 'development' // cookie will only be sent over HTTPS
  }) 
}

export default generateTokenAndSetCookie;