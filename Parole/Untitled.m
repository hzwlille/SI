%ANALYSE_LPC Summary of this function goes here
%   Detailed explanation goes here
sigma2=1;%definir sigma2 égale à 1
r = xcov(x,P)';
r_matrix=zeros(P+1,P+1);
for k=1:P+1
    r_matrix(k,:)=r(k+P:-1:k);
end
sig=zeros(P+1,1);
sig(1)=sigma2;
a=r_matrix\sig;
a=a/a(1);
a1=a(2:end)