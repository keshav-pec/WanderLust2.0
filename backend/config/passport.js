const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/user.model");

// JWT Strategy - for protected routes
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header
  secretOrKey: process.env.JWT_SECRET || "your-secret-key-change-in-production",
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      // Find user by ID stored in JWT payload
      const user = await User.findById(jwt_payload.id);
      
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);

// Local Strategy - for login with username/password
passport.use(
  new LocalStrategy(
    {
      usernameField: "username", // Can be username or email
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        // Find user by username
        const user = await User.findOne({ username });

        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

module.exports = passport;
