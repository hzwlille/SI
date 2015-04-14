function [ s ] = optimal( e, H )
%OPTIMAL Summary of this function goes here
%   Detailed explanation goes here
    E0=H(1:3:end);
    E1=H(2:3:end);
    E2=H(3:3:end);
    Li=zeros(2*size(e),1);
    Li(1:2:end)=e;
    L0=filter([0,1],1,Li);
    L1=Li;
    Middle=L0+L1;
    Middle1=filter([0,1],1,Middle);
    Middle2=filter([0,1],1,Middle1);
    M0=Middle(1:3:end);
    M1=Middle1(1:3:end);
    M2=Middle2(1:3:end);
    M0s=conv(M0,E0);
    M1s=conv(M1,E1);
    M2s=conv(M2,E2);
    s=M0s+[M1s,0]+[M2s,0];
end

