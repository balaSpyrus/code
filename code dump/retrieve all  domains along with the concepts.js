
MATCH (d:Domain) match(c:Concept) match(d)<-[r:ConceptOf]-(c)  RETURN d,c



result.records.forEach(function(record) {
  let obj={
    Domain:"",
    concept:[]
  };
  let domain="";
  record._fields.forEach(function(fields){
   if(domainNameColln.includes(fields.properties.name)&& fields.labels[0]=="Domain")
   {
    domainDetailedColln.map(function(data){
      if(data.Domain===fields.properties.name)
        domain=data.Domain;
    })
    if(domain.length==0)
      obj.Domain=fields.properties.name
  }
  else
  {
    if(domain.length!=0)
    {
      domainDetailedColln.forEach(function(data){
        if(data.Domain===domain){

          data.concept.push(fields.properties.name)
        }
      })
    }
    else
      obj.concept.push(fields.properties.name)
  }
});   
  if(domain.length==0)    
    domainDetailedColln.push(obj);
});

        // Completed! 
        session.close();






        ---------------------------------------------------------------






        the router part

        [9:49]  
// Get details of all domain in the system
router.get('/', function(req, res) {
 try {
   domainCtrl.getAllDomain().then(function(domainConcept) {
     logger.debug("Successfully retrived concept(s) of domain: "+domainConcept);
     res.send(domainConcept);
     return;
   },
   function(err) {
     logger.error("Encountered error in retrived concept(s) of domain: ",
       err);
     res.send(err);
     return;
   })

 } catch (err) {
   logger.error("Caught a error in retrived concept(s) of domain ", err);
   res.status(500).send({
     error: "Something went wrong, please try later..!"
   });
   return;
 }

});

[9:49]  
------------------------------

[9:50]  
controller part

[9:50]  
let getAllDomain = function() {
 logger.debug("Received request for retriving Concept(s) of all domain: ");
 //Save to Mongo DB
 //Save to Neo4j

 let promise = new Promise(function(resolve, reject) {

   async.waterfall([function(callback) {
     domainMongoController.getAllDomainsCallback(callback);
   },
   function(domainNameColln,callback)
   {
     logger.debug(domainNameColln)
     domainNeo4jController.getAllDomainConceptCallback(domainNameColln,
       callback)
   }
   ],
   function(err, domainDetailedColln) {
     logger.debug("getting it")
     if(!err)
       resolve(domainDetailedColln)
     reject(err)
     }); //end of async.waterfall
 });
 return promise;
}

[9:50]  
------------------------------------------------

[9:51]  
mongo callback part

[9:51]  
let getAllDomain = function() {
 let promise = new Promise(function(resolve, reject) {

   DomainModel.find({},function(err, domainColln) {
     if (err) {
       reject(err);
     }

     if (domainColln.length===0) {
       reject({
         error: "NO domain object while retriving all the domains from mongo..!"
       });
     }

     let domainNameColln=[]
     domainColln.forEach(domainData=>domainNameColln.push(domainData.name))
     resolve(domainNameColln);
   });
 })

 return promise;

}

[9:51]  
------------------

[9:51]  
mongo part

[9:51]  
let getAllDomainsCallback = function(callback) {
 getAllDomain()
 .then(
   function(domainColln) {
     callback(null, domainColln);
   },
   function(err) {
     callback(err, null);
   });
}

[9:52]  
-----------------

[9:53]  
neo4j callback part

[9:53]  
let getAllDomainConceptCallback = function(domainNameColln, callback) {
 getAllDomainConcept(domainNameColln).then(function(retrievedAllDomainConcept) {
   callback(null, retrievedAllDomainConcept);
 }, function(err) {
   callback(err, null);
 });
}

[9:53]  
-----------------------------

[9:53]  
neo4j part

[9:54]  
let getAllDomainConcept = function(domainNameColln) {
 let promise = new Promise(function(resolve, reject) {

   logger.debug("Now proceeding to retrive the concepts for all domains: ");
   let driver = neo4jDriver.driver(config.NEO4J_BOLT_URL,
     neo4jDriver.auth.basic(config.NEO4J_USR, config.NEO4J_PWD),{encrypted:false}
     );

   let session = driver.session();

   logger.debug("obtained connection with neo4j");
   let data=[];
   
   domainNameColln.forEach(function(domainName){

     let query = 'MATCH (d:Domain{name:{domainName}}) match(c:Concept) match(d)<-[r:ConceptOf]-(c)  RETURN d,count(c)';

     let params = {
       domainName: domainName
     };


     session.run(query,params)
     .then(function(result) {
       result.records.forEach(function(record) {

         let obj={
           Domain:"",
           noOfConcepts:0
         }
         record._fields.forEach(function(field){
           if(field.low===undefined)
           {
             obj.Domain=field.properties.name;
           }
           else
           {
             obj.noOfConcepts=field.low
           }
         });   
         data.push(obj);
       }); 
       if(data.length===domainNameColln.length)
         resolve(data);    
     }).catch(function(err) {
       logger.error("Error in neo4j query: ", err, ' query is: ',
         query);
       reject(err);
     });

   })

  // resolve(data);
  
});

 return promise;
}