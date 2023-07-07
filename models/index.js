const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


// relation User-Post
User.hasMany(Post, {
    foreign_key: 'user_id',
    onDelete: 'CASCADE',
});

Post.belongsTo(User, {
    foreign_key: 'user_id',
});

//relation User-Comment
User.hasMany(Comment, {
    foreign_key: 'user_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
    foreign_key: 'user_id',
});

//relation Post-Comment
Post.hasMany(Comment, {
    foreign_key: 'post_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
    foreign_key: 'post_id',
});

module.exports = {
    User,
    Post,
    Comment,
};