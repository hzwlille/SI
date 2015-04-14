clear all;
N=4000;%longeur du signal
Degre=5; %ordre du filtre
y=randn(1,N);%bruit blanc

%filtrage de yn
hn=[1 0.3 -0.2 0.1 0.05]; 

x=conv(y,hn);
%Valeur initiale : 
  g = zeros(1,Degre)';
  gfigure=zeros(N-3,Degre);
  erreur=zeros(N-3,1);
for k=1:N-Degre+1
    en = x(k+Degre-1) - y(k:k+Degre-1)*g;
    g= g+0.02*en*y(k:k+Degre-1)';
    gfigure(k,:)=g;
    erreur(k)=10*log(abs(en/x(k+Degre-1)));
end
figure;
plot(gfigure);
figure;
plot(erreur);
title(0.05);