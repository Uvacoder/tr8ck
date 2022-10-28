import Faust2WebAudio, { Faust, FaustAudioWorkletNode } from "faust2webaudio"
import { TCompiledCode, TCompiledDsp } from "faust2webaudio/src/types"
import { Accessor } from "solid-js"
import AudioNodeRecorder from "./utils/webaudio/AudioNodeRecorder"

interface InstrumentBase {
  active: true
  index: number
  pan: number
  color: string
  fxChains: DSPElement[][]
  compilingIds: string[]
  speed: number
}

export interface Sampler extends InstrumentBase {
  type: "sampler"
  src?: string
  navigation: {
    start: number
    end: number
  }
  selection: {
    start: number
    end: number
  }
  speed: number
  arrayBufferName?: string
  waveform?: Waveform
  audioBuffer?: AudioBuffer
  node?: undefined
  error?: undefined
  inverted: boolean
}
export interface Synth extends InstrumentBase {
  type: "synth"
  code: string
  elements: FaustElement[]
  // node: Faust2WebAudio.FaustAudioWorkletNode | undefined
  error?: string
}
export type Instrument = Sampler | Synth

export type createFaustNode = (
  code: string
) => Promise<Faust2WebAudio.FaustAudioWorkletNode | undefined>

export interface ActiveNote {
  type: "active"
  frequency: number
  instrumentIndex: number
}
export interface SilenceNote {
  type: "silence"
}
export interface InactiveNote {
  type: "inactive"
}

export type Note = ActiveNote | InactiveNote | SilenceNote

export interface Inactive {
  active: false
  node?: undefined
  error?: undefined
  navigation?: undefined
  selection?: undefined
}

export interface Pattern {
  sequences: Note[][]
  id: string
  color: string
}

export type Indices = [number, number]

interface FaustCompilationSucces {success: true, dsp: TCompiledDsp} 
interface FaustCompilationError {success: false, error: string}
export type FaustCompilationResponse = FaustCompilationSucces | FaustCompilationError

export interface Waveform {
  min: number[]
  max: number[]
  length: number
}

const x = new AudioContext().destination

export interface WebAudioElement {
  id: string
  initialName: string
  node: FaustAudioWorkletNode | GainNode
  connection:
    | FaustAudioWorkletNode
    | AudioDestinationNode
    | undefined
    | GainNode
  detachable: boolean
  active: boolean
}

export interface GainElement extends WebAudioElement {
  node: GainNode
}

export interface FaustElement extends WebAudioElement {
  factoryId: string
  node: FaustAudioWorkletNode
  parameters: FaustParameter[]
}

export type DSPElement = WebAudioElement | GainElement

export interface FaustFactory {
  id: string
  node: TCompiledDsp
  initialName: string
  parameters: FaustParameter[]
}

export interface FaustParameter {
  address: string
  label: string
  init: number
  value: number
  max: number
  min: number
  step: number
}

export interface Track {
  instrumentIndex?: number
  frequency: number
  semitones: number
  fxChain: DSPElement[]
  compilingIds: string[]
  playingInstrument?: AudioBufferSourceNode | FaustElement;
  pitchshifter?: FaustAudioWorkletNode
}


export interface AppState {
  faust?: Faust
  context?: AudioContext
  clock: number
  clockOffset: number
  bpm: number
  playMode: "pattern" | "composition"
  rootNode?: AudioNode
  audioRecorder?: {
    recorder: AudioNodeRecorder
    type: "mic" | "file" | "resample"
  }
  patterns: Pattern[]
  tracks: Track[]
  composition: ({id: string, patternId: string})[]
  faustFactories: FaustFactory[]
  instruments: (Instrument)[]
  editors: {
    id: string
    code: string
    oncompile: (dsp: TCompiledDsp) => void
  }[]
  selection: {
    frequency: number
    instrumentIndex: number
    patternId: string
    blockId?: string
    trackIndex: number
  }
  keys: {
    shift: boolean
    control: boolean
    alt: boolean
  }
  dragging: {
    fx: {
      id: string
      name: string
      detachable: boolean
      parameters?: any[]
      active?: boolean
    } | undefined
  }
  bools: {
    playing: boolean
    mousedown: boolean
  }
  arrayBuffers: {arrayBuffer: ArrayBuffer, name: string}[]
  mic?: MediaStream
  solos: number[]
}