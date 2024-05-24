// See https://aka.ms/new-console-template for more information
using Microsoft.VisualBasic;
using System;
using System.ComponentModel.Design;

int BornYear(int year, int age)
{
    Console.WriteLine("please enter your born year");
    return age;
    if (age > 0)
    {
       Console.WriteLine("yas sifirdan kicik ola bilmez");

    }
    else
    {
        Console.WriteLine("yas sifira beraberdir");
    }
    Console.WriteLine(BornYear(2024, 2005));
    