#include <stdio.h>
#include <openssl/ssl.h>
#include <openssl/err.h>
int main(){
    SSL_CTX		*jifukuictx;
    char *sslfunc[]={
		"SSL_free",
		"SSL_accept",
		"SSL_connect",
		"SSL_read",
		"SSL_write",
		"SSL_get_error",	
		"SSL_set_fd",
		"SSL_new",
		"SSL_CTX_new",
		"SSLv23_server_method",
		"SSL_library_init",
		"SSL_CTX_use_PrivateKey_file",
		"SSL_CTX_use_certificate_file",
	};
	for(int i=0;i<13;i++){
		if(dlsym(ssllib,sslfunc[i])==NULL){
			printf("have get error %s\r\n",sslfunc[i]);
		}else{
			printf("have get success %s\r\n",sslfunc[i]);
		}
	}
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
	}
}