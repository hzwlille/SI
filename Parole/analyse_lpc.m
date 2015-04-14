function [a, sigma2  ] = analyse_lpc( x, P)
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
a1=r_matrix\sig;
a1=a1/a1(1);
a=a1(2:end);
end

