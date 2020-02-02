#include <iostream>
#include <sstream>
#include <fstream>
#include <cstring>
#include <exception>
#include <cstdlib>
#include "functions.hpp"
using namespace std;

int main()
{
    stringstream xstream;
    char* str0;
    str0 = new char[100];
    string tmp1;
    short int tmp = 0;
    while(tmp != 3)
    {
        try{
            xstream.str("");
            xstream.clear();
            cout<<"Введите 1, если желаете вводить выражение с клавиатуры.\n"
              "Введите 2, если желаете брать выражение из файла test.txt.\n"
              "Введите, 3 если хотите закончить работу."<<endl;
            getline(cin, tmp1);
            if(!atoi(tmp1.c_str() ))
                throw error5(tmp1.c_str());
            else tmp = atoi(tmp1.c_str());
            switch(tmp){
                case 1:
                    cout << "Введите формулу: \n";
                    cin.getline(str0, 100);
                    xstream << str0;
                    break;
                case 2:
                {
                    ifstream outfile;
                    outfile.open("test.txt");
                    if (!outfile)
                        throw runtime_error("File is not open.\n");
                    outfile.read(str0, 100);
                    outfile.close();
                    xstream << str0;
                    break;
                }
                case 3:
                    continue;
                default:
                    throw invalid_argument("You entered wrong number.\n");;
            }
            char formula[100];
            strcpy(formula, readFormula(xstream));
            checkFormula(formula);
        }
        catch(error1& e)
        {
            cout<<e.what();
            e.printErr();
            cout<<"Formula is wrong.\n";
            continue;
        }
        catch(error2& e)
        {
            cout<<e.what();
            e.printErr();
            cout<<"Formula is wrong.\n";
            continue;
        }
        catch(error3& e)
        {
            cout<<e.what();
            e.printErr();
            cout<<"Formula is wrong.\n";
            continue;
        }
        catch(error4& e)
        {
            cout<<e.what();
            e.printErr();
            cout<<"Formula is wrong.\n";
            continue;
        }
        catch(error5& e)
        {
            cout<<e.what();
            e.printErr();
            continue;
        }
        catch(exception& e)
        {
            cout<<e.what();
            continue;
        }
        cout<<"Formula is right.\n";
    }
    return 0;
}
