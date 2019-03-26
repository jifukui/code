#include<stdio.h>
int main()
{
	int i;
	int data=0;
	int value=0;
	printf("The length of char is %d\n",sizeof(char));
	printf("The length of short is %d\n",sizeof(short));
	printf("The length of int is %d\n",sizeof(int));
	printf("The length of long is %d\n",sizeof(long));
	printf("The length of long long is %d\n",sizeof(long long));
	for(i=0;i<64;i++)
	{
		if(i<32)
		{
			data=1<<i;
		}
		else
		{
			data=0;
			value=1<<(i-32);
		}
		printf("The data %02d is 0x%08x%+08x\n",i,value,data);
	}
	return 0;
}
