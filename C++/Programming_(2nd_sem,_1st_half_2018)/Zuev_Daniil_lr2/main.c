#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include"func.h"
#define LEN 100
int main(){
    char c[LEN];
    fgets(c, LEN, stdin);
    stack *stck = initstack();
    char* a[LEN];
    int i = 0, k;
    a[i] = strtok(c, " \n\0");
    while(a[++i] = strtok(NULL, " \n\0"));
    for(int j = 0; j < i; j++)
    {
        if(strcmp(a[j],"+") == 0)
        {
            if(count(stck)<2)
            {
                printf("error");
                return 0;
            }
            push(stck, pop(stck)+pop(stck));
            continue;
        }
        if(strcmp(a[j],"*") == 0)
        {
            if(count(stck)<2)
            {
                printf("error");
                return 0;
            }
            push(stck, pop(stck)*pop(stck));
            continue;
        }
        if(strcmp(a[j],"-") == 0)
        {
            if(count(stck)<2)
            {
                printf("error");
                return 0;
            }
            k =pop(stck);
            push(stck, pop(stck) - k);
            continue;
        }
        if(strcmp(a[j],"/") == 0)
        {
            if(count(stck)<2)
            {
                printf("error");
                return 0;
            }
            k = pop(stck);
            push(stck, pop(stck)/k);
            continue;
        }
        push(stck,atoi(a[j]));
    }
    if(count(stck) != 1)
        printf("error");
    else
        printf("%d", pop(stck));
    return 0;
}
