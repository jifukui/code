#include <sys/types.h>
#include <sys/msg.h>
int main()
{
    ket_t keyid;
    keyid=ftok(".",1);
    int msqid=0;
    printf("The father id is %d\n",getpid());
    msqid=msgget(keyid,IPC_CREAT|0666);
    if(msqid<0)
    {
        printf("Error of creat msg\n");
    }
    int i=0;
    int err=0;
    int value=-1;
    for(i;i<15;i++)
    {
        err=fork();
        if(err==0)
        {
            err=msgsend(msqid,&i,sizeof i,0);
            printf("The child id is %d\n",getpid());
            if(err<0)
            {
                printf("have error");
            }
        }
        else if(err<0)
        {
            printf("Have error\n");
        }
        else
        {
            err=msgrvc(msqid,&value,10,0);
            if(err<0)
            {
                printf("get value error\n");
            }
            else
            {
                printf("Get The value success is %d\n",value);
            }
            
        }     
    }

}