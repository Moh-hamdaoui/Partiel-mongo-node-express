const Article = require('../models/Article.model');

exports.createArticle = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const article = await Article.create({ title, content, author });
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: 'Erreur de création', error });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article non trouvé' });
    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ message: 'ID invalide', error });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Article non trouvé' });
    res.status(200).json({ message: 'Article supprimé' });
  } catch (error) {
    res.status(400).json({ message: 'Erreur lors de la suppression', error });
  }
};
