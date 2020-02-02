#include<iostream>
#include<fstream>
#include<cctype>
using namespace std;

bool Expression(ifstream &stream, char c);
bool Identifier(char c);
bool Operation(char c);
void Error(short k);
int main()
{
    char c = '0';
    bool b = false;
    short tmp = 0;
    cout<<"Анализатор понятия простое выражение:"<<endl;
    while(tmp != 3)
    {
        cout<<"Введите 1, если желаете вводить выражение с клавиатуры.\n"
              "Введите 2, если желаете брать выражение из файла test.txt.\n"
              "Введите, 3 если хотите закончить работу."<<endl;
        cin>>tmp;
        switch(tmp)
        {
            case 1:
            {
                cout<<"Введите выражение"<<endl;
                char str[100];
                cin.getline(str,1);
                cin.getline(str,100);
                ofstream fout;
                fout.open("test1.txt");
                fout<<str;
                fout.close();
                ifstream infile("test1.txt");
                do
                    infile>>c;
                while(isspace(c));
                if(!c)
                    Error(0);
                else
                {
                    cout<<c;
                    b = Expression(infile, c);
                    while(isspace(c))
                        infile>>c;
                    if(infile>>c && b)
                    {
                        Error(1);
                        b = false;
                    }
                }
                remove("test1.txt");
                break;
            }
            case 2:
            {
                ifstream infile("test.txt");
                if(!infile)
                {
                    cout<<"Входной файл не открыт."<<endl;
                    b = false;
                }
                do
                    infile>>c;
                while(isspace(c));
                if(!c)
                    Error(0);
                else
                {
                    cout<<c;
                    b = Expression(infile, c);
                    while(isspace(c))
                        infile>>c;
                    if(infile>>c && b)
                    {
                        Error(1);
                        b = false;
                    }
                }
                break;
            }
            case 3:
                break;
            default:
            {
                cout<<"Введено неверное число"<<endl;
                break;
            }
        }
        if(tmp == 1 || tmp == 2)
            if(b)
                cout<<endl<<"ЭТО ПРОСТОЕ ВЫРАЖЕНИЕ."<<endl;
            else
                cout<<"ЭТО НЕ ПРОСТОЕ ВЫРАЖЕНИЕ."<<endl;
    }

}
bool Expression(ifstream &infile, char c)
{
        if(c == '(')
        {
        while(isspace(c))
            infile>>c;
        if(infile>>c)
                {
                        cout<<c;
            if(!Expression(infile, c))
                return false;
                }
                else
                {
            Error(5);
                        return false;
                }
        while(isspace(c))
            infile>>c;
        if(infile>>c)
        {
            cout<<c;
            if(!Operation(c))
                return false;
        }
        else
        {
            Error(3);
            return false;
        }
        while(isspace(c))
            infile>>c;
        if(infile>>c)
        {
            cout<<c;
            if(!Expression(infile, c))
                    return false;
        }
        else
        {
            Error(5);
            return false;
        }
        while(isspace(c))
            infile>>c;
        if(infile>>c)
                {
                        cout<<c;
            if (c == ')')
                return true;
            else
            {
                Error(4);
                return false;
            }
                }
                else
                {
            Error(4);
                        return false;
                }


        }
    else if(isalpha(c))
        return true;
    else
    {
        Error(2);
        return false;
    }
}
bool Operation(char c)
{
        if( c == '+' || c == '-' || c == '*')
                return true;
    else
    {
        Error(3);
        return false;
    }
}
void Error (short k)
{
    cout << endl << "err#" << k;
    switch (k) {
        case 0: cout << "! - Пустая входная строка" << endl; break;
        case 1: cout << "! - Лишние символы после простого выражения" << endl; break;
        case 2: cout << "! - Недопустимый символ на месте простого выражения" << endl; break;
        case 3: cout << "! - Отсутствует или неверно введена операция" << endl; break;
        case 4: cout << "! - Отсутствует ')'." << endl; break;
        case 5: cout << "! - Очередное простое выражение － пустое" << endl; break;
        default : cout << "! - ...";break;
    };
}
