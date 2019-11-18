CC=gcc
CFLAGS=
.PHONY :all
all:server client
client:client.c comm.c comm.h
	$(CC) $(CFLAGS) -o $@ $^
server:server.c comm.c comm.h
	$(CC) $(CFLAGS) -o $@ $^
.PHONY:clean
clean:rm -f clean server