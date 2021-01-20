#include <stdio.h>
#include <string.h>
#include <openssl/ssl.h>
int main(){
    EVP_ENCODE_CTX *    ectx;
    char in[]="amlmdWt1aQ==",out[100];
    int outl,inl;
    inl = strlen(in);
    printf("the inl len is %d\r\n",inl);
    EVP_DecodeInit(ectx);
    printf("start undate \r\n");
    EVP_DecodeUpdate(ectx,out,&outl,in,inl);
    printf("input final\r\n");
    printf("the encode string is %s and the length is %d\r\n",out,outl);
    EVP_DecodeFinal(ectx,out,&outl);
    printf("the encode string is %s and the length is %d\r\n",out,outl);
    return 0;
}