#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <dirent.h>
#include <sys/types.h>
#include "readfiles.h"

int main(){
    int count = 0;
    lines** array = (lines**)malloc(ARR_SIZE*sizeof(lines*));
    readfiles("./root", &count, array);
    qsort(array, count, sizeof(lines*), comp);
    FILE* f = fopen("result.txt", "w");
    for(int i = 0; i<count; i++)
    {
        fprintf(f, "%s",(array[i]->line));
	free(array[i]->line);
	free(array[i]);
    }
    fclose(f);
    free(array);
    return 0;
}
