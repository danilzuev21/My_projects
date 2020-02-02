OBJ = png_func.o main.o

all: $(OBJ)
	gcc $(OBJ) -lpng -o main
%.o: %.c png_func.h
	gcc -c $<
clear: 
	rm *.o main


