const { model, Schema } = require('mongoose');

const postSchema = new Schema({
    title: String,
    description: String,
    username: String,
    comments: [
        {
            body: String,
            username: String,
        }
    ],
    likes: [
        {
            username: String,
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = model('Post', postSchema);