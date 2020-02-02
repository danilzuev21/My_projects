OBJ = readfiles.o main.o

all: $(OBJ)
	gcc $(OBJ) -o main
%.o: %.c func.h
	gcc -c $<
clear: 
	rm *.o main

