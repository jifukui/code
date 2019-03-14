#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/socket.h>
#include <netinet/in.h>
#define MAXLINE 80
#define SERV_PORT 5000
int main ()
{
    nice(-10);
	struct sockaddr_in servaddr;
    char buf[MAXLINE];
    int sockfd,n;
    char str[]="#model?\r\n";
    sockfd=socket(AF_INET,SOCK_STREAM,0);
    bzero(&servaddr,sizeof(servaddr));
	bzero(buf,sizeof(buf));
    servaddr.sin_family=AF_INET;
    inet_pton(AF_INET,"127.0.0.1",&servaddr.sin_addr);
    servaddr.sin_port=htons(SERV_PORT);
    connect(sockfd,(struct sockaddr *)&servaddr,sizeof(servaddr));
    write(sockfd,str,strlen(str));
    n=read(sockfd,buf,MAXLINE);
    printf("Response form server:%s\n",buf);
    close(sockfd);
    return 0;
}
