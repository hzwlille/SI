clear all;
Fe=100;
t=(0:180*Fe-1)/Fe;
T=1/Fe;
A=[-11/4, -11/8, -5/4; 27/4, 11/8, 21/4;15/8 19/16 5/8];
b =[1,-1,-1/2]';
cT =[3/8, 1/2, -1/4];
d = 0;
e=ones(1,180*Fe);
x(:,1)=[0,0,0]';
Ae=[A,b;zeros(1,3),0]*T;
Exp_Ae=expm(Ae);
fi=Exp_Ae(1:3,1:3);
ps=Exp_Ae(1:3,4);
for k=1:180*Fe-1,
    x(:,k+1)=fi*x(:,k)+ps*e(k);
end

for k=1:180*Fe-1,
    norminf(k) = norm(x(:,k),inf);
end
plot(norminf);


