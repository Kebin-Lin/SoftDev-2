# Kevin Lin
# SoftDev2 pd7
# K22 -- Closure
# 2019-05-01

def repeat(word):
	return lambda n: n * word

def make_counter():
	x = 0
	def ctr(getx = False):
		nonlocal x
		if getx: return x
		x += 1
		return x
	return ctr

r1 = repeat('hello')
r2 = repeat('goodbye')
print(r1(2))
print(r2(2))
print(repeat('cool')(3))

ctr1 = make_counter()
print(ctr1())
print(ctr1())
ctr2 = make_counter()
print(ctr2())
print(ctr1())
print(ctr2())

#Accessing
print(ctr1(True), ctr2(True))
