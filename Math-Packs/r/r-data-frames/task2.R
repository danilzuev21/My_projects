## your code here
##a
size<-array(dim=1000)
color<-array(dim=1000)
for(i in 1:1000){
  size[i]<-floor(runif(1,0,2))+1;
  color[i]<-floor(runif(1,0,3))+1;
}
size<-factor(size, levels = c(1, 2));
levels(size) <- c("big", "small");
color<-factor(color, levels = c(1, 2, 3));
levels(color) <- c("red", "green", "blue");
balls<-data.frame(size=size,color=color);
##b
table(balls);##wtites information about amount of elements with different features
summary(balls);##writes information about columns
plot(balls) ##displays information on the quantitative ratio of elements with specified characteristics 
##c
weight <- array(dim = 1000);
for(i in 1:1000){
  mu<-switch(balls$size[i], big=50, small=10);
  tmp<-rnorm(1, mu, 1);
  weight[i]<-tmp;
}
balls<-cbind(balls, weight);
##d
table(balls);##writes balls in ascending order of mass
summary(balls);##writes information about columns
plot(balls);