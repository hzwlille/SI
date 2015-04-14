function [ s ] = normal( e,H )
%NORMAL Summary of this function goes here
%   Detailed explanation goes here
    L=zeros(2*size(e),1);
    L(1:2:end)=e;
    Middle=conv(L,H);
    s=Middle(1:3:end);
end

