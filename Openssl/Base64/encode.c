#include <stdio.h>
#include <string.h>
#include <openssl/ssl.h>
int main(){
    EVP_ENCODE_CTX *    ectx;
    char in[]="jifukui",in1[]="testopenssl",out[100];
    int outl,inl，ret;
    inl = strlen(in);
    printf("the inl len is %d\r\n",inl);
    EVP_EncodeInit(ectx);
    printf("start undate \r\n");
    ret = EVP_EncodeUpdate(ectx,out,&outl,in,inl);
    printf("input final and the status\r\n",ret);
    printf("the encode string is %s and the length is %d\r\n",out,outl);
    ret = EVP_EncodeUpdate(ectx,out,&outl,in1,strlen(in1));
    printf("input final and the status\r\n",ret);
    printf("the encode string is %s and the length is %d\r\n",out,outl);
    EVP_EncodeFinal(ectx,out,&outl);
    printf("the encode string is %s and the length is %d\r\n",out,outl);
    return 0;
}