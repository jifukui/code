#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#include <openssl/ssl.h>
#include <openssl/evp.h>
const int out_len  = 16 ;
int main (){
    char in = "amlmdWt1aQ==" ;
    char out [out_len];
    int i ;
    int len;
    //MD5_CTX * ctx;
    //EVP_DigestInit_ex(ctx,(const EVP_MD*)EVP_md5(),NULL);
    //EVP_DigestUpdate(ctx,(const void *)in,strlen(in));
    int ret ;
    do{
        ret = EVP_Digest((const void *)in,strlen(in),out,&len,(const EVP_MD*)EVP_md5(),NULL);
    }while(ret!=1);
    for(i = 0 ; i < out_len ; i++){
        printf("the data is %02X ",(unsigned char)out[i]);
    }
    printf("\r\n");
    
}