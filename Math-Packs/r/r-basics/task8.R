task8 <- function(n) {
  ## your code here
  matr<-matrix(nrow=2, ncol=n);
  for(i in 1:n){
    matr[,i]<-task7(100);
  }
  plot(matr[1,],matr[2,], xlab="x", ylab="y");
}