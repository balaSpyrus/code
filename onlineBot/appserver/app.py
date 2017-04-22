import os
import subprocess
import shlex
import time
from flask import Flask
from flaskext.mysql import MySQL
from flask import request,jsonify,json,make_response,Response
from flask_cors import CORS, cross_origin
from werkzeug import secure_filename


# code to call shell script containing spark submit
#import subprocess
#import shlex
#subprocess.call(shlex.split('./test.sh param1 param2'))


ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'jar','gif','json','py','jar','js'])

app = Flask(__name__)
mysql = MySQL()
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
def allowed_file(filename):
    return '.' in filename and \
filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

app = Flask(__name__)
CORS(app)
conn = mysql.connect()
cursor = conn.cursor()
cursor.execute("""USE onlinebot""")
@app.route('/')
def index():
  return 'home page'

@app.route('/login', methods=['GET','POST'])
@cross_origin(origin='*')
def login():
	userName=request.json['userName']
	password=request.json['password']
	cursor.execute("""SELECT user_name,password FROM login""")
	data=cursor.fetchall()
	user = ''
	pwd = ''
	for row in data:
		user=row[0]
		pwd=row[1]
		print "username : " + user
		print "password : "+ pwd
	if user==userName and pwd==password:
		return 'Login Success'
	else:
			return 'Login Fail'
	cursor.close()

@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   algorithmName=''
   datasource=''
   path=''
   algorithmName=request.form['algorithmName']
   datasource=request.form['dataSource']
   filepath='/home/bala/jars/'
   file = request.files['file']
   if file and allowed_file(file.filename):
	    filename = secure_filename(file.filename)
	    file.save(os.path.join(filepath, filename))
	    path=filepath+filename
	    print "path" + path
	    sql="insert into file_info(algo_name,data_source,file_path) values (%s,%s,%s)"
	    cursor.execute(sql,(algorithmName,datasource,path))
	    conn.commit();
	    return 'Files upload succesfully'
   else:
        return 'please upload files which has valid extentions'

@app.route('/fileProcess',methods=['GET','POST'])
@cross_origin(origin='*')
def FileProcess():
    print request.json['Algorithm']
    return request.json['Algorithm']

@app.route('/retriveAlgorithmName',methods=['GET','POST'])
@cross_origin(origin='*')
def retriveAlgorithmName():
	cursor.execute("""SELECT algo_name FROM file_info""")
	data=cursor.fetchall()
	arr = []
	for row in data:
		arr.append(row[0])
		print arr
	return jsonify(arr)

@app.route('/process',methods=['GET','POST'])
@cross_origin(origin='*')
def process():
    subprocess.call(shlex.split('nohup /usr/local/spark-1.6.3-bin-hadoop2.6/bin/spark-submit --class com.wipro.chatbot.kafka.KafkaConsumer --master spark://carl-PC:7077 --deploy-mode client --num-executors 1 /home/am372811/gitprojects/onlinetraining/datagenerator/target/chatbot-0.1.0-SNAPSHOT-fat.jar &'))
    stringData = 'Spark App submitted for '+request.json['Algorithm']
    data={
    'progress':stringData,
    'data':{
    'Algorithm': request.json['Algorithm'],
    'Index': request.json['index']
     }
    }
    return jsonify(data)

@app.route('/analyze',methods=['GET','POST'])
@cross_origin(origin='*')
def analyze():    
    stringData="im from the train server router"    
    data={
    'progress':stringData,
    'data':{
    'Algorithm': request.json['Algorithm'],
    'Index': request.json['index']
     }   
    }
    return jsonify(data)

@app.route('/trainNpredict',methods=['GET','POST'])
@cross_origin(origin='*')
def trainnpredict():    
    stringData="im from the predict server router"    
    data={
    'progress':stringData,
    'data':{
    'Algorithm': request.json['Algorithm'],
    'Index': request.json['index']
     }   
    }
    return jsonify(data)

@app.route('/test',methods=['GET','POST'])
@cross_origin(origin='*')
def test():
    producer = KafkaProducer(bootstrap_servers='carl-PC:9092')
    query = request.json['query']
    producer.send('lrTopic2', query.encode('utf-8'))
    consumer = KafkaConsumer(bootstrap_servers='carl-PC:9092')
    consumer.subscribe(['lrTopic5'])
    stringData = ""
    for msg in consumer:
        stringData = msg
        print(msg)
        break
    data={
    'progress':stringData,
    'data':{
    'Algorithm': request.json['Algorithm'],
    'Index': request.json['index'],
    'query':request.json['query']
     }   
    }
    return jsonify(data)
    
if __name__ == '__main__':
    app.run(debug=True)
