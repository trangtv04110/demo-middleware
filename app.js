var app = require('express')();
var nunjucks = require('nunjucks');

nunjucks.configure('views', {

	autoescape: true,
	express: app

});

app.set('view engine', 'html');

app.use(function(req, res, next) {

	req.setEncoding('utf8');
	var body = '';

	req.on('data', function (data) {
		body += data;
	});

	req.on('end', function() {

		if(body.indexOf('&') > -1) {

			var json = '{';
			var arr = body.split('&');

			for(var i = 0; i < arr.length; i++) {

				var keyValue = arr[i].split('=');
				if(i < arr.length - 1) json += '"' + keyValue[0] + '": "' + keyValue[1] + '", ';
				else json += '"' + keyValue[0] + '": "' + keyValue[1] + '"';

			}
			
			json += '}';
			req.body = JSON.parse(json);

		}
		next();

	});
});

app.get('/', function(req, res) {
	res.render('register');
});

app.post('/', function(req, res) {
	res.render('thank', { data: req.body });
});

app.listen(3000, function() {
	console.log('Server running at port 3000');
});