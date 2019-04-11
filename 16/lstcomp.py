def checkMinReq(pwd):
    def checkChar(char):
        if char.isupper(): return 0
        if char.islower(): return 1
        if not char.isalpha(): return 2
    return (len({checkChar(i) for i in pwd}) == 3)

def checkSecurity(pwd):
    total = 10
    if not checkMinReq(pwd): total -= 2
    if len(pwd) < 8: total -= 3
    repeating = [1 for i in range(len(pwd)) if pwd[i:i+1] == pwd[i+1:i+2]] #1 if repeating char
    total -= len(repeating)
    return total if total >= 0 else 0

print(checkSecurity('1233aC1B'))
