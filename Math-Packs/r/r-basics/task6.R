task6<-function(){
  ## your code here
  x=runif(1000,-1,1);
  y=rnorm(1000);
  z=rnorm(1000,0,10);
  t=rnorm(1000,0.01,1);
  print(t.test(x,y));
  print(t.test(x,z));
  print(t.test(x,t));
  print(t.test(y,z));
  print(t.test(y,t));
  print(t.test(z,t));
}