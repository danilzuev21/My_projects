function XY = task5 (C1, C2)
  ## your code here
  d = sqrt((C2(1) - C1(1))^2+(C2(2) - C1(2))^2);
  if(d<=C2(3)+C1(3))
  hold on
  a = (C1(3)^2-C2(3)^2+d^2)/2/d;
  b = d-a;
  h = sqrt(C1(3)^2 - a^2);
  
  P0 = C1(1:2)+a*(C2(1:2) - C1(1:2))/d;
  
  P1x = P0(1)+(C2(2)-C1(2))*h/d;
  P1y = P0(2)-(C2(1)-C1(1))*h/d;
  
  P2x = P0(1)-(C2(2)-C1(2))*h/d;
  P2y = P0(2)+(C2(1)-C1(1))*h/d;
  
  sol1 = fsolve(@(x)f(x,C1,C2), [P1x, P1y]);
  sol2 = fsolve(@(x)f(x,C1,C2), [P2x, P2y]);
  t = 0:0.1:2*pi+0.1;
  circsx = C1(3)*cos(t)+C1(1);
  circsy = C1(3)*sin(t)+C1(2);
  plot(circsx, circsy);
  hold on
  circsx = C2(3)*cos(t)+C2(1);
  circsy = C2(3)*sin(t)+C2(2);
  plot(circsx, circsy);
  
  XY = [sol1; sol2];
  plot(XY(:,1),XY(:,2),"*");
  endif
  
endfunction
function y = f(x,C1,C2)
  y(1) = (x(1) - C1(1))^2+(x(2)-C1(2))^2 - C1(3)^2;
  y(1) = (x(1) - C2(1))^2+(x(2)-C2(2))^2 - C2(3)^2;
endfunction