#include <sys/types.h>
#include <sys/socket.h>
#include <stdio.h>
#include <arpa/inet.h>
#include <string.h>
#include <dlfcn.h>
#include <openssl/err.h>
#include <openssl/ssl.h>
const int length = 5000;
int main(){
    int socketfd ;
    struct sockaddr_in my_addr ;
    struct sockaddr_in other_addr ;
    int ret;
    int sin_size;
    sin_size = sizeof(struct sockaddr_in);
    socketfd = socket(AF_INET,SOCK_STREAM,0);
    struct SSL_CTX *jifukuictx;
    struct SSL *ssl;
    SSL_load_error_strings();
    //SSL_library_init();
    jifukuictx = SSL_CTX_new(SSLv23_server_method());
    //jifukuictx = SSL_CTX_new(TLSv1_2_server_method());
	if (jifukuictx == NULL)
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
	}else{
		printf("good for openssl\r\n");
	}
    if(socketfd==-1)
    {
        printf("have error for socket\r\n");
        return 0;
    }
    my_addr.sin_family = AF_INET;
    my_addr.sin_port = htons(4000);
    my_addr.sin_addr.s_addr = inet_addr("0.0.0.0");
    bzero(&(my_addr.sin_zero), 8);
    ret = bind (socketfd, (struct sockaddr *)&my_addr, sizeof(struct sockaddr));
    if(ret == -1){
        printf("have error for bind\r\n");
        return 0;
    }
    ret = listen(socketfd,1);
    if(ret == -1){
        printf("have error for listen\r\n");
        return 0;
    }
    while (1)
    {
        char data[length];
        bzero(data, length);
        int fd;
        char value[] =  "HTTP/1.1 200 OK\r\nContent-Type: text/html;Connection: close ;charset=UTF-8\r\nContent-Length: 33\r\n\r\n<html><body>jifukui</body></html>";
        int ssln ;
        fd = accept(socketfd,&other_addr, &sin_size);
        if(fd != -1){
            printf("good for accept\r\n");
        }else{
            continue;
        }
        ssl = SSL_new(jifukuictx);
        if(ssl){
            printf("creat ssl success\r\n");
        }else{
            printf("creat ssl failed\r\n");
        }
        SSL_set_fd(ssl,fd);
        ssln = SSL_accept(ssl);
        printf("the ssln state is %d\r\n",ssln);
        if (ssln >= 1) {
			printf("have accept\r\n");
            ret = SSL_read(ssl,data,length);
            printf("the receive is %d\r\n",ret);
			if(ret){
                //printf("the receive is %d\r\n",ret);
                //printf("good get data is %s\r\n",data);
                ret = SSL_write(ssl,value,131);
                if(ret){
                    printf("send success %d\r\n",ret);
                }else{
                    printf("error send info\r\n");
                }
            }else{  
                printf("have not get data\r\n");
            }
		} else {
            ERR_print_errors_fp(stderr);
			ssln = SSL_get_error(ssl, ssln);
			if (ssln != SSL_ERROR_WANT_READ && ssln != SSL_ERROR_WANT_WRITE)
			{
				printf("somethings \r\n");
			}
			printf("SSL_accept error %d\r\n",ssln);
		}
        SSL_clear(ssl);
        close(fd);  
    }
    return 0;

}