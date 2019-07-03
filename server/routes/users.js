const express = require('express');

const router = express.Router();
const Users = require('../controllers/Users');

const userInstance = new Users();
// Get all employees
router.get('/', async (req, res) => {
  const data = await userInstance.list(req.query);
  return res.send(data);
});

// eslint-disable-next-line arrow-body-style
router.post('/', async (req, res) => {
  return userInstance.create(req.body)
    .then(user => res.send(user))
    .catch(error => res.status(422).json(error));
});

router.get('/dump', async (req, res) => {
  const data = await userInstance.list();
  res.setHeader('content-type', 'application/octet-stream');
  res.setHeader('Content-Disposition', 'attachment;filename="dump.txt"');
  return res.send(JSON.stringify(data));
});

module.exports = router;
