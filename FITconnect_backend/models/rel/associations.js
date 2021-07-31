module.exports = function (models) {
  models.Articles.belongsTo(models.Trainers,
    {
      foreignKey: 'trainerId'
    });
  models.Trainers.hasMany(models.Articles,
    {
      foreignKey: 'trainerId'
    });

}