task2 <- function(n, sz) {
  ## your code here
  res<-sample(1:n, size=sz, replace=TRUE);
  print(table(res));
  return(res);
}