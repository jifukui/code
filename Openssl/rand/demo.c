#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
//#include <openssl/ssl.h>
int main(){
    printf("the max number is %u\r\n",RAND_MAX);
    time_t *t;
    unsigned int value = 0;
    char data[64];
    srand((unsigned int ) time(t));
    for(int i = 0 ; i < 64 ; i++ ){
        data[i] = rand() % 256;
        printf("the i is %u and the value is %u\r\n",i,data[i]);
    }
    return 0;
}