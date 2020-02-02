#include <iostream>
#include <sstream>
#include <fstream>
#include <cstring>
#include <exception>
#include "functions.hpp"

Stack::Stack(int maxSize)
{
    stackPtr = new char[maxSize];
    top = 0;
    size = maxSize;
}
Stack::~Stack()
{
    delete [] stackPtr;
}
void Stack::newStack(int newSize)
{
    char* newPtr = new char[newSize];
    for(int i = 0; i<=size;i++)
        newPtr[i] = stackPtr[i];
    delete [] stackPtr;
    stackPtr = newPtr;
    size = newSize;
}
int Stack::getTop()
{
    return top;
}
void Stack::push(const char value)
{
    if(top < size)
        stackPtr[++top] = value;
    else
    {
        newStack(size<<1);
        stackPtr[++top] = value;
    }
}
char Stack::pop()
{
    if(top != 0)
        return stackPtr[--top];
    else throw logic_error("The stack is emptied during the execution of the function.\n");
}
char Stack::tops()
{
    if(top != 0)
        return stackPtr[top];
    else throw overflow_error("Missing opening bracket.\n");
}
bool isClosingBrackets(char x)
{
    return x==')'||x=='}'||x==']';
}
bool isName(char x)
{
    return x=='x'||x=='y'||x=='z';
}
char* readFormula(stringstream& xstream)
{
    char x;
    int i = 0;
    char a[100];
    a[i++]='(';
    if(!(xstream>>x))
        throw logic_error("The input stream is empty.\n");
    while (x==' ')
        xstream >> x;
    if(x =='('||x=='['||x =='{'||isName(x))
    {
        a[i++] = x;
    }
    else throw error1(x);
    while(xstream>>x)
    {
        while(x == ' ')
            xstream>>x;
        if(x == '('||x == '['||x =='{'||isName(x)||isClosingBrackets(x)||x=='+'||x=='-')
        {
            a[i++] = x;
        }
        else throw error1(x);
    }
    a[i++]=')';
    a[i++]='\0';
    cout<<"The input string:\n";
    for(int j = 1;j<i-2;j++)
        cout<<a[j]<<' ';
    cout<<endl;
    return a;
}
void checkFormula(char* a)
{
    Stack s;
    int len = strlen(a);
    for(int i = 0; i < len; i++)
    {
        if(isClosingBrackets(a[i]))
            checkBrackets(a[i], s);
        else
            s.push(a[i]);
    }
    if(s.getTop()!=1 )
        throw invalid_argument("Missing closing bracket.\n");
}
void checkBrackets(char br, Stack &s)
{
    char op1, op2, op3;
    switch(br){
    case ')':
        op1 = '(';
        op2 = '{';
        op3 = '[';
        break;
    case '}':
        op1 = '{';
        op2 = '(';
        op3 = '[';
        break;
    case ']':
        op1 = '[';
        op2 = '(';
        op3 = '{';
        break;
    }
    while(true)
    {
        if(!isName(s.tops()))
        {
            throw error2(s.tops());
        }
        s.pop();
        if(s.tops() == op2||s.tops() == op3)
            throw error4(s.tops(), br);
        if(s.tops() == op1)
        {
            s.pop();
            s.push('x');
            break;
        }
        if(!(s.tops()=='-'||s.tops()=='+'))
            throw error3(s.tops());
        s.pop();
        if(!isName(s.tops()))
            throw error2(s.tops());
        s.pop();
        if(s.tops() == op2||s.tops() == op3)
            throw error4(s.tops(), br);
        if(s.tops() == op1)
        {
            s.pop();
            s.push('x');
            break;
        }
        s.push('x');
    }
    s.pop();
    s.push('x');
}
