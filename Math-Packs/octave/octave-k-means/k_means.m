function c = k_means (xy, k)
  centers_vec = [];
  c_vec  = [];
  I_vec = [];
  for i = 1:10
    centers_tmp = select_k_clusters(xy, k);
    for j = 1:10
      c_tmp = distribute_points(xy, centers_tmp, k);
      centers_tmp = reevaluate_centers(xy, c_tmp, k);
      hold off;
      plot_clusters(xy, c_tmp, k);
      pause(0.2);
    endfor
    c_vec = [c_vec c_tmp];
    centers_vec = [centers_vec centers_tmp];
    I_vec = [I_vec clusterization_quality(xy, centers_vec(:,2*i-1:2*i), c_vec(:,i), k)];
  endfor
  [val, index] = min(I_vec, [], 2);
  c = c_vec(:,index);
  hold off;
  plot_clusters(xy, c, k);
endfunction