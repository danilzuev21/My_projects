task1 <- function(n, sz) {
  ## your code here
  vec1<-1:n;
  vec2<-seq(0, 0, length.out=(sz-(sz%%n)));
  vec2<-vec1+vec2;
  res<-c(vec2,vec1[vec1<=sz%%n]);
  return(res);
}