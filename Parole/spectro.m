%=====================================================
function spectro...
    (x,Fe,Lfft,lfen_seconde,vtrans_seconde)
%=====================================================
% Usage:
%   spectro(x,Fe,Lfft,lfen_seconde,vtrans_seconde)
% typiqyuement
%      spectro(x,Fe,1024,20e-3,10e-3);
%
% Transformation de Fourier a court-terme
% x: signal
% Fe: frequence d'echantillonnage (en Hz)
% Lfft: nb depoints de FFT
% lfen_seconde: fenetre d'analyse en seconde
% vtrans_seconde: decalage de la fenetre en seconde
%=====================================================
x=x(:);
N=length(x);
vtrans=fix(vtrans_seconde*Fe);
lfen=fix(lfen_seconde*Fe);
nbfen=fix((N-lfen)/vtrans);
freq=Fe*(0:Lfft-1)/Lfft;
tps=((0:nbfen-1)+0.5)*vtrans/Fe;
xtrf=zeros(Lfft,nbfen);
ham=0.54-0.46*cos(2*pi*(0:lfen-1)'/(lfen));
for ii=1:nbfen
    id1=(ii-1)*vtrans+1;
    id2=id1+lfen-1;
    xr=x(id1:id2);
    xr= xr.* ham;
    xtrf(:,ii)=abs(fft(xr,Lfft));
end
imagesc(tps,freq,log10(xtrf));
colormap(jet)
set(gca,'ylim',[0 Fe/2],'ydir','normal');
set(gca,'fontname','times','fontsize',12)
tt=get(gca,'xlabel');
set(tt,'string','seconde','fontsize',12);
tt=get(gca,'ylabel');
set(tt,'string','Hz','fontsize',12,'rotation',0)
%=====================================================