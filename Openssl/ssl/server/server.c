#include <sys/types.h>
#include <sys/socket.h>
#include <stdio.h>
#include <arpa/inet.h>
#include <string.h>
int main(){
    int socketfd ;
    struct sockaddr_in my_addr ;
    struct sockaddr_in other_addr ;
    int ret;
    int sin_size;
    sin_size = sizeof(struct sockaddr_in);
    socketfd = socket(AF_INET,SOCK_STREAM,0);
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
        char data[500];
        int fd;
        char value[] =  "hello this is jifukui\r\n";
        fd = accept(socketfd,&other_addr, &sin_size);
        if(fd != -1){
            printf("good for accept\r\n");
        }
        ret = recv(fd,data,500,0);
        printf("the receive is %d\r\n",ret);
        if(ret>0){
            printf("good get data \r\n");
            printf("good get data is %s\r\n",data);
            send(socketfd,value,strlen(value),0);
        }
    }
    return 0;

}