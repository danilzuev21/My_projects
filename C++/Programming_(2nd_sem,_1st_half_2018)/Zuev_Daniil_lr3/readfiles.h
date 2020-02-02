#pragma once
#define STR_LEN 100
#define ARR_SIZE 3000
#define DIR_LEN 200

typedef struct lines
{
    int num;
    char* line;
}lines;

int comp(const void* a, const void* b);

lines** readfiles(char *startDir, int* count, lines** array);
