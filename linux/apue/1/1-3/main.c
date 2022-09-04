#include "../../apue.h"
#include <dirent.h>
/**
 * @brief 
 * 改程序为列出指定路径下的所有目录
 * @param argc 
 * @param argv 
 * @return int 
 */
int main(int argc ,char **argv)
{
    DIR * dp=NULL;
    struct dirent *dirp=NULL;
    if(argc!=2)
    {
        err_quit("usage:ls directory_name\n");
    }
    if((dp=opendir(argv[1]))==NULL)
    {
        err_sys("cann't open %s\n",argv[1]);
    }
	else
	{
		printf("open dir success\n");
	}
    while ((dirp=readdir(dp))!=NULL)
    {
        printf("%s\n",dirp->d_name);
    }
    closedir(dp);
    exit(0);
}
