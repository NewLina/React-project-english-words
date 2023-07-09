import '../WordList/wordList.scss';
import {useState, useEffect} from 'react';
import { deleteWord, editWord } from '../../api/requests';


const Word = (props) => {
    const {id, english, transcription, russian, setGettingAllWords} = props;
    const [isEdited, setIsEdited] = useState(false);
    const [data, setData] = useState({english, transcription, russian, id});
    const [isEmpty, setIsEmpty] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    const [isError, setError] = useState(false);
    
    const onEditFinished=(e)=>{
        if (!e.currentTarget?.value) {
            setDisabled(true);
            setIsEmpty(true);
            return
        } 
        else if (validate(e.currentTarget?.value) === false) {
            setDisabled(true);
        } else {
            setData({...data, [e.currentTarget.name]: e.currentTarget?.value});
            setIsEmpty(false);
            setDisabled(false);
        }
    }

    const validate = (str) => {
        const reg = new RegExp(/^[^0-9]*$/i);
        if (str.match(reg)) {
            setError(false);
            console.log(`Result: ${str}`);
            return true;
        } setError(true); 
        return false;
    }

    const buttonOnChange = (e) => {
        setIsEdited(false);
    }

    const makeEdited = () => {
        setIsEdited(!isEdited);
    }

    const onDeleteClick = () => {
        deleteWord(data.id).then(()=>{
            const random = Math.random()*100;
            setGettingAllWords(random);
        });
    }

    const onEditFinishClick = () =>{
        editWord(data.id, data).then(()=>{
            const random = Math.random()*100;
            setGettingAllWords(random);
        });
    }


    if (isEdited) return (
        <tr id={data.id} className='table__item table__item__edited'>
            <td><input className={isEmpty ? 'empty' : 'full'} type="text" onChange={onEditFinished} defaultValue={data.english} name='english'/></td>
            <td><input className={isEmpty ? 'empty' : 'full'} type="text" onChange={onEditFinished}  defaultValue={data.transcription} name='transcription'/></td>
            <td><input className={isEmpty ? 'empty' : 'full'} type="text" onChange={onEditFinished}  defaultValue={data.russian} name='russian'/></td>
            <td><button disabled = {isDisabled} className={isDisabled? 'button-save disabled-btn':'button-save'} onClick={onEditFinishClick}>Save</button></td>
            <td><button className='button-cancel' onClick={makeEdited}>Cancel</button></td>
            {isError&& <td> <span className='error'>Only letters are available</span></td>}
        </tr>
        
    )
    return (
        <tr className='table__item'>
            <td>{data.english}</td>
            <td>{data.transcription}</td>
            <td>{data.russian}</td>
            <td><button className='button-edit' onClick={makeEdited}>Edit</button></td>
            <td><button onClick={onDeleteClick} className='button-delete'>Delete</button></td>
        </tr>
    );
}
export default Word;