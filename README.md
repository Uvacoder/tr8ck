## TR8CK

an experimental DAW/tracker with [`Faust`](https://faust.grame.fr/) live coding via [`faust2webaudio`](https://github.com/grame-cncm/faust2webaudio) and UI powered by [`SolidJS`](https://www.solidjs.com/)

![tr8ck](https://user-images.githubusercontent.com/10504064/194712686-f1523f87-3085-430c-8ba5-aac2ac953622.gif)

# create patterns
![afbeelding](https://user-images.githubusercontent.com/10504064/194711560-eb68c80d-7164-4e16-ac09-2deb6f93b6fb.png)

# form compositions from patterns
![afbeelding](https://user-images.githubusercontent.com/10504064/194711611-6bfff893-359f-4e8d-814e-bf9ac4cb8849.png)

# TODO

- [x] composition-view
- [x] pattern-view
- [ ] synths with Faust
  - [x] compile custom Faust dsp-code
  - [ ] editable parameters
- [ ] sampler
  - [x] wave visualizer and selector
  - [x] timestretch
  - [x] reverse
  - [ ] record from mic
  - [ ] resample from set
- [x] fx chain with Faust
  - [x] drag'n'drop fx into track or instrument's fx chain
  - [x] edit and recompile Faust code fx
- [x] CodeMirror6 for Faust
  - [x] synthax-highlighting and completions
  - [ ] error handling
- [ ] automations
- [ ] save set
- [ ] record live / render set
