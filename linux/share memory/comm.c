#include "comm.h"
static int CommShm(int size,int flags)
{
    key_t key=ftok(PATHNAME,PROJ_ID);
    if(key<0)
    {
        perror("ftok error\n");
        return -1;
    }
    int shmid=0;
    if((shmid=shmget(key,size,flags))<0)
    {
        perror("shmget error\n");
        return -2;
    }
    return shmid;
}