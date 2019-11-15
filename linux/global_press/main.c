#include <stdio.h>
#include <unistd.h>
int global=1;
int main()
{
    pid_t pid;
    int val=10;
    if((pid<fork())<0)
    {
        printf("fork error\n");
    }
    else if(pid==0)
    {
        global++;
        val++;
    }
    else
    {
        /* code */
    }
    printf("pid=%d;glob=%d;var=%d\n",(long)getpid(),global,val);
}