#pragma once

typedef struct stack{
	int i[100];
	int size;
}stack;

int count(stack* mass);
stack* initstack();
int pop(stack* mass);
void push(stack* mass, int c);
