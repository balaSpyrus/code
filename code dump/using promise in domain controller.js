let getDomain = function(domainName) {
  logger.debug("Received request for retriving Concept(s) in domain: ", domainName);
  //Save to Mongo DB
  //Save to Neo4j

  let promise = new Promise(function(resolve, reject) {

    if (!domainName ||
      domainName.length <= DOMAIN_NAME_MIN_LENGTH) {
      reject({
        error: "Invalid domain name..!"
      });
  }

  domainMongoController.checkDomain(domainName)
  .then(
    function(checkedDomain) {
      logger.debug("Successfully verified domain in Mongo of name",
        checkedDomain);
      domainNeo4jController.getDomainConcept(checkedDomain.name)
      .then(
        function(retrivedDomainConcepts) {
          logger.debug("Successfully retrived concept(s) from  domain ",
            retrivedDomainConcepts);

                // Manually push this execution to background
                process.nextTick(function() {
                  logger.debug("retrivedDomainConcepts ",
                    retrivedDomainConcepts);

                }); //end of nextTick

                resolve(retrivedDomainConcepts);
              },
              function(err) {
                logger.error("Encountered error in retriving concept(s) in domain: ",
                  err);
                reject(err);
              }
              );
    },
    function(err) {
      logger.error(
        "Encountered error in checking the domain in mongo..!"
        );
      reject(err);
    })
});
  return promise;
}