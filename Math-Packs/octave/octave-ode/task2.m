function y = task2(alpha, y0, y1)
x = linspace(1,100,100000);
y = lsode(@(f, x) df(alpha, f, x), [y0, y1], x);
plot(x, y(:, 1));
hold on;
plot(x, y(:, 2));
endfunction
function xdot = df (alpha, f, x)
y = f(1);
dy = f(2);
xdot = [dy, -dy/x-(x^2-alpha^2)*y/x^2+4*(x/2)^(alpha + 1)/(sqrt(pi)*gamma(alpha+1/2)*x^2)];
endfunction