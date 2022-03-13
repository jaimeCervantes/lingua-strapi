module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key: env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: 'sendmail',
      settings: {
        defaultFrom: 'pensemoswebjs@gmail.com',
        defaultReplyTo: 'pensemoswebjs@gmail.com',
      },
    },
  },
});