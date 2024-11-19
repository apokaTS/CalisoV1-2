import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { CardTypes } from '../../utils/types/components';
import Icon from 'react-native-vector-icons/FontAwesome';
import Checkbox from '../CheckBox/CheckBox';



const CardTask = ({ title, startTask, limitTask, statusCard, task = [{ id: 0, desc: 'Tarea Default' }, { id: 1, desc: 'Tarea Default 2' }], onPress }: CardTypes) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.mainContainer}>
            <View style={styles.basicContainer}>
                <Text style={styles.titleCard}>{title}</Text>
                <View style={[styles.statusIndicator, { backgroundColor: statusCard }]} />
            </View>
            <View style={styles.basicViewColumn}>
                {task.map((item, index) => (
                    <View key={index} style={styles.viewListElement}>
                        <Text style={styles.textDots}>{'• '}</Text>
                        <Text style={styles.textFormat}>{item.desc}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.basicContainer}>
                <View style={[styles.basicViewColumn, styles.centerView]}>
                    <View style={styles.viewListElement}>
                        <Icon name="clock-o" color={'#000'} size={24} />
                        <Text style={styles.textSemiBold}>{' Iniciada:'}</Text>
                    </View>
                    <Text style={styles.textDate}>
                        {startTask}
                    </Text>
                </View>
                <View style={[styles.basicViewColumn, styles.centerView]}>
                    <View style={styles.viewListElement}>
                        <Icon name="clock-o" color={'#000'} size={24} />
                        <Text style={styles.textSemiBold}>{' Vence:'}</Text>
                    </View>
                    <Text style={styles.textDate}>
                        {limitTask}
                    </Text>
                </View>
                <View style={[styles.basicViewColumn, styles.centerView]}>
                    <Text style={styles.textSemiBold}>{'Finalizar'}</Text>
                    <Checkbox />
                </View>
            </View>
        </TouchableOpacity >
    );
};

export default CardTask;

const { width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    mainContainer: {
        width: width * 0.9,
        marginTop: 10,
        backgroundColor: '#FFF',
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        elevation: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    titleCard: {
        color: '#000',
        fontSize: 28,
        fontWeight: '600',
    },
    centerView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    textFormat: {
        color: '#000',
        fontSize: 18,
        fontWeight: '400',
    },
    textSemiBold: {
        color: '#000',
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 8,
    },
    textDots: {
        fontSize: 20,
        color: '#000',
        fontWeight: '500',
    },
    textDate: {
        fontSize: 14,
        color: '#000',
        fontWeight: '400',
    },
    basicContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        marginVertical: 4,
    },
    basicViewColumn: {
        flexDirection: 'column',
        marginBottom: 15,
    },
    statusIndicator: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    viewListElement: {
        flexDirection: 'row',
    },
});
