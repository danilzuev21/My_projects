#include <iostream>
#include <sstream>
#include <fstream>
#include <exception>

using namespace std;

class Stack
{
private:
    char *stackPtr;
    int size;
    int top;
public:
    Stack(int = 10);
    ~Stack();

    void newStack(int );
    int getTop();
    void push(const char );
    char pop();
    char tops();
};

class error1: public exception
{
public:
    explicit error1(char a)
        {this->a = a; }

    virtual const char* what() const throw()
    { return "The following character is incorrect.\n"; }
    void printErr()
    {
        cout<<"Incorrect character is \""<<a<<'\"'<<endl;
    }
private:
    char a;
};
class error2: public exception
{
public:
    explicit error2(char a)
        { this->a = a; }

    virtual const char* what() const throw()
    { return "The following character must be a name.\n"; }
    void printErr()
    {
        cout<<"The character \""<<a<<"\" must be a name."<<endl;
    }
private:
    char a;
};
class error3: public exception
{
public:
    explicit error3(char a)
        {this->a = a; }

    virtual const char* what() const throw()
    { return "The following character must be an operation.\n"; }
    void printErr()
    {
        cout<<"The character \""<<a<<"\" must be an operation."<<endl;
    }
private:
    char a;
};
class error4: public exception
{
public:
    explicit error4(char b1, char b2)
        {this->b1=b1; this->b2=b2; }

    virtual const char* what() const throw()
    { return "The opening bracket is not confirm to the closing bracket.\n"; }
    void printErr()
    {
        cout<<"The bracket \""<<b1<<"\" does not match the bracket \""<<b2<<"\"."<<endl;
    }
private:
    char b1;
    char b2;
};
class error5: public exception
{
public:
    explicit error5(const char* a)
        {this->a=a; }

    virtual const char* what() const throw()
    { return "Wrong character.\n"; }
    void printErr()
    {
        cout<<"The character \""<<a<<"\" is not int.\n";
    }
private:
    const char* a;
};
inline bool isClosingBrackets(char );
inline bool isName(char );
char* readFormula(stringstream& );
void checkFormula(char * );
void checkBrackets(char , Stack&);
