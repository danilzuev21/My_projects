#pragma once

#include <png.h>
#define FILE_NAME_LEN 250
#define ERROR 0

typedef struct Png{
    int width, height;
    png_byte color_type;
    png_byte bit_depth;

    png_structp png_ptr;
    png_infop info_ptr;
    int number_of_passes;
    png_bytep *row_pointers;
}pngfile;


int readPNG(char* filename, pngfile* image);

int writePNG(char* filename, pngfile* image);

void reflectionOfTheArea(pngfile* image, int x0, int y0, int x1, int y1);

int filenameCheck(char* filename);

int coordsCheck(pngfile image, int x0, int y0, int x1, int y1);
