/*RUN*/

{var a=LFNoise2;(SinOsc.ar(Array.series(64,a.ar(a.ar(2).range(1,10)).range(1,90),a.ar(a.ar(2).range(1,10)).range(1,15))).sum).tanh!2;}.play;