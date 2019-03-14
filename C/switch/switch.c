#include <stdio.h>
typedef unsigned char uint8;
static LigPortNum=16;
uint8 Port2Phy(uint8 port)
{
	uint8 falg=0;
	uint8 Port=LigPortNum/2;
	switch (port)
	{
		case 1 ... Port:
			flag=port;
			break;
		case Port+1 ... 2*Port :
			flag=port-Port;
			break;
		case 2*Port+1 ... 3*Port :
			flag=flag=port-Port;
			break;
		case 3*Port+1 ... 4*Port :
			flag=port-2*Port;
			break;
		case 4*Port+1 ... 4*Port +2:
			flag=LigPortNum+1;
			break;
		default:
			break;
	}
	return flag;
}
int main()
{
	int data=Port2Phy(17);
	printf("The data is %d\n",data);
	return 0;
}
