function plot_lines_and_intersections (A, xrange, yrange)
  function Y = all2dets (X)
    matr = X(:,1)*(X(:,2))';
    Y = matr - matr';
  endfunction
  function [X, Y] = all_lines_intersections (A)
    delta = all2dets([A(:,1) A(:, 2)]);
    delta_x = all2dets([-A(:,3), A(:, 2)]);
    delta_y = all2dets([A(:, 1), -A(:,3)]);
    X = delta_x./delta;
    Y = delta_y./delta;
  endfunction
  plot_lines(A, xrange, yrange);
  [X Y] = all_lines_intersections(A);
  X = reshape(X, 1, rows(X)^2);
  X(X>xrange(2)) = NaN;
  X(X<xrange(1)) = NaN;
  Y = reshape(Y, 1, rows(Y)^2);
  Y(Y>yrange(2)) = NaN;
  Y(Y<yrange(1)) = NaN;
  plot(X, Y, "ro");
endfunction