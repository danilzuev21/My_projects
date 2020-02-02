function I = clusterization_quality (xy, centers, c, k)
  I = 0;
  for i = 1:k
    tmp = 0;
    for j = 1:rows(xy);
      if(c(j) == i)
        tmp = tmp + (xy(j,1) - centers(i,1))^2 + (xy(j,2) - centers(i,2))^2;
      endif
    endfor
    I = I + tmp;
  endfor
endfunction