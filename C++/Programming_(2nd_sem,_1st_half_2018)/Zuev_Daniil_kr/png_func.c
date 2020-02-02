#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <png.h>
#include <regex.h>

#include "png_func.h"

int readPNG(char* filename, pngfile* image)
{
	int x,y;
	char header[8];
	FILE* f = fopen(filename, "rb");
	if(!f)
	{
		printf("File could not be opened\n");
		return ERROR;
	}
	fread(header, 1, 8, f);
	if(png_sig_cmp(header, 0, 8))
	{
        	printf("File is not recognized as a PNG\n");
		fclose(f);
		return ERROR;
	}
	image->png_ptr = png_create_read_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL);

    	if(!image->png_ptr)
	{
		printf("Allocation and initializion of a png_struct structure for reading PNG file is failed\n");
		fclose(f);
		return ERROR;
    	}

	image->info_ptr = png_create_info_struct(image->png_ptr);
	if(!image->info_ptr)
	{
		printf("Allocation and initializion of a png_info structure is failed\n");
		fclose(f);
		return ERROR;
    	}

	if(setjmp(png_jmpbuf(image->png_ptr)))
	{
		printf("Initializion of input/output for the PNG file is failed\n");
		fclose(f);
		return ERROR;
	}

    	png_init_io(image->png_ptr, f);

    	png_set_sig_bytes(image->png_ptr, 8);

    	png_read_info(image->png_ptr, image->info_ptr);

    	image->width = png_get_image_width(image->png_ptr, image->info_ptr);
    	image->height = png_get_image_height(image->png_ptr, image->info_ptr);
	image->color_type = png_get_color_type(image->png_ptr, image->info_ptr);
	image->bit_depth = png_get_bit_depth(image->png_ptr, image->info_ptr);

    	image->number_of_passes = png_set_interlace_handling(image->png_ptr);
    	png_read_update_info(image->png_ptr, image->info_ptr);


    	if(setjmp(png_jmpbuf(image->png_ptr)))
	{
        	printf("Reading of file is failed\n");
		fclose(f);
		return ERROR;		
    	}

    	image->row_pointers = (png_bytep *) malloc(sizeof(png_bytep) * image->height);
    	for (y = 0; y < image->height; y++)
        	image->row_pointers[y] = (png_byte *) malloc(png_get_rowbytes(image->png_ptr, image->info_ptr));

    	png_read_image(image->png_ptr, image->row_pointers);

    	fclose(f);
	return 1;
}


int writePNG(char* filename, pngfile* image)
{
	int x,y;

    	FILE *f = fopen(filename, "wb");
    	if (!f)
	{
		printf("File could not be opened\n");
		return ERROR;
    	}


    	image->png_ptr = png_create_write_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL);

    	if (!image->png_ptr)
	{
		printf("Allocation and initializion of a png_struct structure for writing PNG file is failed\n");
		fclose(f);
		return ERROR;
    	}

    	image->info_ptr = png_create_info_struct(image->png_ptr);
    	if (!image->info_ptr)
	{
		printf("Allocation and initializion of a png_info structure is failed\n");
		fclose(f);
		return ERROR;
    	}

    	if (setjmp(png_jmpbuf(image->png_ptr)))
	{
		printf("Initializion of input/output for the PNG file is failed\n");
		fclose(f);
		return ERROR;
    	}

    	png_init_io(image->png_ptr, f);



    	if (setjmp(png_jmpbuf(image->png_ptr)))
	{
		printf("Error during writing header\n");
		fclose(f);
		return ERROR;
    	}

    	png_set_IHDR(image->png_ptr, image->info_ptr, image->width, image->height, image->bit_depth, image->color_type, PNG_INTERLACE_NONE, PNG_COMPRESSION_TYPE_BASE, PNG_FILTER_TYPE_BASE);

    	png_write_info(image->png_ptr, image->info_ptr);



    	if (setjmp(png_jmpbuf(image->png_ptr)))
	{
		printf("Writing of image data is faled\n");
		fclose(f);
		return ERROR;
    	}

    	png_write_image(image->png_ptr, image->row_pointers);


    	if (setjmp(png_jmpbuf(image->png_ptr)))
	{
        	printf("Writing the end of a PNG file is failed\n");
		fclose(f);
		return ERROR;
    	}

    	png_write_end(image->png_ptr, NULL);

    	for (y = 0; y < image->height; y++)
        	free(image->row_pointers[y]);
    	free(image->row_pointers);

    	fclose(f);
	return 1;
}

void reflectionOfTheArea(pngfile* image, int x0, int y0, int x1, int y1)
{
	int x,y;
	int ptr0[image->width][image->height];
	int ptr1[image->width][image->height];
	int ptr2[image->width][image->height];
	int ptr3[image->width][image->height];
    	for (y = y0; y <= y1; y++) 
	{
        	png_byte *row = image->row_pointers[y];
        	for (x = x0; x <= x1; x++) 
		{
            		png_byte *ptr = &(row[x * 4]);
            		ptr0[x][y] = ptr[0];
            		ptr1[x][y] = ptr[1];
            		ptr2[x][y] = ptr[2];
            		ptr3[x][y] = ptr[3];
        	}
    	}
	for (y = y0; y <= y1; y++) 
	{
        	png_byte *row = image->row_pointers[y];
        	for (x = x0; x <= x1; x++) 
		{
            		png_byte *ptr = &(row[x * 4]);
            		ptr[0] = ptr0[x][y1 + y0 -y];
            		ptr[1] = ptr1[x][y1 + y0 -y];
            		ptr[2] = ptr2[x][y1 + y0 -y];
            		ptr[3] = ptr3[x][y1 + y0 -y];
        	}
    	}
}

int filenameCheck(char* filename)
{	
	char* regexString = ".png$";
	regex_t regexComp;
	regcomp(&regexComp, regexString, REG_EXTENDED);
	return regexec(&regexComp, filename, 0, NULL, 0) == 0;
}

int coordsCheck(pngfile image, int x0, int y0, int x1, int y1)
{
	if(x0 < 0)
	{
		printf("Fail with x0\n");
		return ERROR;
	}
	if(y0 < 0)
	{
		printf("Fail with y0\n");
		return ERROR;
	}
	if(x1 > image.width)
	{
		printf("Fail with x1\n");
		return ERROR;
	}
	if(y1 > image.height)
	{
		printf("Fail with y1\n");
		return ERROR;
	}
	if(x0 > x1)
	{
		printf("Fail with x0 and x1\n");
		return ERROR;
	}
	if(y0 > y1)
	{
		printf("Fail with y0 and y1\n");
		return ERROR;
	}
	return 1;
}














