function task5 (coef_line, xrange, yrange)
  ## your code here
  M = [xrange(1) -coef_line(3)/coef_line(2)-coef_line(1)/coef_line(2)*xrange(1)
       xrange(2) -coef_line(3)/coef_line(2)-coef_line(1)/coef_line(2)*xrange(2)
       -coef_line(3)/coef_line(1)-coef_line(2)/coef_line(1)*yrange(2) yrange(2)
       -coef_line(3)/coef_line(1)-coef_line(2)/coef_line(1)*yrange(1) yrange(1)];
  if(coef_line(1) == 0)
    M = sortrows(M,1);
    plot(M(1:2,1), M(1:2,2));
  elseif(coef_line(2) == 0)
    M = sortrows(M,2);
    plot(M(1:2,1), M(1:2,2));
  else
    M = sortrows(M,1);
    plot(M(2:3,1), M(2:3,2));
  endif
endfunction