import { useState, useEffect } from 'react'
import axios from 'axios'

import * as Dialog from '@radix-ui/react-dialog'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'


import './styles/main.css'

import img_logo from './assets/logo-nlw-esports.svg'

import { CreateAdModal } from './components/CreateAdModal'

interface Game {
  id: string,
  title: string,
  bannerUrl: string,
  _count: {
    ads: number
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => { axios('http://localhost:3333/games').then(response => { setGames(response.data)}) }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={img_logo} alt=""/>

      <h1 className="text-5xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui
      </h1>

      <div className="grid grid-cols-6 gap-4 mt-16">
        {games.map(game => {
          return <GameBanner key={game.id} bannerUrl={game.bannerUrl} adsCount={game._count.ads} title={game.title}/>
        })}
      </div>

      <div className="pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden">
        <Dialog.Root>
          <CreateAdBanner/>

          <CreateAdModal/>
        </Dialog.Root>
      </div>
    </div>
  )
}

export default App
