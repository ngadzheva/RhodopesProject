// const passport = require('passport');
// const passportJWT = require('passport-jwt');
// const JwtStrategy = passportJWT.Strategy;
// const ExtractJwt = passportJWT.ExtractJwt;
// import { UserController } from '../controllers/user';

// const opts = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: process.env.SECRET_OR_KEY
// };

// const strategy = new JwtStrategy(opts, (payload: any, next: any) => {
//   const user = new UserController(payload.userName, payload.password);

//   if(user){
//       next(null, user);
//   } else {
//       next(null, false);
//   }
// });

// passport.use(strategy);

// export { passport };