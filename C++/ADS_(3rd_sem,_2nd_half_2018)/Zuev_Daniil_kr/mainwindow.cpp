#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "haffman_dinamic.hpp"
#include <random>
#include <fstream>
#include <cstdio>
#include <cstring>
#include <sstream>
#include <unistd.h>

using namespace std;

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    count = 5;
    length = 5;
    tmp = 2;
}
MainWindow::~MainWindow()
{
    delete ui;
}
void MainWindow::on_pushButton_3_clicked()
{
    exit(0);
}
void MainWindow::on_pushButton_clicked()
{
    srand(time(NULL));
    ofstream task;
    task.open("task.txt");
    ofstream answer;
    answer.open("answer.txt");
    stringstream xstream;
    switch(tmp){
    case 1:
    {
        task<<"Задание на кодирование динамическим алгоритмом Хаффмана"<<endl<<endl;
        answer<<"Ответ на задание на кодирование динамическим алгоритмом Хаффмана"<<endl<<endl;
        for(int i = 1; i<=5; i++)
        {
            task<<"Вариант "<<i<<endl;
            answer<<"Вариант "<<i<<endl;
            for(int j = 1; j<=4;j++)
            {
                xstream.str("");
                xstream.clear();
                string str_task;
                string str_answer;
                string* accordance;
                accordance = new string[26];
                task<<"Задание №"<<j<<endl;
                answer<<j<<") ";
                task<<"Используемые символы:"<<endl;
                str_task = generate(count, length);
                xstream << str_task;
                str_answer = code(xstream, accordance);
                for(j = 0; j<26;j++)
                    for(int i = 0;i<26;i++)
                        if(char('a'+j) == accordance[i][0])
                            task<<accordance[i]<<endl;
                task<<str_task<<';'<<endl;
                answer<<str_answer<<';'<<endl;
            }
            task<<endl;
        }
        break;
    }
    case 2:
    {
        task<<"Задание на декодирование динамическим алгоритмом Хаффмана"<<endl<<endl;
        answer<<"Ответ на задание на декодирование динамическим алгоритмом Хаффмана"<<endl<<endl;
        for(int i = 1; i<=5; i++)
        {
            task<<"Вариант "<<i<<endl;
            answer<<"Вариант "<<i<<endl;
            for(int j = 1; j<=4;j++)
            {
                xstream.str("");
                xstream.clear();
                string str_task;
                string str_answer;
                string* accordance;
                accordance = new string[26];
                task<<"Задание №"<<j<<endl;
                answer<<j<<") ";
                task<<"Используемые символы:"<<endl;
                str_task = generate(count, length);
                xstream << str_task;
                str_answer = code(xstream, accordance);
                for(j = 0; j<26;j++)
                    for(int i = 0;i<26;i++)
                    {
                        if(char('a'+j) == accordance[i][0])
                            task<<accordance[i]<<endl;
                    }
                    task<<str_answer<<';'<<endl;
                    answer<<str_task<<';'<<endl;
            }
            task<<endl;
        }
        break;
    }
    task.close();
    answer.close();
    }
}
void MainWindow::on_pushButton_4_clicked()
{
    system("gedit task.txt");
}

void MainWindow::on_pushButton_5_clicked()
{
    system("gedit answer.txt");
}
void MainWindow::on_radioButton_clicked()
{
    tmp = 1;
}
void MainWindow::on_spinBox_valueChanged(int arg1)
{
    count = arg1;
}
void MainWindow::on_spinBox_2_valueChanged(int arg1)
{
    length = arg1;
}
void MainWindow::on_pushButton_2_clicked()
{
    MainWindow::on_spinBox_valueChanged(5);
    ui->spinBox->setValue(5);
    MainWindow::on_spinBox_2_valueChanged(5);
    ui->spinBox_2->setValue(5);
    ui->radioButton_2->setChecked(true);
    ofstream task;
    task.open("task.txt");
    ofstream answer;
    answer.open("answer.txt");
    task.close();
    answer.close();
}
void MainWindow::on_radioButton_2_clicked()
{
    tmp = 2;
}
