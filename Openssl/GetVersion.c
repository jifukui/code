#include<openssl/ssl.h>
int main(){
	SSL_library_init();
    printf("the openssl version is %s\r\n",OpenSSL_version(OPENSSL_VERSION));
    return 0;
}
