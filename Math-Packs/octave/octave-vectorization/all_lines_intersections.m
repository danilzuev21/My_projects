function [X, Y] = all_lines_intersections (A)
  ## your code here
  delta = all2dets([A(:,1) A(:, 2)]);
  delta_x = all2dets([-A(:,3), A(:, 2)]);
  delta_y = all2dets([A(:, 1), -A(:,3)]);
  X = delta_x./delta;
  Y = delta_y./delta;
endfunction

#############################################
##                Test code                ##
##     Do not delete it or correct it!     ##
#############################################
%!test                                     ##
%!  A = [ 4, 8, 3                          ##
%!       -3, 2, 0]                         ##
%!  [X, Y] = all_lines_intersections (A)   ##
%!test                                     ##
%!  A = [1, 1, 1                           ##
%!       1, 1, 6]                          ##
%!  [X, Y] = all_lines_intersections (A)   ##
%!test                                     ##
%!  A = [ 4,  6,  8                        ##
%!        3, -4,  0                        ##
%!       -3, 15,  1                        ##
%!        0,  1, -4                        ##
%!        2,  3,  0]                       ##
%!  [X, Y] = all_lines_intersections (A)   ##
#############################################