import { useState, useEffect } from "react";


const Modal = ({ handleClose, show, createUserNote, history }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const [btnDisabled, setBtnDisabled] = useState(true);

    useEffect(() => {
      if (title.trim() && text.trim()) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }
    }, [title, text]);
  const handleCreate = (event) => {
      event.preventDefault();
      const obj = {
          title, text
      }
      createUserNote(obj);
      history.push('/')
  };
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div>
          <input
            type="text"
            placeholder="Enter title here"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Enter the body of the note here"
            cols="30"
            rows="10"
            onChange={(e) => setText(e.target.value)}></textarea>
        </div>
        <div className="cta btn">
          <button onClick={handleCreate} disabled={btnDisabled}>
            Add Note
          </button>
          <button type="button" onClick={() => handleClose(!show)}>
            Close
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
