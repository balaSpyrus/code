from flask import Blueprint
from flask import Flask
from flaskext.mysql import MySQL
from flask import request,jsonify,json
from flask_cors import CORS, cross_origin

app = Flask(__name__)

msg = Blueprint('msg', __name__)
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
conn = mysql.connect()
cursor = conn.cursor()
cursor.execute("""USE onlinebot""")

@msg.route('/retrieveMsgSchemas',methods=['GET'])
@cross_origin(origin='*')
def retrieveMsgSchemas():
    query="select * from msg_table"
    cursor.execute(query)
    conn.commit();
    data=cursor.fetchall()
    arr = []
    for row in data:
        arr.append(row)
    return jsonify(arr)

@msg.route('/saveMsgSchema',methods=['GET','POST'])
@cross_origin(origin='*')
def saveMsgSchema():      
    name=request.json['msgName'],
    structure=request.json['msgStructure']    
    query="create table if not exists msg_table( msg_id INT NOT NULL AUTO_INCREMENT  PRIMARY KEY,msg_name VARCHAR(40) NOT NULL UNIQUE,msg_structure VARCHAR(400) NOT NULL)"
    cursor.execute(query)
    conn.commit();
    query="insert into msg_table(msg_id,msg_name,msg_structure) values (NULL,%s,%s)"
    args=(name,structure)
    cursor.execute(query,args)
    conn.commit();
    cursor.execute("select * from msg_table where msg_id = (select max(msg_id) from msg_table)")
    data=cursor.fetchall()
    arr = []
    for row in data:
        arr.append(row)
    return jsonify(arr[0])

@msg.route('/updateMsgSchema',methods=['GET','POST'])
@cross_origin(origin='*')
def updateMsgSchema():      
    structure=request.json['msgStructure']
    msg_id=request.json['msgID'],  
    query="update msg_table set msg_structure = %s  where msg_id = %s"
    args=(structure,msg_id)
    cursor.execute(query,args)
    conn.commit();
    cursor.execute("select * from msg_table where msg_id = %s",msg_id)
    data=cursor.fetchall()
    arr = []
    for row in data:
        arr.append(row)
    return jsonify(arr)  

@msg.route('/deleteMsgSchema',methods=['GET','POST'])
@cross_origin(origin='*')
def deleteMsgSchema():
     id=request.json['msgID']
     query="delete from msg_table where msg_id = %s"
     cursor.execute(query,(id))
     conn.commit();
     return 'message deleted successfully'

