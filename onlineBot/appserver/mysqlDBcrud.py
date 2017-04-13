from flask import Flask
from flaskext.mysql import MySQL
mysql = MySQL()
app = Flask(__name__)
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'root'
app.config['MYSQL_DATABASE_DB'] = 'MYSQLCRUD'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
mysql.init_app(app)
sql= mysql.connect()
cursor1=sql.cursor()
cursor1.execute("""USE MYSQLCRUD""")

@app.route("/")
def createTable():
    cursor1.execute("""CREATE TABLE IF NOT EXISTS User(email varchar(320),password varchar(10))""")
    sql.commit()
    return "table created"

@app.route("/insert")    
def insertTable():    
    cursor1.execute("""INSERT INTO User(email,password) values('bot@gmail.com','admin1')""")
    sql.commit()
    return "inserted successfully"

@app.route("/execute") 
def executeTable():
    cursor1.execute("""SELECT * from User""")
    sql.commit()
    return "executed successfully"

if __name__ == "__main__":
    app.run(debug="true")
   

