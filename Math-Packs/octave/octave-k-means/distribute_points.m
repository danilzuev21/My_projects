function c = distribute_points (xy, centers, k)
  tmp = [];
  for i = 1:k
    tmp = [tmp (xy(:,1) - centers(i,1)).^2 + (xy(:,2) - centers(i,2)).^2];
  endfor
[val, c] = min(tmp, [], 2);
endfunction
