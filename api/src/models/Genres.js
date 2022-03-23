const { DataTypes } = require("sequelize");

module.exports = (sequalize) => {
  sequalize.define(
    "genres",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};
