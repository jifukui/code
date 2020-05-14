#include <stdio.h>
#include <net/if.h>
int main()
{
    char eth[]="enp6s0";
    char data[30];
    char *value=data;
    int index=0;
    index=if_nametoindex(eth);
    value=if_indextoname(index,eth);
    printf("The %s index is %d \n",eth,index);
    printf("name is %s\n",value);
    return 0;
}