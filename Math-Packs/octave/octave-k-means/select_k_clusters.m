function centers = select_k_clusters (xy, k)
  centers = xy(randi(rows(xy),k,1),:);
endfunction