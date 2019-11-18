#ifndef _COMM_H_H__
    #define _COMM_H_H__
    #include <stdio.h>
    #include <sys/types.h>
    #include <sys/ipc.h>
    #include <sys/shm.h>
    #define PATHNAME "."
    #define PROJ_ID 0x6666
    int CreateShm(int size);
    int DestotyShm(int shmid);
    int GetShm(int size);
#endif _COMM_H_H__