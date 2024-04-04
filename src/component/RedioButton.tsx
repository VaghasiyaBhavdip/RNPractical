import React, { useEffect, useMemo, useState } from 'react';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
type RedioProps = {
    onChangeRedio: (val: any) => void
};
const RedioButton: React.FC<RedioProps> = ({ onChangeRedio = (val: any) => { } }) => {

    const radioButtons: RadioButtonProps[] = useMemo(() => ([
        {
            id: '1', // acts as primary key, should be unique and non-empty string
            label: 'Male',
            value: 'Male'
        },
        {
            id: '2',
            label: 'Female',
            value: 'Female'
        },
        {
            id: '3',
            label: 'Other',
            value: 'Other'
        }
    ]), []);

    const [selectedId, setSelectedId] = useState<string | undefined>();
    useEffect(() => {
        let selected = radioButtons?.filter((v) => v?.id == selectedId)
        onChangeRedio(selected)
    }, [selectedId])
    return (
        <RadioGroup
            containerStyle={{ flexDirection: "row", }}
            labelStyle={{color:'black'}}
            radioButtons={radioButtons}
            onPress={(e) => { setSelectedId(e) }}
            selectedId={selectedId}
        />
    );

}
export default RedioButton