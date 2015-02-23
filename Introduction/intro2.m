
% affichage d’un sinus de fréq. réduite 0
N = 1000 ; % nombre de points du sinus
nu0 = .1 ; % fréquence réduite du sinus
% construction du signal
n = 0:0.01:N-1 ;
s = sin(2*pi*nu0*n);
plot(s,'.-');