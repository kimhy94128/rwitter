import { dbService } from 'fBase';
import React, { useState } from 'react';

const Rweet = ({ rweetObj, isOwner }) => {
  const [ editing, setEditing ] = useState(false);
  const [ newRweet, setNewRweet ] = useState(rweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("정말 삭제 하시겠습니까?")
    console.log(ok);
    if(ok){
      await dbService.doc(`rweets/${rweetObj.id}`).delete();
    }
  }
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`rweets/${rweetObj.id}`).update({text: newRweet});
    setEditing(false);
  }
  const onChange = (event) => {
    const { target: {value}} = event;
    setNewRweet(value);
  }
  return (
    <div>
      { editing ? ( 
          <>
          { isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input type="text" placeholder="Edit your Rweet" value={ newRweet } onChange={onChange} required />
                <input type="submit" value="수정" />
              </form>
              <button onClick={toggleEditing}>취소</button> 
            </>
            )}
          </>
        ) : (
        <>
          <h4>{ rweetObj.text }</h4>
          {isOwner && ( 
            <>
              <button onClick={onDeleteClick}>삭제</button>
              <button onClick={toggleEditing}>수정</button>
            </>
          )}
        </>
        )}
    </div>
  )
}

export default Rweet;