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

// type PropsSubmit = {
//     handleSubmit:any
//     questionImg:any
//     answerImg:any
//     question:string
//     answer:string
//     handleCloseModal:any
//     setError:any
//     card:any
// }
// export const myform =({handleSubmit,answerImg,questionImg,question,answer,handleCloseModal,setError,card}:PropsSubmit)=>{
//     const [updateCard] = useUpdateCardMutation()
//     handleSubmit((data:Form) => {
//         const form = new FormData()
//         if (data.questionImg && data.questionImg.length > 0) {
//             form.append(questionImg, data.questionImg[0])
//             form.append(answerImg, data.questionImg[0])
//         }
//         form.append(question, data.question)
//         form.append(answer, data.answer)
//         if (
//             (data.answer.trim() !== '' && data.answer.length >= 3) ||
//             (data.question.trim() !== '' && data.question.length >= 3)
//         ) {
//             updateCard({
//                 id: card.id,
//                 form
//             })
//             handleCloseModal()
//         } else {
//             setError('question', {message: 'String must contain at least 3 character(s)'})
//             setError('answer', {message: 'String must contain at least 3 character(s)'})
//         }
//     })
// }
//

