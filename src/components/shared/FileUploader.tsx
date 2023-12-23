import { Dispatch, SetStateAction } from "react"


type FileUploaderProps = {
    imageUrl:string,
    onFieldChange: (value:string)=>void,
    setFiles: Dispatch<SetStateAction<File[]>>,
}

export default function FileUploader({onFieldChange, imageUrl, setFiles}: FileUploaderProps){

    return(
        <></>
    )
}
