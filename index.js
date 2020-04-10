// fs is a Node standard library package for reading and writing files
var fs = require("fs");
// for making it asynchronus instead of using callback functions in readfile/writefile
const util = require("util");
// var inquirer = require("inquirer"); or
const inquirer = require('inquirer');
// for api call
const axios = require("axios");
// The built-in util package can be used to create Promise-based versions of functions using node style callbacks
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

inquirer.prompt ([
    {
        type: "input",
        message: "What is your Github username?",
        name: "username",
      },
      {
        message: "What is your Project's Title?",
        name: "title",
        type: "input",
      },
      {
        message: "Please write a brief Description of your project",
        name: "description",
        type: "input",
      }
]).then(function (data) {

    console.log(data);

    axios
        // .get(`-H "Authorization: token " https://api.github.com/users/${githubUsername}`).then(function(githubResponse){
        .get(`https://api.github.com/users/${data.username}`).then(function (githubResponse) {
            const githubData = githubResponse.data
            const profilePicURL = githubData.avatar_url
            // console.log(profilePicURL);

            writeFileAsync("newreadme.md", `# ${data.title} \nnext line`).then(function () {
                console.log("Successfully wrote to readme file");
              }).catch(function (err) {
                console.log(err);
              });
              appendFileAsync("newreadme.md",`\n> ${data.description}`).then(function(){
                  console.log("added the description")
              }).catch(function (err) {
                console.log(err);
              });




        })

})

