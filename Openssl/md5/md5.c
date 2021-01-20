#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#include <openssl/ssl.h>
#include <openssl/md5.h>
const int out_len  = 16 ;
int main (){
    char in = "amlmdWt1aQ==" ;
    char out [out_len];
    int i ;
    MD5_CTX * ctx;
    MD5_Init(ctx);
    MD5_Update(ctx, in, (unsigned long)strlen(in));
    for(i = 0 ; i < out_len ; i++){
        printf("the data is %02X ",(unsigned char)out[i]);
    }
    printf("\r\n");
    MD5_Final(out, ctx);
}