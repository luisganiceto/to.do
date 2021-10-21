import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/pen/pen.png';

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

interface TasksItemProps {
    item: Task;
    index: number;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, title: string) => void;
}

export function TaskItem({item, index, toggleTaskDone, removeTask, editTask }: TasksItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [titleEditing, setTitleEditing] = useState(item.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditing(true);
    }

    function handleCancelEditing() {
        setIsEditing(false);
    }

    function handleSubmitEditing(id : number, title : string){
        editTask(id, title);
        setIsEditing(false);
    }

    useEffect( () => {
        if (textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [isEditing]);

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${index}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(item.id)}
                >
                    <View 
                        testID={`marker-${index}`}
                        style={item.done === true ? styles.taskMarkerDone : styles.taskMarker} 
                    >
                        { item.done && (
                        <Icon 
                            name="check"
                            size={12}
                            color="#FFF"
                        />
                        )}
                    </View>

                    <TextInput 
                        value={titleEditing}
                        onChangeText={setTitleEditing}
                        editable={isEditing}
                        onSubmitEditing={() => handleSubmitEditing(item.id, item.title)}
                        ref={textInputRef}
                        style={item.done ? styles.taskTextDone : styles.taskText}
                    />                
                </TouchableOpacity>
            </View>

            <View style={ styles.iconsContainer } >
                { isEditing ? (
                    <TouchableOpacity
                        onPress={handleCancelEditing}
                    >
                    <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                    onPress={handleStartEditing}
                    >
                    <Image source={editIcon} />
                    </TouchableOpacity>
                ) }

                <View 
                    style={ styles.iconsDivider }
                />

                <TouchableOpacity
                    testID={`trash-${index}`}
                    style={{ paddingHorizontal: 24 }}
                    onPress={() => removeTask(item.id)}
                >
                    <Image source={trashIcon} />
                </TouchableOpacity>
            </View>
        </>    
    )
}

const styles = StyleSheet.create({
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center' 
        
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: '#C4C4C4'
    }
})