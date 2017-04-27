from flask import Blueprint
from flask import Flask
from flaskext.mysql import MySQL
from flask import request,jsonify,json
from flask_cors import CORS, cross_origin

app = Flask(__name__)

logicset = Blueprint('logicset', __name__)
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
conn = mysql.connect()
cursor = conn.cursor()
cursor.execute("""USE onlinebot""")

@logicset.route('/retrieveLogicSets',methods=['GET'])
@cross_origin(origin='*')
def retrieveLogicSets():
    query="select * from logicset"
    cursor.execute(query)
    conn.commit();
    data=cursor.fetchall()
    arr = []
    for row in data:
        arr.append(row)
    return jsonify(arr)
    

@logicset.route('/saveLogicSet',methods=['GET','POST'])
@cross_origin(origin='*')
def saveLogicSet():      
    msg_name=request.json['msgName'],
    trainTopic=request.json['trainTopic'] 
    predictTopicInput=request.json['predictTopicInput'] 
    predictTopicOutput=request.json['predictTopicOutput'] 
    regularisation=request.json['regularisation'] 
    learningRate=request.json['learningRate'] 
    modelSaveInternet=request.json['modelSaveInternet'] 
    algorithm=request.json['algoName'] 
    continousVariable=request.json['continousVariable'] 
    categoryVariable=request.json['categoryVariable'] 
    predictionVariable=request.json['predictionVariable']    
    query="create table if not exists logicset( "
    query+="logicset_id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY,"
    query+="msg_name VARCHAR(40) NOT NULL ,trainTopic VARCHAR(40) NOT NULL,"
    query+="predictTopicInput VARCHAR(40) NOT NULL,predictTopicOutput VARCHAR(40) NOT NULL,"
    query+="regularisation DOUBLE(5,4) NOT NULL,learningRate DOUBLE(5,4) NOT NULL,"
    query+="modelSaveInternet INTEGER(5) NOT NULL,algorithm VARCHAR(40) NOT NULL,"
    query+="continousVariable VARCHAR(400) NOT NULL,categoryVariable VARCHAR(400) NOT NULL,"
    query+="predictionVariable VARCHAR(400) NOT NULL) "
    cursor.execute(query)
    conn.commit();
    query="insert into logicset(logicset_id,msg_name,trainTopic,predictTopicInput,"
    query+="predictTopicOutput,regularisation,learningRate,modelSaveInternet,algorithm,"
    query+="continousVariable,categoryVariable,predictionVariable) values (NULL,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
    args=(msg_name,trainTopic,predictTopicInput,predictTopicOutput,regularisation,learningRate,modelSaveInternet,algorithm,continousVariable,categoryVariable,predictionVariable)
    cursor.execute(query,args)
    conn.commit();
    cursor.execute("select * from logicset where logicset_id= (select max(logicset_id) from logicset)")
    data=cursor.fetchall()
    arr = []
    for row in data:
        arr.append(row)
    return jsonify(arr[0])

@logicset.route('/updateLogicSet',methods=['GET','POST'])
@cross_origin(origin='*')
def updateLogicSet():      
    msg_name=request.json['msgName'],
    trainTopic=request.json['trainTopic'] 
    predictTopicInput=request.json['predictTopicInput'] 
    predictTopicOutput=request.json['predictTopicOutput'] 
    regularisation=request.json['regularisation'] 
    learningRate=request.json['learningRate'] 
    modelSaveInternet=request.json['modelSaveInternet'] 
    algorithm=request.json['algoName'] 
    continousVariable=request.json['continousVariable'] 
    categoryVariable=request.json['categoryVariable'] 
    predictionVariable=request.json['predictionVariable']  
    logicset_id=request.json['logicSetID'],  
    query="update logicset set msg_name = %s,trainTopic = %s,"
    query+="predictTopicInput = %s,predictTopicOutput = %s,regularisation = %s,"
    query+="learningRate = %s,modelSaveInternet = %s,algorithm = %s,continousVariable = %s,"
    query+="categoryVariable = %s,predictionVariable = %s where logicset_id = %s"
    args=(msg_name,trainTopic,predictTopicInput,predictTopicOutput,regularisation,learningRate,modelSaveInternet,algorithm,continousVariable,categoryVariable,predictionVariable,logicset_id)
    cursor.execute(query,args)
    conn.commit();
    cursor.execute("select * from logicset where logicset_id = %s",logicset_id)
    data=cursor.fetchall()
    arr = []
    for row in data:
        arr.append(row)
    return jsonify(arr)  

@logicset.route('/deleteLogicSet',methods=['GET','POST'])
@cross_origin(origin='*')
def deleteLogicSet():
     id=request.json['logicSetID']
     query="delete from logicset where logicset_id = %s"
     cursor.execute(query,(id))
     conn.commit();
     return 'logicset deleted successfully'
