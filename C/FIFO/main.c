#include <stdio.h>
#include <string.h>
#include "lig_pip.h"
int errno;
extern int m_lig_pip_rdwr_fd;
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
    n=lig_pip_write_bytes(m_lig_pip_rdwr_fd,tbuf,strlen(tbuf));
    if(n>0)
    {
        printf("good to write\n");
        bzreo(rbuf,sizeof(rbuf));
        n=lig_pip_write_bytes(m_lig_pip_rdwr_fd,rbuf,sizeof(rbuf));
        printf("The read buf is %s\n",rbuf);
    }
    else
    {
        printf("error to write\n");
    }
    return 0;
}