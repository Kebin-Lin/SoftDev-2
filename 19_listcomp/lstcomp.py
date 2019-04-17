#Team BoLin Green - Kevin Lin & Bo Lu
#Softdev pd7

#Union of two sets
def union(inputlst, otherinput):
    return [x for currlst in [inputlst, otherinput] for x in currlst if currlst == inputlst or x not in inputlst]
print(union([1,3,4], [2,3,8]))
print(union([1,3,4,5,6,7,8], [1,3,4,5,100,99]))

print("-------------------------------------------------------------------")

#Intersection of two sets
def intersection(inputlst, otherinput):
    return [x for x in inputlst if x in otherinput]

print(intersection([1,2,3],[2,3,4]))
print(intersection([10,22,37],[22,30,40]))
print(intersection([1,2,34324],[2124,343234,4231]))

print("-------------------------------------------------------------------")

#set of all members of U that are not members of A
def setDiff(U, A):
    return [x for x in U if x not in A]

print(setDiff([1,2,3],[2,3,4]))
print(setDiff([2,3,4],[1,2,3]))
print(setDiff([2,3,4],[1,0,10]))
print(setDiff([2,3,4],[4,2,3]))

print("-------------------------------------------------------------------")

#set of all objects that are a member of exactly one of A and B -- ones that are in either but not both
def symmDiff(A,B):
    return [x for curr in [A,B] for x in curr if not (x in A and x in B)]
print(symmDiff([1,2,3],[2,3,4]))
print(symmDiff([1,2,3],[1,3,2]))
print(symmDiff([1,2,3],[4,6,7]))


print("-------------------------------------------------------------------")

#all possible ordered pairs(a,b) where a is a member of A and b is a member of B
def cartesian(A,B):
    return [(x,y) for x in A for y in B]

print(cartesian([1,2], ['red','white']))
print(cartesian([1,2,3,7], ['red','white','america']))
print(cartesian([1,2,3,7,'russia'], ['red','america']))
