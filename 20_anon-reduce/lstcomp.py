# Team Flute - Kevin Lin, Mohammed Uddin
# SoftDev2 pd7
# K20 -- Reductio ad Absurdum
# 2019-04-18

from functools import reduce
from string import punctuation

text = open('Notre-Dame.txt','r',encoding='utf-8').read().split()
# text = "Waffles are the coolest in the world".split()

text = [x.lower().strip(punctuation) for x in text] #Strips text of punctuation and makes everything lower case
print('Length of text:', len(text))

def wordFreq(word):
    word = word.lower()
    return reduce((lambda x, y: x + 1 if y == word else x), text, 0)
    # return len([1 for i in text if i == word])

def wordGroupFreq(words):
    words = [x.lower() for x in words]
    return reduce((lambda x, y: x + 1 if text[y:y+len(words)] == words else x), range(len(text)), 0)

def mostFreq():
    # O(n) Version
    freqDct = {}
    for i in text: #Create a dictionary of words as keys and frequency as values
        freqDct[i] = freqDct[i] + 1 if i in freqDct else 1
    return reduce((lambda highest, currWord: currWord if freqDct[currWord] > freqDct[highest] else highest), freqDct.keys())
    # O(n^2) Version
    # return reduce((lambda highest, currWord: (currWord, wordFreq(currWord)) if wordFreq(currWord) > highest[1] else highest ), text, (None, -1))

print(wordFreq('the'))
print(wordGroupFreq(['are', 'the']))
print(mostFreq())
