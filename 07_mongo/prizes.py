#Lingo -- Kevin Lin and Jason Lin
#SoftDev2 pd7
#K07 -- Import/Export Bank
#2019-03-04
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
We removed the first and last curly brace from the JSON file and used mongoimport like so
$ mongoimport --db Lingo --collection prizes --jsonArray --file prize.json
'''

from pymongo import MongoClient

#SERVER_ADDR = "142.93.57.60" # Jason's droplet
SERVER_ADDR = "68.183.104.137" # Kevin's droplet
connection = MongoClient(SERVER_ADDR)
db = connection.Lingo
collection = db.prizes

def search_year(year):
    # Gets all of the documents with the given year
    # collection is the same thing as db.prizes
    print("Prizes with year:",year)
    prizes = collection.find({"year":str(year)})
    for prize in prizes:
        print(prize,"\n")

def search_category(category):
    # Gets all of the documents with the given category
    print("Prizes with category:",category)
    category = category.lower()
    prizes = collection.find({"category":category})
    for prize in prizes:
        print(prize,"\n")

def search_category_year(category,year):
    # Gets all of the documents with the given category and year
    print("Prizes from:",year,"with category:",category)
    category = category.lower()
    prizes = collection.find({'$and': [{"category":category},{"year":str(year)}]})
    for prize in prizes:
        print(prize,"\n")

def search_category_after_year(category,year):
    # Gets all of the documents with the given category and is after the given year
    print("Prizes after",year,"with category:",category)
    category = category.lower()
    prizes = collection.find({"$and":[{"category":category},{"year":{"$gte":str(year)}}]})
    for prize in prizes:
        print(prize)

def search_num_lauretes(num):
    # Gets all of the documents where the number of lauretes is that number
    print("Prizes that had",num,"lauretes")
    prizes = collection.find()
    output = []
    for prize in prizes:
        if len(prize['laureates']) == num:
            output.append(prize)
    for prize in output:
        print(prize)


#search_year(2003)
#search_category("Physics")
#search_category_year("chemistry",1989)
#search_category_after_year("physics",1950)
#search_num_lauretes(3)
