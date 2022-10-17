import { JSXElement } from "solid-js";

const Button = (props: {
    onclick?: (e: MouseEvent) => void, 
    onmousedown?: (e: MouseEvent) => void,
    children?: JSXElement[] | JSXElement, 
    class?: string, 
    style?: {[key: string]: string}
}) => {
    return <button
        onclick={props.onclick}
        onmousedown={props.onmousedown}
        class={`flex-1 rounded-xl h-12 text-xl uppercase bg-default-500 bg-white hover:bg-black hover:text-white ${props.class || ""}`}
        style={props.style}
    >
        {props.children}
    </button>
}

const Block = (props: {
    onclick?: (e: Event) => void
    onmouseup?: (e: MouseEvent) => void
    onmousemove?: (e: MouseEvent) => void
    onmousedown?: (e: MouseEvent) => void
    onwheel?: (e: WheelEvent) => void
    children?: JSXElement[] | JSXElement
    class?: string
    style?: {[key: string]: string}
}) => {
    return <div
        class={`${props.class || ""} flex-1 rounded-xl uppercase`}
        style={props.style}
        onmousedown={props.onmousedown}
        onmousemove={props.onmousemove}
        onmouseup={props.onmouseup}
        onwheel={props.onwheel}
    >
        {props.children}
    </div>
}

const Bar = (props: {onclick?: (e: Event) => void, children?: JSXElement[] | JSXElement, class?: string, style?: {[key: string]: string}}) => 
    <Block class={`${props.class} h-12 items-center justify-center content-center text-xl `} style={props.style}>
        {props.children}
    </Block>

export {Button, Bar, Block};