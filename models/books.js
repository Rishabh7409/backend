module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define("books", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deleted: {
        type: DataTypes.INTEGER(2),
        defaultValue: 0,
        allowNull: false,
      },
    });
    // Book.sync({ force: true })
    return Book;
  };
  