const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});


app.post('/send', function(req, res) {
	const transporter = nodemailer.createTransport({
		host: "sandbox.smtp.mailtrap.io",
		port: 2525,
		auth: {
			user: "b91bef9169a4c7",
			pass: "1ddd8973658f19"
		}
	});

	const message = {
		from: req.body.email,
		to: req.body.to,
		subject: req.body.subject,
		text: req.body.text
    };

    transporter.sendMail(message, function(error, info) {
    if (error) {
    console.log(error);
    res.status(500).send('Failed to send email. Please try again later.');
    } else {
    console.log('Email sent: ' + info.response);
    res.send('Email sent successfully!');
    }
    });
    });
    
    const port = 4000;
    app.listen(port, function() {
    console.log(`Server running on port ${port}`);
    });