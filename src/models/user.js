
const mongoose = require('mongoose')
const bcrypt  = require ('bcrypt');



const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum : ['user', 'admin'],
    default: 'user'
  },

});

/* UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  bcrypt.hash(this.password, 10, function(err, hash) {
    if (err) return next(err);

    this.password = hash;
    next();
  });
}); */


UserSchema.methods.verifyPassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};


UserSchema.methods.getTokenData = function() {
  return {
    id: this.id,
    email: this.email
  }
};



/* UserSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});
 */


const User = mongoose.model('User', UserSchema);



module.exports = User
