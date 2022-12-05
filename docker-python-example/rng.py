from random import randint

min_num = int(input("Please enter the min number: "))
max_num = int(input("Please enter the max number: "))

if (max_num < min_num):
	print("Invalid input -- shutting down...")
else:
	rnd_num = randint(min_num, max_num)
	print(rnd_num)
