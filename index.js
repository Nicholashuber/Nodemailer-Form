var nodemailer = require("nodemailer");

exports.handler = function(event, context, callback) {
    
    console.log("event ", JSON.stringify(event));
    var eventbody = event.body;
    var obj = JSON.parse(eventbody);
    
   
   console.log("event body ", event.body);
   console.log("event name ", obj.name);
   console.log("event phone ", obj.phone);
   console.log("event message ", obj.message);
   console.log("entire event ", event);

const response = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
  },
  body: JSON.stringify(event)
};

let transporter = nodemailer.createTransport({
host: "mail.smtp2go.com",
port: 2525, // 8025, 587 and 25 can also be used. 
auth: {
user: "usernameexample",
pass: "passwordexample"
}
});

transporter.sendMail({
from: "user@gmail",
to: "Nick@Huber.codes",
subject: "Consulting Request",
text: "New Message From Website \r \r"+obj.message+"\r \rEmail: "+obj.phone+"\r \rName: "+obj.name+"\r \r"
}, function(error, response){
if(error){
console.log(error);
}else{
console.log("Message sent: " + response.message);
}
});

callback(null, response);
};
