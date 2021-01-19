const router = require('express').Router();
require('mongoose');
const Workout = require("../models/workout");


router.get('/api/workouts', (req, res) => {
    Workout.find({})
    .then(dbTransaction => {
        console.log(dbTransaction);
        res.json(dbTransaction);
    })
    .catch(err=> {
        res.status(400).json(err);
    });
});

router.post('/api/workouts', ({ body }, res) => {
    Workout.create(body)
    .then(dbTransaction => {
        res.json(dbTransaction);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});

router.put('/api/workouts/:id', ({ body, params }, res) => {
    Workout.findByIdAndUpdate(params.id,
        {$push: {exercises: body}},
        {new: true, runValidators: true }
        )
    .then(dbTransaction => {
        res.json(dbTransaction);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});

router.get('/api/workouts/range', (req, res) => {
    Workout.find({}).limit(7).sort({$natural:-1})
    .then(dbTransaction => {
        console.log(dbTransaction);
        res.json(dbTransaction);
    })
    .catch(err=> {
        res.status(400).json(err);
    });
})

module.exports = router;
