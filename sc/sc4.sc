/*RUN*/

play{n=LFNoise0;m=10;Splay.ar(CombC.ar(Saw.ar(n.ar((1..m)*0.1,m,m).round*m, 1/m),0.1,1/n.ar(LFNoise1.ar((1..m))).range(50,100),m)).tanh}