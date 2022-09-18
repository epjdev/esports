import { useEffect, useState, FormEvent} from "react";
import { Check, GameController } from "phosphor-react";
import axios from "axios";

import * as Dialog from "@radix-ui/react-dialog";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as ToogleGroup from "@radix-ui/react-toggle-group";

import { Input } from "./Form/Input";
import { ToogleGroupItem } from "./Form/ToogleGroupItem";

interface Game {
    id: string,
    title: string,
    bannerUrl: string,
    _count: {
      ads: number
    }
}

export function  CreateAdModal(){

    const [games, setGames] = useState<Game[]>([]);
    const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
    const [weekDays, setWeekDays] = useState<string[]>([]);

    useEffect(() => { axios('http://localhost:3333/games').then(response => { setGames(response.data)}) }, [])

    async function handleCreateAd(event: FormEvent){
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        
        if (!data.name || !data.yearsPlaying || !data.discord || weekDays.length === 0 || !data.hourStart || !data.hourEnd){
            alert("Por favor preencha todos os campos.")
            return;
        }

        try {
            axios.post(`http://localhost:3333/games/${data.game}/ad`, {
                "name": data.name,
                "yearsPlaying": Number(data.yearsPlaying),
                "discord": data.discord,
                "weekDays": weekDays.map(Number),
                "hoursStart": data.hourStart,
                "hoursEnd": data.hourEnd,
                "useVoiceChannel": useVoiceChannel
            })

            alert("Anúncio criado com sucesso!")
        } catch (err) {
            console.log(err);
            alert('Ocorreu uma falha ao criar anúnico.');
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/50">
              <Dialog.Title className="text-3xl text-white font-black">Publique um anúncio:</Dialog.Title>
              <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">

                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">Qual o game?</label>
                  <select id="game" name="game" className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none" defaultValue="">
                    <option disabled>Selecione o game que deseja jogar</option>
                    {games.map(game => { return <option key={game.id} value={game.id}>{game.title}</option> })}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Qual seu nome/nickname?</label>
                  <Input id="name" name="name" placeholder="Como te chamam dentro do game?"/>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                    <Input id="yearsPlaying" name="yearsPlaying" placeholder="Tudo bem ser ZER0"/>
                  </div>

                  <div className="flex flex-col gap-2"> 
                    <label htmlFor="discord">Qual o seu discord?</label>
                    <Input id="discord" name="discord" placeholder="discord#0000"/>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                    <ToogleGroup.Root type="multiple" className="flex gap-2" onValueChange={setWeekDays} value={weekDays}>
                        <ToogleGroupItem value="0" title="Domingo" weekDays={weekDays} text="D"/>
                        <ToogleGroupItem value="1" title="Segunda" weekDays={weekDays} text="S"/>
                        <ToogleGroupItem value="2" title="Terça" weekDays={weekDays} text="T"/>
                        <ToogleGroupItem value="3" title="Quarta" weekDays={weekDays} text="Q"/>
                        <ToogleGroupItem value="4" title="Quinta" weekDays={weekDays} text="Q"/>
                        <ToogleGroupItem value="5" title="Sexta" weekDays={weekDays} text="S"/>
                        <ToogleGroupItem value="6" title="Sábado" weekDays={weekDays} text="S"/>
                    </ToogleGroup.Root>
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart">Qual o horário do dia?</label>
                    <div className="grid grid-cols-2 gap-3">
                      <Input id="hourStart" name="hourStart" type="time" placeholder="De"/>
                      <Input id="hourEnd" name="hourEnd" type="time" placeholder="Até"/>
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm">
                    <Checkbox.Root className="w-6 h-6 rounded p-1 bg-zinc-900" checked={useVoiceChannel} onCheckedChange={(checked) => { checked === true ? setUseVoiceChannel(true) : setUseVoiceChannel(false)}}>
                        <Checkbox.Indicator><Check className="w-4 h-4 text-emerald-400"/></Checkbox.Indicator>
                    </Checkbox.Root> Costumo me conectar ao chat de voz
                </div>

                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">Cancelar</Dialog.Close>
                  <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"><GameController size="24px"/> Encontrar </button>
                </footer>

              </form>
            </Dialog.Content>
          </Dialog.Portal>
    )
}