import { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getAllUserNotes,
  updateUserNote,
  logout,
  createUserNote,
} from "../actions";
import Modal from './Modal'

const Dashboard = ({
  getAllUserNotes,
  userNotes,
  updateUserNote,
	createUserNote,
	logout,
  history,
}) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
	const [show, setShow] = useState(false)
  const [notes, setNotes] = useState([]);
  const [viewNote, setViewNote] = useState({});
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    getAllUserNotes();
  }, [getAllUserNotes]);

  useEffect(() => {
    setNotes(userNotes);
  }, [userNotes]);

  const handleUpdate = (event, noteId) => {
    event.preventDefault();
    const obj = {
      title,
      text,
    };
		updateUserNote(noteId, obj);
		history.push('/')
    setEdit(false);
  };
  
  const handleNoteClick = (note) => {
    setViewNote(note);
    setEdit(false);
    setTitle(note.title);
    setText(note.text);
  };

  const Logout = () => {
    logout();
    history.push("/");
	};
  return (
    <div className="container">
      <div className="auth-handler">
        <i className="fas fa-sign-out-alt" onClick={Logout}></i>
      </div>
      <div className="home-intro">
        <div className="add-note">
          <i class="fas fa-folder-plus" onClick={() => setShow(!show)}></i>
          {/* <button onClick={() => setShow(!show)}>add note</button> */}
        </div>
        {notes.length > 0 ? (
          notes.map((note, index) => {
            return (
              <div
                className="note-list"
                key={index}
                onClick={() => handleNoteClick(note)}>
                <h4>{note.title}</h4>
                <p>{note.text}</p>
              </div>
            );
          })
        ) : (
          <div>You have not available notes</div>
        )}
      </div>
      <div className="single-note">
        <Modal
          show={show}
          handleClose={setShow}
          createUserNote={createUserNote}
          history={history}
        />
        <div className="single-note-header">
          <div></div>
          {viewNote.title && (
            <div>
              <i
                className={edit ? "fas fa-close" : "fas fa-edit"}
                onClick={() => setEdit(!edit)}></i>
            </div>
          )}
        </div>
        {edit === true ? (
          <div className="single-note-wrapper">
            <div>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={viewNote.title}
              />
            </div>
            <div>
              <textarea
                onChange={(e) => setText(e.target.value)}
                defaultValue={viewNote.text}
                cols="30"
                rows="10"></textarea>
            </div>
            <div>
              <button onClick={(e) => handleUpdate(e, viewNote._id)}>
                update
              </button>
            </div>
          </div>
        ) : (
          <div className="single-note-wrapper">
            <h4>{viewNote.title}</h4>
            <p>{viewNote.text}</p>
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  const userNotes = state.notes.notes || [];
  return { userNotes };
};

export default connect(mapStateToProps, {
  getAllUserNotes,
	updateUserNote,
	createUserNote,
  logout,
})(Dashboard);
