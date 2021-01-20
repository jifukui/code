#include <stdio.h>
#include <string.h>
#include <openssl/ssl.h>
int main(){
    EVP_ENCODE_CTX *    ectx;
    char in[]="jifukui",out[100];
    int outl,inl;
    inl = strlen(in);
    printf("the inl len is %d\r\n",inl);
    EVP_EncodeInit(ectx);
    printf("start undate \r\n");
    EVP_EncodeUpdate(ectx,out,&outl,in,inl);
    printf("input final\r\n");
    printf("the encode string is %s and the length is %d\r\n",out,outl);
    EVP_EncodeFinal(&ectx,out,&outl);
    printf("the encode string is %s and the length is %d\r\n",out,outl);
    return 0;
}