const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try{
        const commentData = await Comments.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err)
    }
});

router.post('/', withAuth, async (req, res) => {
    try{
        const newComment = await Comments.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try{
        const commentData = await Comments.update(req.body, {
            where: {
                id: req.params.id
            },
        });
        if(!commentData[0]){
            res.status(404).json({
                message: 'No blogpost with this id was found.' });
                return;
        }
        res.status(201).json(commentData);
    } catch (err) {
        res.status(400).json(err)
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try{
        const commentData = await Comments.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if(!commentData) {
            res.status(404).json({ message: 'No blog was found with that id.' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;