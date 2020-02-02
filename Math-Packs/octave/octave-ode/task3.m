function task3 (Alpha, Beta, Gamma, Delta, k)
  ## your code here
  x_ = Gamma/Delta;
  y_ = Alpha/Beta;
  t = 1:0.01:20;  
  for i = 0:5;
    y = lsode(@(x, t) f1(x, t, Alpha, Beta, Gamma, Delta), [x_, y_+k*i], t);
    plot(y(:,1),y(:,2));
    hold on;
  endfor  
endfunction
function xdot = f1(x, t, Alpha, Beta, Gamma, Delta)
  xdot = [(Alpha - Beta*x(2))*x(1)
          (Delta*x(1) - Gamma)*x(2)];
endfunction
