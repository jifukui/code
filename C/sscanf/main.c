#include <stdio.h>
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
