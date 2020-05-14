#include <stdio.h>
#include <net/if.h>
int main()
{
    char eth[]="enp6s0";
    char data[30];
    int index=0;
    index=if_nametoindex(eth);
    data=if_indextoname(index,eth);
    printf("The %s index is %d \n",eth,index);
    printf("name is %s\n",data);
    return 0;
}