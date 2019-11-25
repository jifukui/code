#include <sys/types.h>
#include <sys/msg.h>
#include <sys/ipc.h>
#include <stdio.h>
#define NUM 5
int main()
{
    key_t keyid;
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
	int num=0;
    for(i;i<NUM;i++)
    {
        err=fork();
        if(err==0)
        {
            err=msgsnd(msqid,&i,sizeof i,0);
            printf("The child id is %d send value is %d\n",getpid(),i);
            if(err<0)
            {
                printf("have error of send message\n");
            }
			exit(0);
        }
        else if(err<0)
        {
            printf("Have error of fork\n");
        }
        else
        {
            err=msgrcv(msqid,&value,10,0,0);
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
	pid_t childpid=0;
	do{
		childpid=wait(NULL);
		if(childpid==-1)
		{
			printf("have error\n");
		}
		else
		{
			num++;
			printf("father have know child %d have over\n",getpid());
		}
	}while(num<NUM);
	printf("All of this have over");
	msgctl(msqid,IPC_RMID,0);
	return 0;
}
