#include <stdio.h>
#include <string.h>
#include <openssl/ssl.h>
int main(){
    EVP_ENCODE_CTX *    ectx;
    char in[]="jifukui",out[100];
    int outl;
    EVP_EncodeInit(ectx);
    EVP_EncodeUpdate(ectx,out,&outl,in,strlen(in));
    //EVP_EncodeFinal(&ectx,out+total,&outl);
    printf("the encode string is %s and the length is %d\r\n",out,outl);
    return 0;
}