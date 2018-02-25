const Model = require('./BaseModel');
const UnsplashModel = new Model({
  schema: {
    unsplash_id: {type: String, unique: true, required: true},
    width: {type: Number},
    height: {type: Number},
    color: {type: String},
    description: {type: String},
    orientation: {type: String},
    curated: {type: Boolean, default: false},
    urls: {
      raw: {type: String},
      full: {type: String},
      regular: {type: String},
      small: {type: String},
      thumb: {type: String},
    },
    photographer: {
      username: {type: String},
      name: {type: String},
      first_name: {type: String},
      last_name: {type: String},
      profile_image: {
        small: {type: String},
        medium: {type: String},
        large: {type: String},
      },
    }
  },
  name: 'Unsplash',
});

module.exports = UnsplashModel.create();
