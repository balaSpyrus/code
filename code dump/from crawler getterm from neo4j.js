    let query = 'MATCH(d:Domain)<-[]-(i:Intent)<-[]-(t:Term) where d.name={name} return t';
    let params = {
      name: data.domain
    };

    let send = callback => session.run(query, params)
    .then(function(result) {
      console.log(result);
      result.records.forEach(function(record) {
        logger.debug("Result from neo4j: ", record);

        intrestedTermsArr.push(record._fields[0].properties.name)
        logger.debug("the terms are" + record._fields[0].properties.name )
      });
      logger.debug("intrestedTerms "+intrestedTermsArr);
      data.intrestedTerms = intrestedTermsArr;

        // Completed! 
        session.close();
        //resolve(data);
        callback(null,data);
      })
    .catch(function(err) {
      logger.error("Error in neo4j query: ", err, ' query is: ',
        query);
      //reject(err);
      callback(err,data);
    });
    
    send(res)
    {
      console.log(res)
    }
