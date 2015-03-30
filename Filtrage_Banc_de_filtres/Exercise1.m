clear all;
N=60
%réalisation du filtre Remez
h=firpm(N,[0,1/6-0.03,1/6+0.03,1/2]*2,[2,2,0,0]);

freqz(h);