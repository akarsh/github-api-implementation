var express = require('express');
var router = express.Router();

const {Client} = require('github-trend');
const client = new Client({token: 'b14266c9a3e9f8a405b69c79fb583fa36cdf0794'});

/* Global variables */
var storeRepoOwner = [];
var storeRepoName = [];
var storeRepoStars = [];

/* GET home page. */
router.get('/', function (req, res, next) {
    showRepositories(req, res)
});

function showRepositories(req, res) {
    client.fetchTrending('all').then(repos => {
        for (const repo of repos) {
            // Result of https://api.github.com/repos/:user/:name
            // console.log(repo);
            storeRepoOwner.push(repo.owner.login);
            storeRepoName.push(repo.name);
            storeRepoStars.push(repo.stargazers_count);
        }
        res.render('index', {
            title: 'Today\'s GitHub Trending repositories',
            projectName: storeRepoName,
            projectOwner: storeRepoOwner,
            projectStars: storeRepoStars
    
        });
    }).catch(err => {
        console.error(err.message);
    });
}

module.exports = router;
