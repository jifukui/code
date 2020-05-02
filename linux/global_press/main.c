#include <stdio.h>
#include <unistd.h>
int global=1;
char buf[]="a write to stdout\n";
int main()
{
    pid_t pid;
    int val=10;
	if(write(STDOUT_FILENO,buf,sizeof(buf)-1)!=sizeof(buf)-1)
	{
		printf("error\n");
		return 0;
	}
	printf("before fork\n");
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
		sleep(2);
        /* code */
    }
    printf("pid=%d;glob=%d;var=%d\n",(long)getpid(),global,val);
}
