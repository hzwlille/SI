clear all;
load('les2voies.mat');
N=size(yn_HP);%longeur du signal
Degre=60; %ordre du filtre
y=yn_HP';%entrée yn 
z=zn_somme;
%Valeur initiale : 
  g = zeros(1,Degre)';
  gfigure=zeros(N-3,Degre);
  erreur=zeros(N-3,1);
  voie=zeros(N-3,1);
for k=1:N-Degre+1
    en = z(k+Degre-1) - y(k:k+Degre-1)*g;
    g= g+0.02*en*y(k:k+Degre-1)';
    gfigure(k,:)=g;
    voie(k)=en;
    erreur(k)=10*log(abs(en/(z(k+Degre-1))));
end

figure;
plot(zn_somme);
title('signal bruite');
figure;
plot(voie);
title('signal estimé');
figure;
plot(gfigure);
title('coefficients du filtre')