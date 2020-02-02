function plot_clusters (xy, c, k)
  x = xy(:,1); # set the coordinates of the points
  y = xy(:,2);
  markers = "+o*.xsd^<>vph"; # list of all possible markers
  colors = "krgbmckrgbmck"; # 13 - color repetition list
  for i = 0:k-1
    plot (x( c == i+1) , y( c == i+1) , [ markers(rem(i,13)+1) , colors(rem(i,13)+1)])
    hold on;
  endfor
endfunction