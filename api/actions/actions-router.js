// Write your "actions" router here!
const { json } = require('express');
const express = require('express');
const Action = require('./actions-model');

const { checkId } = require('./actions-middleware');

const router = express.Router();

// GET All Actions
router.get('/', (req, res) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions);
        })
})

// GET Action By ID

router.get('/:id', checkId, (req, res) => {
    res.json(req.action);
})

// POST New Action

// UPDATE Existing Action by ID

// DELETE Existing Action by ID



module.exports = router;