#include <stdio.h>
#include <string.h>
#include <png.h>
#include <stdlib.h>
#include "png_func.h"

int main(int argc, char** argv)
{
	if(argc != 6)
	{
		printf("The number of entered parameters is incorrect\n");
		return 0;
	}
	char filename[FILE_NAME_LEN];
	strncpy(filename,argv[1],FILE_NAME_LEN);
	char result[256] = "result";
	strncat(result, filename, FILE_NAME_LEN);
	int x0 = atoi(argv[2]);
	int y0 = atoi(argv[3]);
	int x1 = atoi(argv[4]);
	int y1 = atoi(argv[5]);
	filename[strlen(filename)] = '\0';
	if(!filenameCheck(filename))
	{
		printf("Fail with input_file\n");
		return 0;
	}
	pngfile image;
	if(!readPNG(filename, &image))
		return 0;
	if(!coordsCheck(image, x0, y0, x1, y1))
		return 0;
	reflectionOfTheArea(&image, x0, y0, x1, y1);
	if(!writePNG(result, &image))
		return 0;
	return 0;
}
	
