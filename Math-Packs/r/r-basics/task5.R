task5 <- function(sz) {
  ## your code here
  res<-array(dim=sz);
  for(i in 1:sz){
    coin=rbinom(1, 1, 0.5);
    if(coin==0){
      ##normal
      res[i] = rnorm(1);
    } else {
      ##exp
      res[i] = rexp(1);
    }
  }
  return(res);
}