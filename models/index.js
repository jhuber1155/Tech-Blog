const User = require('./Users');
const BlogPost = require('./BlogPosts');
const Comments = require('./Comments')

User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
});

BlogPost.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comments.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, BlogPost, Comments };