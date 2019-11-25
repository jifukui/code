#include <sys/ipc.h>
#include <sys/sem.h>
#include <sys/types.h>
#include <stdio.h>
#include <errno.h>
#include <stdlib.h>
/**
 * 创建信号量int semget(key_t key, int nsems, int semflg)
 * key为信号量的标识符，nsems为信号量的数量，semflg为权限的标识符
*/
union semun
{
    int val;
    struct semid_ds *buf;
    unsigned short int *array;
    struct seminfo *__buf;
};
int binary_semaphore_allocation(key_t key,int sem_flags)
{
    return semget(key,1,sem_flags);
}
int binary_semaphore_deallocate(int semid)
{
    union semun ignored_argument;
    return semctl(semid,1,IPC_RMID,ignored_argument);
}
int binary_semaphore_initialize(int semid)
{
    union semun argument;
    unsigned short values[1];
    values[0]=1;
    argument.array=values;
    return semctl(semid,0,SETALL,argument);
}
int binary_semaphore_wait(int semid)
{
    struct sembuf operations[1];
    operations[0].sem_num=0;
    operations[0].sem_op=-1;
    operations[0].sem_flg=SEM_UNDO;
    printf("waitting is %d\n",(int)getpid());
    return semop(semid,operations,1);
}
int binary_semaphore_post(int semid)
{
    struct sembuf operations[1];
    operations[0].sem_num=0;
    operations[0].sem_op=1;
    operations[0].sem_flg=SEM_UNDO;
    printf("process is %d\n",(int)getpid());
	sleep(1);
    return semop(semid,operations,1);
}
int main()
{
	//extern int errno;
	key_t semid;
	key_t key;
	key=ftok(".",1);
	errno=0;
    int err=0; 
	semid=binary_semaphore_allocation(key,IPC_CREAT |0666);
	printf("father is %d semid is %d key is %d\n",getpid(),(int)semid,(int)key);
    if(semid==-1)
    {
        printf("error of greated %d %s\n",errno,strerror(errno));
		exit(1);
    }
	errno=0;
    err=binary_semaphore_initialize(semid);
    if(err==-1)
    {
        printf("init error %d %s\n",errno,strerror(errno));
		exit(2);
    }
    int i=0;
    for(i;i<5;i++)
    {
        err=fork();
        if(err<0)
        {
            printf("%d have error\n",i);
        }
        else if(err==0)
        {
            printf("great is %d\n",(int)getpid());
            binary_semaphore_wait(semid);
            binary_semaphore_post(semid);
			printf("end of this %d\n",getpid());
			exit(0);
        }
        
    }
	printf("Hello ,this is father\n");
	int num=0;
	pid_t childpid;
	do{
		childpid=wait(NULL);
		if(childpid==-1)
		{
			if(errno==ECHILD)
			{
				printf("all of child have over\n");
				err=binary_semaphore_deallocate(semid);
				if(err==-1)
				{
					printf("error is %d info is %s\n",errno,strerror(errno));
				}
				break;
			}
			else
			{
				printf("have some error\n");
			}
		}
		else
		{
			num++;
			printf("father have know The child %d have over is the %d\n",(int)childpid,num);
		}
	}while(num<6);
	printf("Hello father have end\n");	
	return 0;
}
