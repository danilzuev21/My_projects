#include<stdlib.h>
#include"func.h"

int count(stack* mass)
{
    return mass->size;
}

stack* initstack()
{
    stack* mass = (stack*)malloc(sizeof(stack));
    mass->size =0;
	return mass;
}

int pop(stack* mass)
{
    mass->size--;
    return mass->i[mass->size];
}

void push(stack* mass, int c)
{
	mass->i[mass->size] = c;
    mass->size++;
}
