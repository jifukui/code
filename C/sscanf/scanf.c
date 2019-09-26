#include <stdio.h>
#include <string.h>
int main()
{
	char data[20]="~01@NAME ERR 003";
	unsigned int data1;
	unsigned char status=sscanf(&data[4],"NAME ERR %d",&data1);
	printf("The data is %d the status is %d\n",status,data1);
	return 0;
}
