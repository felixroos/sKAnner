play{l=LFNoise2;Mix.ar(DFM1.ar(SinOsc.ar([40,41,50,150]*l.ar(l.ar(2,0.4,0.5).poll,4,5).floor),l.ar(0.2,990,1000),l.ar(0.2,1,1)*2))!2/10}