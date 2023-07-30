(
Document.initAction = {

	|doc|
	var synth;

	doc.toFrontAction = {
		s.waitForBoot{
			s.freeAll;
			synth = doc.string.interpret
		}
	};

	doc.endFrontAction = {
		synth.free;
		doc.close;
	}
}
)