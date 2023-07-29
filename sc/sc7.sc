/*RUN*/

{var a=LFNoise2;LeakDC.ar(CombC.ar(Decay2.ar(Impulse.ar(a.ar(1).range(1,2)))*SinOsc.ar(99),4,a.ar(a.ar(1!2).range(1,2)).range(1/99,4),9))}.play;