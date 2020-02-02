function plot_lines (A, xrange, yrange)
  hold on;
  for i=1:rows(A)
    task5(A(i,:),xrange,yrange)
  endfor
endfunction