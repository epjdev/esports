import { View, TouchableOpacity, Text } from 'react-native';
import { GameController } from 'phosphor-react-native';

import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';
import { THEME } from '../../theme';

export interface DuoCardProps{
		id: string,
		name: string,
		weekDays: string[],
		useVoiceChannel: boolean,
		yearsPlaying: number,
		hoursStart: string,
		hoursEnd: string
}

export interface DuoCardPropsData {
  data: DuoCardProps,
  onConnect: () => void;
}

export function DuoCard({data, onConnect}: DuoCardPropsData) {
  
  
  
  return (
    <View style={styles.container}>

      <DuoInfo label='Nome' value={data.name}/>

      <DuoInfo label='Tempo de jogo' value={`${data.yearsPlaying} ano(s)`}/>

      <DuoInfo label='Disponibilidade' value={`${data.weekDays.length} dia(s) \u2022 ${data.hoursStart} - ${data.hoursEnd}`}/>

      <DuoInfo label='Canal de áudio?' value={data.useVoiceChannel ? "Sim" : "Não"} colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}/>

      <TouchableOpacity style={styles.button} onPress={onConnect}>
        <GameController color={THEME.COLORS.TEXT} size={20}/>
        <Text style={styles.buttonTitle}>Conectar</Text>
      </TouchableOpacity>

    </View>
  );
}