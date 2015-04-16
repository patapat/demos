var sampleRate = 2048;
var t = .002; // T = Period (time for one full oscillation of a wave)
var volume = 1;
var frequency = 1 / t // higher frequency = higher pitch

var v = volume * Math.sin((2 * Math.PI) * (i / sampleRate) * frequency);

var attack = 0.002; // attack time = .002s or 2ms
if (i <= (sampleRate * attack)) {
  var curVol = volume * (i/ (sampleRate * attack));
} else {
  // decay: exponentially increasing decay at higher frequencies due to logarithmic dampener
  var dampen = Math.pow(0.5 * Math.log((frequency * volume) / sampleRate), 2);
  var curVol = volume * Math.pow((1-((i-(sampleRate * attack))/(sampleRate * (seconds-attack)))), dampen);
}

var dampen2 = Math.log((frequency * volume) / sampleRate);
