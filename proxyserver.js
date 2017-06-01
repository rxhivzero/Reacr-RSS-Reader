var http = require('http'),
    url = require('url'),
    request = require("request"),
    FeedParser = require('feedparser');

function returnData(res, returnCode, json) {
    res.writeHead(returnCode, { 'Content-Type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Origin': '*' });
    res.write(JSON.stringify(json));
    res.end();
};

var server = http.createServer(function (req, res) {
    var action, urlData, user;
    urlData = url.parse(req.url, true);
    action = urlData.pathname;
    if (action === "/proxy") {
        var rssData = [],
            req = request(urlData.query.url),
            feedparser = new FeedParser();
        req.on('error', function (error) {
            returnData(res, 200, '')
        });

        req.on('response', function (res) {
            var stream = this; // `this` is `req`, which is a stream
            if (res.statusCode !== 200) {
                this.emit('error', new Error('Bad status code'));
            }
            else {
                stream.pipe(feedparser);
            }
        });

        feedparser.on('error', function (error) {
            returnData(res, 200, '')
        });

        feedparser.on('readable', function () {
            var stream = this;
            var meta = this.meta
            var item;

            while (item = stream.read()) {
                rssData.push({ title:item.title, link:item.link })
            }
        });
        feedparser.on('end', function (err) {
            returnData(res, 200, rssData)
        });
    }
});



server.listen(3001);
