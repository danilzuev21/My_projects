function task3 (A)
  ## your code here
  x1 = A(1,:);
  y1 = A(2,:);
  plot(x1,y1,"ko");
  hold on;
  x_c = mean(x1);
  y_c = mean(y1);
  plot(x_c,y_c,"ro");
  plot(x1 - x_c, y1 - y_c, "g+");
  A1 = A;
  A = [cos(5*pi/180) sin(5*pi/180); -sin(5*pi/180) cos(5*pi/180)]*A;
  plot(A(1,:),A(2,:),"bs");
  A1 = A1 - [x_c; y_c];
  A1 = [cos(5*pi/180) sin(5*pi/180); -sin(5*pi/180) cos(5*pi/180)]*A1;
  A1 = A1 + [x_c; y_c];
  plot(A1(1,:),A1(2,:),"m*");
endfunction