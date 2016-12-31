var request = require("request");
let fs = require('fs');
var cheerio = require("cheerio");

function getSearchResults(domain, concepts, noOfPages) {
    let searchQuery = domain + '+' + concepts; //@todo encoding
    let jsonSearchData = { 'domain': domain, 'concepts': concepts, 'result': [] };

    //encode the searchQuery

    for (i = 0; i < noOfPages; i++) {

        setTimeout(()=> {
            request({
                uri: "https://www.google.co.in/search?q=" + searchQuery + "&start=" + i,
            }, function(error, response, body) {
                if(error) {
                    console.log("Error in requesting google: ", error);
                    return;
                }

                console.log("Got data: ", body);

                var $ = cheerio.load(body);
                $("div.g > h3.r a").each(function() {
                    var link = $(this);
                    var href = link.attr("href");
                    jsonSearchData.result.push(href);

                    fs.writeFile('data.txt', JSON.stringify(jsonSearchData), function(err) {
                        if (err) {
                            return console.error(err);
                        }
                    });
                });
            });
        }, 5000);        
    }

    // fs.writeFile('data.json', JSON.stringify(jsonSearchData), function(err) {
    //     if (err) {
    //         return console.error(err);
    //     }
    // });

}

try {
    let domain = 'java',
    concepts = 'concepts',
    noOfPages = 1;

    getSearchResults(domain, concepts, noOfPages);
} catch(err) {
    console.log('Encountered a error: ', err);
}