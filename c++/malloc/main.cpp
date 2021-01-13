#include <iostream>
using namespace std;
int main(){
    int *a = new int(10);
    cout<<"the a value is "<<*a<<endl;
    int *b = new int[*a];
    int c [*a];
    cout<<"the size of b is "<<sizeof(*b)<<endl;
    cout<<"the length of int is "<<sizeof(int)<<endl;
    cout<<"the length of c is "<<sizeof(c)<<endl;
    cout<<"the b length is "<<sizeof(b)/sizeof(int)<<endl;
    delete a;
    delete [] b;
    return 0;
}