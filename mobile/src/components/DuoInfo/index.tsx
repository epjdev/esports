import { Text, View, ColorValue } from 'react-native';

import { styles } from './styles';

interface DuoInfoProps {
    label: string;
    value: string;
    colorValue?: ColorValue;
}

export function DuoInfo(props: DuoInfoProps) {
  return (
    <View style={styles.container}>
        <Text style={styles.label}>
            {props.label}
        </Text>
        <Text style={[styles.value, { color: props.colorValue}]} numberOfLines={1}>
            {props.value}
        </Text>
    </View>
  );
}