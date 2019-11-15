#include <stdio.h>
int global=0;
int main()
{
    pid_t pid;
    int val;
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
    printf("pid=%d;glob=%d;var=%d\n",(long)getpid(),global,var);
}