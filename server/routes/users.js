const express = require('express');
const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip();
const router = express.Router();
const Users = require('../controllers/Users');

const userInstance = new Users();
// Get all users
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
  const dir = './downloads';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  const response = JSON.stringify(data);
  fs.writeFileSync(`${dir}/dump.txt`, response);
  await new Promise((resolve) => {
    const input = fs.createReadStream(`${dir}/dump.txt`);
    const output = fs.createWriteStream(`${dir}/dump.txt.gz`);
    input.pipe(gzip).pipe(output);
    output.on('close', () => resolve());
  });
  return res.download(`${dir}/dump.txt.gz`);
});

module.exports = router;
