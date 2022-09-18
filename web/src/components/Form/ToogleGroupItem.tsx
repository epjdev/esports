import * as ToogleGroup from "@radix-ui/react-toggle-group";

interface ToogleGroupItem {
    title: string,
    value: string,
    text: string,
    weekDays: string[]
}

export function ToogleGroupItem(props: ToogleGroupItem){
    return (
        <ToogleGroup.Item value={props.value} title="Domingo" className={`w-5 h-[46px] rounded bg-zinc-900 hover:bg-zinc-700 ${props.weekDays.includes(props.value) ? ' bg-violet-500' : ''}`}>
            {props.text}
        </ToogleGroup.Item>
    )
}