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

inquirer.prompt([
  {
    type: "input",
    message: "What is your Github username?",
    name: "username",
  },
  {
    message: "What is your Project's Title?",
    type: "input",
    name: "title",
  },
  {
    message: "Please write a brief Description of your project",
    type: "input",
    name: "description",
  },
  {
    message: "What command should be run to install dependencies?",
    type: "input",
    name: "installation",
  },
  {
    message: "What does the user need to know about contributing to the repo?",
    type: "input",
    name: "usage",
  },

  {
    message: "Select from lisences below, if there is none select the unlicense",
    name: "lisence",
    type: "list",
    choices: ["MIT", "APCHE 2.0", "GPL 3.0", "BSD 3", "None"]
    // choices: ["MIT", "Academic Free License v3.0", "Apache license 2.0", "Artistic license 2.0", "Boost Software License 1.0", "BSD 2-clause Simplified license", "BSD 3-clause New or Revised license", "BSD 3-clause Clear license", "Creative Commons license family", "Creative Commons Zero v1.0 Universal", "Creative Commons Attribution 4.0", "Creative Commons Attribution Share Alike 4.0", "Educational Community License v2.0", "GNU Affero General Public License v3.0", "GNU General Public License family", "Microsoft Public License", "Mozilla Public License 2.0", "The Unlicense"]
  },
  {
    message: "Enter the usernames of contributers to this project",
    name: "contributer",
    type: "input",
  },
  {
    message: "What command should be run to run tests?",
    name: "tests",
    type: "input",
  }
]).then(function (data) {

  console.log(data);

  axios
    .get(`https://api.github.com/users/${data.username}`).then(function (githubResponse) {
      const githubData = githubResponse.data
      const profilePicURL = githubData.avatar_url
      // console.log(profilePicURL);

      writeFileAsync("newreadme.md", `# ${data.title} \n`).then(function () {
        console.log("Successfully wrote to readme file");
      }).catch(function (err) {
        console.log(err);
      });
      appendFileAsync("newreadme.md", `\n## description\n > ${data.description}`).then(function () {
        console.log("added the description")
      }).catch(function (err) {
        console.log(err);
      });
      appendFileAsync("newreadme.md", `\n## installation\n ${data.installation}`).then(function () {
        console.log("added the installation")
      }).catch(function (err) {
        console.log(err);
      });
      appendFileAsync("newreadme.md", `\n## usage\n ${data.usage}`).then(function () {
        console.log("added the usage")
      }).catch(function (err) {
        console.log(err);
      });
      appendFileAsync("newreadme.md", `\n## license\n ${data.license}`).then(function () {
        console.log("added the license")
      }).catch(function (err) {
        console.log(err);
      });
      appendFileAsync("newreadme.md", `\n## contributer\n ${data.contributer}`).then(function () {
        console.log("added the contributer")
      }).catch(function (err) {
        console.log(err);
      });
      appendFileAsync("newreadme.md", `\n## tests\n ${data.tests}`).then(function () {
        console.log("added the tests")
      }).catch(function (err) {
        console.log(err);
      });




    })

})

