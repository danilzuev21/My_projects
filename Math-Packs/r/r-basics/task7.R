task7 <- function(steps) {
  ## your code here
  matr=matrix(array(dim=steps*2), nrow=2, ncol = steps);
  for(i in 1:steps){
    r <- floor(runif(1,1,5));
    tmp <- switch(r,c(1, 0), c(-1,0), c(0,1), c(0,-1));
    matr[,i]<-t(tmp);
  }
  res<-c(sum(matr[1,]), sum(matr[2,]));
  return(res);
}