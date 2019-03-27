#include <stdio.h>
<<<<<<< HEAD
int main
{
    int i=0;
    int flag;
    char val[6];
    char data[7][6]={
        "kmpt",
        "Kmpt",
        "kMpt",
        "kmPt",
        "kmpT",
        "KMPT",
        "kpt"
    };
    for(i=0;i<6;i++)
    {
        flag=sscanf(data[i],".%{k|K}{m|M}{p|P}{t|T}",val);
        if(flag)
        {
            printf("The flag is %d the str is %s",val);
        }
    }
    return 0;
}
=======
int main()
{
	char str[30]="12,34,9";
	char data[3];
	int status=0;
	status=sscanf(str,"%d,%d,%d",&data[0],&data[1],&data[2]);
	printf("The status is %d\n",status);
	if(status==3)
	{	
		printf("The 1 is %d\n",data[0]);
		printf("The 2 is %d\n",data[1]);
		printf("The 3 is %d\n",data[3]);
	}
	return 0;
}
>>>>>>> 3f396fdcc78a7f29872275d9a64641e193ee6ad7
