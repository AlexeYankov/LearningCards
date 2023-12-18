import {ChangeEvent} from "react";

type Props = {
    event: ChangeEvent<HTMLInputElement>,
    setValue: any
    setSelectedImage: (imageUrl: string) => void,
    inputName: string
};

export const handleFileChange = ({ setSelectedImage, setValue, inputName,event}: Props) => {
    const file = event.target.files?.[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        setValue(inputName, [file]);
    } else {
        setSelectedImage('');
        setValue(inputName, []);
    }
};


