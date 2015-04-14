clear all;
N=60
%réalisation du filtre Remez
h=2*firpm(N,[0,1/6-0.03,1/6+0.03,1/2]*2,[2,2,0,0]);
freqz(h);
[x,Fe] = wavread('song.wav');
tic
nor=normal(x,h);
toc
opt=optimal(x,h);
