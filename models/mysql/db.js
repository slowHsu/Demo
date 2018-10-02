const Sequelize = require('sequelize');
const dbConfig = require('../../configs/mysql').dbConfig;

let sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
    }
});

let User = sequelize.define('User', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  name: {type: Sequelize.STRING, unique: true, allowNull: false}
}, {
  freezeTableName: true
});

let Post = sequelize.define('Post', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  title: {type: Sequelize.STRING, allowNull: false},
  content: {type: Sequelize.TEXT, allowNull: true},
  author_id: {  type: Sequelize.INTEGER, allowNull: false,
    references: {     // foreign key
      model: User,
      key: 'id'
    }
  }
}, {
  freezeTableName: true
});

let Like = sequelize.define('Like', {
  id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true},
  post_id: {type: Sequelize.INTEGER, allowNull: false, unique: 'compositeIndex',
    references: {     // foreign key
      model: Post,
      key: 'id'
    }
  },
  author_id: {  type: Sequelize.INTEGER, allowNull: false, unique: 'compositeIndex',
    references: {     // foreign key
      model: User,
      key: 'id'
    }
  }
}, {
  freezeTableName: true
});

User.sync({ force: true });
Post.sync({ force: true });
Like.sync({ force: true });

exports.sequelize = sequelize;
exports.User = User;
exports.Post = Post;
exports.Like = Like;