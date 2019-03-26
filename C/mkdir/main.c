#include <sys/stat.h>
int main()
{
    int flag=0;
    flag=mkdir("/tmp/www",0777);
    if(flag)
    {
        printf("failed\n");
    }
    else
    {
        printf("good\n");
    }
    return 0;
}