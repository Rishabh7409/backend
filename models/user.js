module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: DataTypes.STRING,
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isAdmin: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  });

  return User;
};
