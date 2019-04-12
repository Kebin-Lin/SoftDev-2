# Kevin Lin
# SoftDev2 pd7
# K16 -- Do You Even List?
# 2019-04-12

def checkMinReq(pwd):
    def checkChar(char):
        specChars = {'.', '?', '!', '&', '#', ',', ';', ':', '-', '_', '*'}
        if char.isupper(): return 0
        if char.islower(): return 1
        if char.isdigit(): return 2
        if char in specChars: return 3
    return (len({checkChar(i) for i in pwd}) == 4)

def checkSecurity(pwd):
    total = 10
    if not checkMinReq(pwd): total -= 2
    if len(pwd) < 8: total -= 3
    repeating = [1 for i in range(len(pwd)) if pwd[i:i+1] == pwd[i+1:i+2]] #1 if repeating char
    total -= len(repeating)
    return total if total >= 0 else 0

print(checkSecurity('1233aC1B!'))
