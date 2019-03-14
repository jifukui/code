#ifndef _APUE_H
#define _APUE_H
#define _POSIX_C_SOURCE 201903L
#if defined (SOLARIS)
#define _XOPEN_SOURCE 600
#else
#define _XOPEN_SOURCE 700

#include<sys/types.h>
#include<sys/stat.h>
#include<sys/termios.h>

#if defined (MACOS)|| !defined (TIOCGWINSZ)
#include <sys/ioctl.h>
#endif
#include<stdio.h>
#include<stdlib.h>
#include<stddef.h>
#include<string.h>
#include<unistd.h>
#include<signal.h>
#define MAXLINE 4096
#define FILE_MODE (S_IRUSR|S_IWUSR|S_IPGRP|S_IROTH)
#define DIEMOD (FILE_MODE|S_IXUSR|S_IXGRP|S_IXOTH)
typedef void Sigfunc(int);;
#define min(a,b) ((a)<(b)?(a):(b))
#define max(a,b) ((a)>(b)?(a):(b))


char *path_alloc(size_t *);
long open_max(void);
int set_cloexec(int);
void clr_fl(int,int);
void set_fl(int,int);
void pr_exit(int);
void pr_mask(const char*);
Sigfunc *signal_intr(int ,Sigfunc *);
void daemonize(const char *);
void sleep_us(unsigned int);
ssize_t readn(int,void *,size_t);
ssize_t writen(int,const void *,size_t);
int fd_pip(int *);
int recv_fd(int,)
#endif