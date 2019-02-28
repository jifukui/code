#include <stdio.h>
#include <string.h>
#include "lig_pip.h"
int errno;
int main()
{
    int status=0;
    int n;
    char rbuf[50];
    char tbuf[]="#model? \r\n";
    status=lig_pip_open(0);
    if(status<0)
    {
        printf("open client error\n");
        return 0;
    }
	printf("The fd is %d\n",status);
    n=lig_pip_write_bytes(status,tbuf,strlen(tbuf));
	printf("The wirite buf is %d\n",n);
    if(n>0)
    {
        printf("good to write\n");
        bzero(rbuf,sizeof(rbuf));
		do{
        	n=lig_pip_read_bytes(status,rbuf,sizeof(rbuf));
		}while(n<1);
        printf("The read buf is %s,the num is %d\n",rbuf,n);
    }
    else
    {
        printf("error to write\n");
    }
    return 0;
}
