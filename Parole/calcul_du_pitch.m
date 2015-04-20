function [ pitch ,a] = calcul_du_pitch( vecteur, pitch_min, pitch_max )
%CALCUL_DU_PITCH Summary of this function goes here
%   Detailed explanation goes here
auto_vec=xcov(vecteur);
min=floor(8000/pitch_max/2);
find_indice=auto_vec((min+size(vecteur)):end);
[~,indice_Max]=max(find_indice);
pitch=floor(8000/(indice_Max+min));

if (pitch<pitch_min || pitch>pitch_max)
    pitch=pitch_min;
end 
  a=pitch;  
end

