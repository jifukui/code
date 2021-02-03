#include <openssl/ssl.h>
#include <stdio.h>
int main(){
    printf("the openssl version is %s\r\n",OpenSSL_version(OPENSSL_VERSION));
    return 0;
}
