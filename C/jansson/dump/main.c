#include <stdio.h>
#include <jansson.h>
char JsonFromFile(char *filepath,char *data)
{
	char flag=0;
	FILE *file=NULL;
	file=fopen(filepath,"r");
	if(file)
	{
		unsigned int i;
		for(i=0;i<8192;i++)
		{
			*(data+i)=fgetc(file);
			
			if(0==*(data+i))
			{
				break;
			}
		}
		flag=1;
	}
	return flag;
}
int main()
{
	char filepath[50]="./voltage_cfg.segment";
	json_t *info;
	char jsonfile[4096];
	json_error_t error;
	if(JsonFromFile(filepath,jsonfile))
	{
		info=json_loads(jsonfile,0,&error);
		if(info)
		{
			char *str;
			str=json_dumps(info,JSON_PRESERVE_ORDER);
			free(str);
			if(str!=NULL)
			{
				str=NULL;
			}
			json_decref(info);
		}
		else
		{
			printf("Get voltage data error %s\n",error);
		}
	}
	else
	{
		printf("Get file error,Please try again later.\n");
	}
	
}