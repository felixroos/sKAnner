/*RUN*/

play{a=LFNoise0;Splay.ar(Formant.ar((1..8).collect(_* 50),a.ar((1..3)).range(50, a.ar(1).range(50,2000)),a.ar((1..4)).range(50,1500)))/3}