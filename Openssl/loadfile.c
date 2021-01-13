#include<openssl/ssl.h>
#include<openssl/err.h>
int main(){
    SSL_CTX		*ctx;
	SSL_library_init();
    SSL_library_init();
	if ((jifukuictx = SSL_CTX_new(SSLv23_server_method())) == NULL)
	{
		printf("load method over\r\n");
	}
	else if (SSL_CTX_use_certificate_file(jifukuictx, "thttpd.pem", SSL_FILETYPE_PEM) == 0)
	{
		printf("cannot open certificate\r\n");
	}
	else if (SSL_CTX_use_PrivateKey_file(jifukuictx, "thttpd.pem", SSL_FILETYPE_PEM) == 0)
	{
		printf("cannot open PrivateKey\r\n");
	}else
    {
        printf("good for this \r\n");
    }
    
    return 0;
}