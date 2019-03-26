#include <sys/stat.h>
#include <stdio.h>
int main()
{
    int flag=0;
    struct stat stas;
    
    flag=stat("/tmp/a.out",&stas);
    if(!flag)
    {
        printf("the file type is %d\n",stas.st_size);
    }
    return 0;
}