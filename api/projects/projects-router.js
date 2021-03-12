// Write your "projects" router here!
const express = require('express');
const Project = require('./projects-model');

const { checkId, checkProject, checkProjectUpdates, checkIdProjectActions } = require('./projects-middleware');

const router = express.Router();

// GET All Projects
router.get('/', (req, res) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects);
        })
})

// GET Project By Id
router.get('/:id', checkId, (req, res) => {
    res.status(200).json(req.project);
})

// GET All Actions For Project By Id

// POST New Project
router.post('/', checkProject, async (req, res, next) => {
    try {
        const data = await Project.insert(req.body);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});

// PUT Updates to Project By Id
router.put('/:id', checkId, checkProjectUpdates, (req, res, next) => {
    const id = req.params.id;
    const changes = req.body;

    !changes && res.status(400).json({ message: "No updates in request body." })

    Project.update(id, changes)
        .then(updates => {
            res.status(200).json(updates);
        })
        .catch(err => {
            next(err);
        })
})

// DELETE Project By Id
router.delete('/:id', checkId, async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Project.remove(id);
        res.json(data);
    } catch (err) {
        next(err);
    }
})

// GET A Project's Actions By Project ID
router.get('/:id/actions', checkIdProjectActions, (req, res) => {
    const id = req.params.id;

    Project.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(err => {
            res.status(500).json({ message: `Server error: ${err}` });
        })
});

// Fallback in Case of Uncaught Errors

router.use((error, req, res) => {
    res
      .status(500)
      .json({ message: error.message, stack: error.stack });
  });



module.exports = router;