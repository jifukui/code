#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#include <openssl/ssl.h>
int main(){
    printf("the max number is %u\r\n",RAND_MAX);
    return 0;
}