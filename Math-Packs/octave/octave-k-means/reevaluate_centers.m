function centers = reevaluate_centers (xy, c, k)
  centers = [];
  for i = 1:k
    tmp = [];
    for j = 1:rows(xy);
      if(c(j) == i)
        tmp = [tmp; xy(j,:)];
      endif
    endfor
    if( size(tmp) == [0,0])
      centers = [centers; Inf Inf];
    else
      centers = [centers; mean(tmp, 1)];
    endif
  endfor
endfunction