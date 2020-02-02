task4 <- function(steps) {
  ## your code here
  base_vec<-c(1,-1);
  res<-sample(base_vec, size=steps, replace=TRUE);
  return(sum(res));
}