#include "func.h"

int cmp(const void * el1, const void * el2)
{
	return ( *(int*)el1 - *(int*)el2 );
}
int lsort(int* b, int n)
{
	int temp, i, j;
	for(i = 0 ; i < n - 1; i++)
	{ 
		for(j = 0 ; j < n - i - 1 ; j++) 
		{  
			if(b[j] > b[j+1]) 
			{           
				temp = b[j];
				b[j] = b[j+1] ;
				b[j+1] = temp; 
			}
		}
	}  
	return 0;
}
