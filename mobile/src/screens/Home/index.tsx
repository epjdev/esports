import { useState, useEffect } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView }from 'react-native-safe-area-context'

import { useNavigation } from '@react-navigation/native'

import logoImg from '../../assets/logo-nlw-esports.png'
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Background } from '../../components/Background';

import { styles } from './styles'

export function Home() {

  const navigation = useNavigation();

  function handleOpenGame({id, title, bannerUrl}: GameCardProps){
    navigation.navigate('game', {id, title, bannerUrl});
  }

  const [games, setGames] = useState<GameCardProps[]>([]);

  useEffect(() => {
    fetch("http://192.168.0.105:3333/games")
    .then(response => response.json())
    .then(data => setGames(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo}/>
          <Heading title="Encontre o seu duo!" subtitle="Selecione o que você deseja jogar:"/>
          <FlatList data={games} keyExtractor={item => item.id} horizontal contentContainerStyle={styles.contentList} renderItem={({item}) => (
            <GameCard data={ item } onPress={() => handleOpenGame(item)}/>
          )}/>
      </SafeAreaView>
    </Background>
  );
}