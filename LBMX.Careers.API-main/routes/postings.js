const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const JobPostingSchema = require('../schemas/job-posting');
const JobPosting = mongoose.model('posting', JobPostingSchema);

/* POST create posting */
router.post('/', function (req, res, next) {
  JobPosting.create(req.body, function (err, posting) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json({ posting: posting._id });
    }
  });
});

/* GET list all job postings */
router.get('/', function (req, res, next) {
  JobPosting.find({}, function (err, postings) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(postings);
    }
  });
});

/* GET show job posting */
router.get('/:_id', function (req, res, next) {
  JobPosting.findById(req.params._id, function (err, posting) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(posting);
    }
  });
});

/* DELETE remove a posting */
router.delete('/:_id', function (req, res, next) {
  JobPosting.findByIdAndRemove(req.params._id, function (err, posting) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(posting);
    }
  });
});

/*UPDATE job posting*/
router.get('/:postingId', function (req, res, next) {
  JobPosting.findById(req.params.postingId, function (err, posting) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.status(200).json(posting);
    }
  });
});

/* GET remove all postings */
/* This is useful for testing purposes */
router.get('/nuke', function (req, res, next) {
  JobPosting.remove({}, function (err) {
    if (err) {
      res.redirect('/postings');
    } else {
      res.redirect('/postings');
    }
  });
});

module.exports = router;
