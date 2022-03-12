module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'ff41dcff87d2d9869179c93e4db1208b'),
  },
});
