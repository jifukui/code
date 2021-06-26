#include <stdio.h>
#include <stdlib.h>
int main(){
    int *data = (int *)malloc(1);
    if(data){
        printf("good alloc address %u\r\n",data);
        *data = 89;
        printf("the data value is %d\r\n",*data);
        free(data);
        printf("good alloc address %u\r\n",data);
        printf("the data value is %d\r\n",*data);
    }
}