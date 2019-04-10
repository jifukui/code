#include <stdio.h>
#include <string.h>
int main()
{
    int i=0;
    int flag;
    char val[6];
    char data[7][6]={
        ".kmpt",
        ".Kmpt",
        ".kMpt",
        "kmPt",
        "kmpT",
        "KMPT",
        "kpt"
    };
    for(i=0;i<7;i++)
    {
	printf("The buf is %s\n",data[i]);
        flag=strcasecmp(data[i],".kmpt");
        if(!flag)
        {
            printf("match\n");
       	}
    }
    char ji[10];
    char str[]="10,1,1 ok";
    flag=sscanf(str,"%d,%d,%d %[OK]",&val[0],&val[1],&val[2],ji);
    printf("The flag is %d\n",flag);
    return 0;
}
