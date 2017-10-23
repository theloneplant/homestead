var express = require('express');
var Docker = require('dockerode');
var path = require('path');
var router = express.Router();
var docker = new Docker();
const { exec } = require('child_process');

var hsPath = '/home/michael/homestead';

router.get('/', (req, res) => {
	console.log('wasd');
	exec('ls ' + hsPath + '/servers', (err, stdout, stderr) => {
		if (err) {
			console.error(`exec error: ${err}`);
			return;
		}
		console.log(`List of servers: ${stdout}`);
		res.send({
			err: null,
			res: {
				message: stdout.split('\n')
			}
		});
	});
});

router.post('/create', (req, res) => {
	console.log('started');
	console.log(req.body);
	console.log(typeof req.body);
	console.log(path.join(__dirname, 'scripts/servers/createServer.sh'));
	var json = JSON.stringify(req.body);
	console.log(json);

	exec('./createServer.sh \'' + json + '\'', {cwd: hsPath + '/homestead-manager/scripts/servers'}, (err, stdout, stderr) => {
		console.log('ok');
		console.log(stdout.split('\n'));
		console.log('ok');
		console.log(stderr.split('\n'));
		console.log('ok');
		console.log(err);
	});
});

module.exports = router;
