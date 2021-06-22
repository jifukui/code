#include <stdio.h>
#include <fcntl.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <error.h>
extern int errno;
int main()
{
    int file;
    char buf[30];
    size_t num;
    file = open("./ji.txt", O_RDWR | O_CREAT, 0777);
    printf("the file status is %d\r\n", file);
    if (file == -1)
    {
        printf("the error is %s\r\n", strerror(errno));
        write(1, "open the file error\r\n", 22);
        return;
    }
    num = write(file, "Hello this is jifukui", 22);
    printf("I have write %ld num byte data\r\n", num);
    num = read(file, buf, 30);
    printf("I have read %ld num byte data\r\n", num);
    printf("Hello i Have get data is %s\r\n", buf);
    close(file);
    return 0;
}