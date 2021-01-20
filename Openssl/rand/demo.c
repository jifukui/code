#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
//#include <openssl/ssl.h>
int main(){
    printf("the max number is %u\r\n",RAND_MAX);
    time_t *t;
    unsigned int value = 0;
    char data[1024];
    srand((unsigned int ) time(t));
    value = rand()/(1024*1024*256);
    printf("the value is %u\r\n",value);
    memcpy(data,(const char *)value,1024);
    for(int i = 0 ; i < 1024 ; i++){
        printf("the %d value is %c and  %c\r\n",i,data[i],(char *)(value+1));
    }
    return 0;
}