const router = require("express").Router();
const { Post } = require("../models/");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId
      }
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("all-posts-admin", {
      loggedIn: req.session.loggedIn,
      dashboard: true, 
      posts
    });
  } catch (err) {
    res.redirect("login");
  }
});

router.get("/newpost", withAuth, (req, res) => {
  res.render("new-post", {loggedIn: req.session.loggedIn});
});

router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render("edit-post", {
        loggedIn: req.session.loggedIn,
        post
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});

module.exports = router;
