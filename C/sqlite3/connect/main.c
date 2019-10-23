#include <stdio.h>
#include "../sqlite3.h"
int main(int argc,char **argv )
{
    sqlite3 *db;
    char *zErrmsg=NULL;
    int rc;
    rc=sqlite3_open("test.db",&db);
    if(rc)
    {
        fprintf(stderr,"Can't open databases: %s\n",sqlite3_errmsg(db));
        //printf("%s",stderr);
        exit(0);
    }
    else
    {
        fprintf(stderr,"opened database successful\n");
        //printf("%s",stderr);
    }
    sqlite3_close(db);
}