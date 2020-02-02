#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <dirent.h>
#include <sys/types.h>
#include "readfiles.h"

int comp(const void* a, const void* b) {                                        
    return (*(lines**)a)->num > (*(lines**)b)->num;                                                             
}

lines** readfiles(char *startDir, int* count, lines** array){
    char nextDir[DIR_LEN]={0};
    strncpy(nextDir, startDir,DIR_LEN);
    DIR *dir = opendir(startDir);
    struct dirent *de = readdir(dir);
    while(de){
        if(de->d_type == DT_DIR && strcmp(de->d_name, ".") != 0 && strcmp(de->d_name, "..") != 0 && dir){
            int len = strlen(nextDir);
            strncat(nextDir, "/", DIR_LEN);
            strncat(nextDir,de->d_name, DIR_LEN);
            array = readfiles(nextDir, count, array);
            nextDir[len] = '\0';
        }
        if(de->d_type == DT_REG ){
            int len = strlen(nextDir);
            strncat(nextDir, "/", DIR_LEN);
            strncat(nextDir,de->d_name, DIR_LEN);
            FILE* f = fopen(nextDir, "r");
            *array = (lines*)malloc(sizeof(lines));
            (*array)->line = (char*)malloc(STR_LEN*sizeof(char));
            fgets((*array)->line, STR_LEN, f);
            (*array)->num = atoi((*array)->line);
            array++;
            (*count)++;
            fclose(f);
            nextDir[len] = '\0';
        }
        de = readdir(dir);
    }
    closedir(dir);
    return array;

}
