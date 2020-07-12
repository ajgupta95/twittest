var mongoose = require("mongoose");
const { use } = require("../routes/routes");
var Schema = mongoose.Schema; // <-- EDIT: missing in the original post
ObjectId = Schema.ObjectId;
var tweet = new Schema({
  userId:{type: Schema.Types.ObjectId, ref: 'user' },
  comments: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const tweets = mongoose.model("tweet", tweet);
module.exports = tweets;
