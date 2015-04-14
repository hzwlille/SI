Egaliseur=Xtilde;
Egaliseur(1,:)=5*Egaliseur(5,:);%régler les canaux de fifférents poids.
for u=1:Nt;
    deb = (u-1)*R +1;
    fin = deb+M-1;
    ys=ifft(Egaliseur(:,u)).*w(1:M);
    y(deb:fin) = y(deb:fin)+ys; 
end

