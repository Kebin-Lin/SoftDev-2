import random

def pythagTriples(n):
    return sorted(list({tuple(sorted([h, a, int((h**2 - a**2)**.5)]))
                                      for h in range(1,n + 1) for a in range(1,h)
                                      if int((h**2 - a**2)**.5) == ((h**2 - a**2)**.5)}))

def quicksort(lst):
    return quicksort([x for x in lst[1:] if x <= lst[0]]) + [lst[0]] + quicksort([x for x in lst[1:] if x >= lst[0]]) if len(lst) != 0 else []

print("Pythagorean triples up to 100:\n" + str(pythagTriples(100)) + '\n')
print("Quick sort of list of integers [0,100):\n" + str(quicksort([int(random.random() * 100) for x in range(10)])))
