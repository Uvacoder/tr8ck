import { createEffect, For, Index, onMount } from "solid-js"
import { createStore } from "solid-js/store"
import { store } from "../Store"
import Note, { Note as NoteType } from "./Note"

export default (props: { amount: number; sequence: NoteType[], active: boolean }) => {

  onMount(() => {
    console.log('mounted')
  })

  createEffect(() => {
    console.log("sequencssse is ", props.sequence[0].type)
  })

/*   createEffect(() => {
    console.log("seqsss is ", seq[0].type)
  }) */

  return (
    <div class="flex flex-1" style={{ "min-width": "1rem" }}>
      <div class="flex flex-1 flex-col gap-2 mt-2">
        <Index each={new Array(props.sequence.length).fill(0)}>
          {(_, index) => (
            <Note
              setNote={(note: NoteType) => {
                const [_, setSeq] = createStore<NoteType[]>(props.sequence)
                setSeq(index, note)
              }}
              note={props.sequence[index]}
              shouldBlink={props.active && store.clock % props.sequence.length === index}
              class={
                ((index + 1) / 4) % 1 === 0 && index < props.amount - 1
                  ? "mb-4"
                  : ""
              }
            />
          )}
        </Index>
      </div>
    </div>
  )
}

export const TinyTrack = (props: {
  amount: number
  onclick: (index: number) => void
}) => {

  return (
    <div
      class="flex flex-0"
    >
      <div class="flex flex-0 w-4 flex-col gap-2 mt-2">
        <For each={new Array(props.amount).fill(0)}>
          {(el, index) => (
            <button
              onclick={() => props.onclick(index())}
              class={`flex-1 flex overflow-auto flex-row items-center ${
                ((index() + 1) / 4) % 1 === 0 && index() < props.amount - 1
                  ? "mb-4"
                  : ""
              }`}
            >
              <div
                class={`flex flex-1 h-full relative overflow-hidden rounded-xl hover:bg-white ${
                  store.clock % props.amount === index()
                    ? "bg-white"
                    : "bg-black"
                }`}
                style={{
                  filter:
                    store.clock % props.amount === index()
                      ? "brightness(1.5)"
                      : "",
                }}
              />
            </button>
          )}
        </For>
      </div>
    </div>
  )
}

