'''
Nobel Prize Database
Each document looks similar to this:
{
"year": <STRING>,
"category": <STRING>,
"laureates": [
             {
             "id": <STRING>,
             "firstname": <STRING>,
             "surname": <STRING>,
             "motivation": <STRING>,
             "share": <STRING>,
             },
             ...
             ]
}
Link to raw dataset: http://api.nobelprize.org/v1/prize.json
Import mechanism:
We inserted every element in the prizes list into the prizes collection by
loading the JSON file and running the insert_many function with the prizes list
as an argument.
'''

from pymongo import MongoClient
import json

#SERVER_ADDR = "142.93.57.60" # Jason's droplet
SERVER_ADDR = "68.183.104.137" # Kevin's droplet
connection = MongoClient(SERVER_ADDR)
db = connection.DeerElonMusk
collection = db.prizes
prizeDct = None

with open("data/prize.json") as dct:
    collection.drop()
    prizeDct = json.load(dct)

def changeAddr(newaddr):
    global SERVER_ADDR, collection, db, connection
    collection.drop() #Drop current collection
    SERVER_ADDR = newaddr #Set new address
    print(SERVER_ADDR)
    try:
        connection = MongoClient(SERVER_ADDR) #Connect to new address
        db = connection.DeerElonMusk
        collection = db.prizes
        importJson() #Rebuild database
    except:
        print("Connection failed, reconnecting to default")
        SERVER_ADDR = "68.183.104.137" # Kevin's droplet
        connection = MongoClient(SERVER_ADDR)
        db = connection.DeerElonMusk
        collection = db.prizes
        importJson() #Rebuild database

def importJson():
    collection.insert_many(prizeDct["prizes"])

def search_year(year):
    # Gets all of the documents with the given year
    # collection is the same thing as db.prizes
    print("Prizes with year:",year)
    prizes = collection.find({"year":str(year)})
    output = []
    for prize in prizes:
        print(prize,"\n")
        output.append(prize)
    return output

def search_category(category):
    # Gets all of the documents with the given category
    print("Prizes with category:",category)
    category = category.lower()
    prizes = collection.find({"category":category})
    output = []
    for prize in prizes:
        print(prize,"\n")
        output.append(prize)
    return output

def search_category_year(category,year):
    # Gets all of the documents with the given category and year
    print("Prizes from:",year,"with category:",category)
    category = category.lower()
    prizes = collection.find({'$and': [{"category":category},{"year":str(year)}]})
    output = []
    for prize in prizes:
        print(prize,"\n")
        output.append(prize)
    return output

def search_category_after_year(category,year):
    # Gets all of the documents with the given category and is after the given year
    print("Prizes after",year,"with category:",category)
    category = category.lower()
    prizes = collection.find({"$and":[{"category":category},{"year":{"$gte":str(year)}}]})
    output = []
    for prize in prizes:
        print(prize,"\n")
        output.append(prize)
    return output

def search_num_lauretes(num):
    # Gets all of the documents where the number of lauretes is that number
    print("Prizes that had",num,"lauretes")
    prizes = collection.find()
    output = []
    for prize in prizes:
        if len(prize['laureates']) == num:
            output.append(prize)
    output = []
    for prize in prizes:
        print(prize,"\n")
        output.append(prize)
    return output

importJson()
#search_year(2003)
#search_category("Physics")
#search_category_year("chemistry",1989)
#search_category_after_year("physics",1950)
#search_num_lauretes(3)
