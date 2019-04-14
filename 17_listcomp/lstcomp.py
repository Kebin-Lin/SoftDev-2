# Team Flute - Kevin Lin, Mohammed Uddin
# SoftDev2 pd7
# K17 -- PPFTLCW
# 2019-04-15

def prob1loop(n):
    out = []
    for i in range(0, 2 * n, 2):
        out.append(str(i) * 2)
    return out

def prob1comp(n):
    return [str(i) * 2 for i in range(0, 2 * n, 2)]

def prob2loop(n):
    out = []
    for i in range(n):
        out.append(7 + i * 10)
    return out

def prob2comp(n):
    return [7 + i * 10 for i in range(n)]

def prob3loop(n):
    out = []
    for i in range(n):
        for j in range(3):
            out.append(i * j)
    return out

def prob3comp(n):
    return [i * j for i in range(n) for j in range(3)]

def prob4loop():
    composites = set()
    primes = []
    for i in range(2,101):
        if i in composites: #Check if number is already declared as a composite
            continue
        curr = 2 * i
        while curr < 101: #Eliminates all multiples of the prime from the sieve
            composites.add(curr)
            curr += i
    return sorted(list(composites))

def prob4comp():
    return [x for x in range(4,101) if len([1 for i in range(2, x) if x % i == 0]) != 0]

def prob5loop():
    composites = set()
    primes = [2]
    for i in range(3,101,2):
        if i in composites: #Check if number is already declared as a composite
            continue
        primes.append(i)
        curr = 2 * i
        while curr < 101: #Eliminates all multiples of the prime from the sieve
            composites.add(curr)
            curr += i
    return primes

def prob5comp():
    return [2] + [x for x in range(3,101,2) if len([1 for i in range(3, x, 2) if x % i == 0]) == 0]

def prob6loop(n):
    end = int(n ** .5 // 1) #Endpoint is sqrt(n)
    div = set()
    for i in range(1, end + 1):
        if n % i == 0: #Add divisor and quotient if divisible
            div.add(i)
            div.add(int(n / i))
    div = list(div)
    div.sort()
    return div

def prob6comp(n):
    return sorted(list({f(x) for x in range(1, int(n ** .5 // 1) + 1) #All numbers from 1 to sqrt(n)
            for f in (lambda x: x if n % x == 0 else None, #Run both functions on n
                      lambda x: int(n / x) if n % x == 0 else None)
            if f(x) != None})) #Do not add x to the list if functions return None

def prob7loop(matrix):
    out = []
    for i in range(len(matrix[0])):
        out.append([]) #Empty lists to be filled
        for j in range(len(matrix)):
            out[i].append(matrix[j][i])
    return out

def prob7comp(matrix):
    return [[matrix[j][i] for j in range(len(matrix))] #Create list of a column of a matrix
            for i in range(len(matrix[0]))] #For every row in the matrix

def matrixToString(matrix):
    out = []
    for i in matrix:
        for j in i:
            out.append(str(j))
            out.append('\t')
        out.append('\n')
    return ''.join(out)

matrix = [[1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 14, 15, 16],
          [17, 18, 19, 20]]

print('Problem 1 Loop Result with n = 5:\n' + str(prob1loop(5)), '\n')
print('Problem 1 Comp Result with n = 5:\n' + str(prob1comp(5)), '\n')
print('Problem 2 Loop Result with n = 5:\n' + str(prob2loop(5)), '\n')
print('Problem 2 Comp Result with n = 5:\n' + str(prob2comp(5)), '\n')
print('Problem 3 Loop Result with n = 3:\n' + str(prob3loop(3)), '\n')
print('Problem 3 Comp Result with n = 3:\n' + str(prob3comp(3)), '\n')
print('Problem 4 Loop Result:\n' + str(prob4loop()), '\n')
print('Problem 4 Comp Result:\n' + str(prob4comp()), '\n')
print('Problem 5 Loop Result:\n' + str(prob5loop()), '\n')
print('Problem 5 Comp Result:\n' + str(prob5comp()), '\n')
print('Problem 6 Loop Result with n = 36:\n' + str(prob6loop(36)), '\n')
print('Problem 6 Comp Result with n = 36:\n' + str(prob6comp(36)), '\n')
print('Original Matrix:\n' + matrixToString(matrix))
print('Problem 7 Loop Result:\n' + matrixToString(prob7loop(matrix)))
print('Problem 7 Comp Result:\n' + matrixToString(prob7comp(matrix)))
