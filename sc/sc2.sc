/*RUN*/

play({a=LFNoise0.kr([5,6]);CombC.ar(RLPF.ar(Saw.ar(a.range(1,6)),a.range(1e3,1.5e4),3e-4),1,LFNoise0.kr(1).range(0.02,1),8)*0.01})