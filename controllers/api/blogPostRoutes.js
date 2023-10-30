const router = require('express').Router();
const { BlogPost } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try{
        const blogPostData = await BlogPost.findAll();
        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', withAuth, async (req, res) => {
    try{
        const newBlogPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlogPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/blogpost/:id', async (req, res) => {
    try{
        const blogPostData = await BlogPost.update(req.body, {
            where: {
                id: req.params.id
            },
        });
        if(!blogPostData[0]){
            res.status(404).json({
                message: 'No blogpost with this id was found.' });
                return;
        }
        res.status(201).json(blogPostData);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.delete('/blogpost/:id', withAuth, async (req, res) => {
    try{
        const blogPostData = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!blogPostData) {
            res.status(404).json({ message: 'No blog was found with that id.' });
            return;
        }

        res.status(200).json(blogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;