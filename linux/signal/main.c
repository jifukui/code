#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/ipc.h>
#include <sys/sem.h>
#include <string.h>
int semid;
union semun{
    int value;
};
void get_sour(int num)
{
    struct sembuf sb[2]={
        {num,-1,0},
        {(num+1)%5,-1,0}
    };
    semop(semid,sb,2);
}
void free_sour(int num)
{
    struct sembuf sb[2]={
        {num,-1,0},
        {(num+1)%5,-1,0}
    };
    semop(semid,sb,2);
}
void phil(int num)
{
    while (1)
    {
        printf("%d is thinking ...\n",num);
        sleep(rand()%5);
        get_sour(num);
        printf("%d start eating...\n",num);
        sleep(rand()%3);
        printf("%d end eating...\n",num);
        free_sour(num);
    }  
}
int main()
{
    srand(getpid());
    semid=semget(1234,5,IPC_CREAT|0600);
    if(semid==-1)
    {
        printf("semment error\n");
        return 0;
    }
    union  semun s;
    s.value=1;
    int i=0;
    for(i;i<5;i++)
    {
        semctl(semid,i,SETVAL,s);
    }
    int num=0;
    for(i=1;i<5;i++)
    {
        pid_t pid=fork();
        if(pid==0)
        {
            num=i;
            break;
        }        
    }
    phil(num);
}
