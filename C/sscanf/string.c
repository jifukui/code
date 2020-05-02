#include <stdio.h>
int main()
{
	char data[]="192.168.20.33,255.255.255.0,192.168.20.1\r\n";
	char ip[16];
	char mask[16];
	char gate[16];
	int num=sscanf(data,"%[^,],%[^,],%15s\r\n",&ip,&mask,&gate);
	printf("the num is %d\n",num);
	printf("the ip is %s\n",ip);
	printf("the mask is %s\n",mask);
	printf("the gate is %s\n",gate);
	return 0;
}
