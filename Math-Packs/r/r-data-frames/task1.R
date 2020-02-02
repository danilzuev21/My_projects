## your code here
##a
library(MASS)
cars<-Cars93;
##b
kpl<-cars$MPG.city*1.60934/3.78541;
cars<-cbind(cars, kpl);
##c
HPMore200<-cars[cars$Horsepower>200,];
##d
b<-(n*sum(cars$kpl*cars$Horsepower)-sum(cars$kpl)*sum(cars$Horsepower))/(n*sum(cars$kpl^2)-(sum(cars$kpl))^2);
a<-mean(cars$Horsepower)-b*mean(cars$kpl);
plot(cars$kpl, cars$Horsepower, ylab="Horsepower", xlab="kpl");
lines(cars$kpl, a+cars$kpl*b);
##e
wt<-cars$Weight*0.000453592;
cars_copy<-cbind(cars$Horsepower, cars$kpl, wt);
plot(cars_copy);