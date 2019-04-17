# Team Flute - Kevin Lin, Mohammed Uddin
# SoftDev2 pd7
# K20 -- Reductio ad Absurdum
# 2019-04-18

from functools import reduce

text = open('Notre-Dame.txt','r',encoding='utf-8').read().split()
# text = "Waffles are the coolest in the world".split()

def wordFreq(word):
    return reduce((lambda x, y: x + 1 if y == word else x), text, 0)
    # return len([1 for i in text if i == word])

def wordGroupFreq(words):
    return reduce((lambda x, y: x + 1 if text[y:y+len(words)] == words else x), range(len(text)), 0)

def mostFreq():
    # O(n) Version
    freqDct = {}
    for i in text:
        freqDct[i] = freqDct[i] + 1 if i in freqDct else 1
    return reduce((lambda highest, currWord: currWord if freqDct[currWord] > freqDct[highest] else highest), text)
    # O(n^2) Version
    # return reduce((lambda highest, currWord: (currWord, wordFreq(currWord)) if wordFreq(currWord) > highest[1] else highest ), text, (None, -1))

print(wordFreq('the'))
print(wordGroupFreq(['are', 'the']))
print(mostFreq())
