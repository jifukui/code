#include <stdio.h>
#include <unistd.h>
// write函数有3个输入参数
// (1)文件描述符
// (2)需要写的数据的指针
// (3)写数据的个数
// 返回成功写数据的个数
int main()
{
    size_t num;
    char ji[] = "hello this is jifukui\r\n";
    num = write(1, ji, 24);
    printf("I have send %ld byte data\r\n", num);
    return 0;
}