//	──[	EXPORT MODULE ]─────────────────────────────────────────────────────────────────
module.exports = async (req, res, next) => {
  try {
    res.render('index', {
      title: 'Express',
    });
  } catch (error) {
    next(error);
  }
};
