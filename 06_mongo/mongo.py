# Jeffrey Wu, Kevin Lin
# SoftDev2 Pd7
# K06 -- Yummy Mongo Py
# 2019-03-01

import pymongo

SERVER_IP = "68.183.104.137"
client = pymongo.MongoClient(SERVER_IP,27017)
db = client.restaurants

def findBorough(borough):
    return db.restaurants.find({"borough":borough})

def findZip(zip):
    return db.restaurants.find({"address.zipcode":zip})

def findZipGrade(zip,grade):
    return db.restaurants.find({"$and" : [
        {"address.zipcode":zip},
        {'grades.grade':grade}
    ]})

def findZipScore(zip,score):
    return db.restaurants.find({"$and" : [
        {"address.zipcode":zip},
        {"grades.score":{"$lt":score}}
    ]})

def findZipCuisine(zip,cuisine):
    return db.restaurants.find({"$and" : [
        {"address.zipcode":zip},
        {"cuisine":cuisine}
    ]})

# for i in findBorough("Manhattan"):
#     print(i)
# for i in findZip("10282"):
#     print(i)
# for i in findZipGrade("10282",'A'):
#     print(i)
# for i in findZipScore("10282",1):
#     print(i)
# for i in findZipCuisine("10282","Italian"):
#     print(i)
