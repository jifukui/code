#include <sys/types.h>
#include <sys/msg.h>
#include <sys/ipc.h>
#include <stdio.h>
#include <errno.h>
#define NUM 5
struct mymsg{
	long mtype;
	int mvalue;
};
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
    int errno;
    for(i;i<NUM;i++)
    {
        err=fork();
        if(err==0)
        {
			struct mymsg msg;
			msg.mtype=1;
			msg.mvalue=i;
            err=msgsnd(msqid,&msg,sizeof(int),IPC_NOWAIT);
            printf("The child id is %d send value is %d\n",getpid(),i);
            if(err==-1)
            {
                printf("have error of send message info is %s \n",strerror(errno));
            }
			exit(0);
        }
        else if(err<0)
        {
            printf("Have error of fork\n");
        }
        else
        {
			//sleep(1);
			struct mymsg value;	
            err=msgrcv(msqid,&value,sizeof(int),0,IPC_NOWAIT);
            if(err<0)
            {
                printf("get value error\n");
            }
            else
            {
                printf("Get The value success is %d\n",value.mvalue);
            }
            
        }     
    }
	pid_t childpid=0;
	do{
		printf("waitting ... ...\n");
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
