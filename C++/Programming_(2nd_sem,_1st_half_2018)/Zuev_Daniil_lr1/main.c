#include "func.h"
#define N 1000

int main() 
{
	int i, j;
	int a[N], b[N];
	clock_t cl1;
	clock_t cl2;
	char c;
	for(i = 0 ; i < N; i++)
	{ 
		scanf("%d", &a[i]);
		b[i] = a[i];
	}
	cl1 = clock();
	lsort(b, N);
	cl1 = clock() - cl1;
	cl2 = clock();
	qsort(a, N, sizeof(int), cmp);
	cl2 = clock() - cl2;
	for(i = 0;i<N-1;i++)
	{
		assert(b[i]<b[i+1]);
		printf("%d ",b[i]);
	}
	printf("%d", b[N-1]);
	printf("\n%f\n%f\n", (float)cl1/CLOCKS_PER_SEC, (float)cl2/CLOCKS_PER_SEC);
	return 0;
}
