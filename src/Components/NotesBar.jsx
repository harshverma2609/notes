
// import React, { useState, useEffect } from "react";
// import Note from "./Note";
// import CreateArea from "./CreateArea";
// import ProgressBar from "./ProgressBar";

// function NotesBar({ searchTerm }) {
//   const [notes, setNotes] = useState([]);
//   const [showCreateArea, setShowCreateArea] = useState(false);
//   const [filter, setFilter] = useState("All");
//   const [completedCount, setCompletedCount] = useState(0);

//   const [activeButton, setActiveButton] = useState("All");
//   const handleButtonClick = (buttonName) => {
//     setActiveButton(buttonName);
//     setFilter(buttonName);
//   };

//   useEffect(() => {
//     const initialNotes = [
//       {
//         id: 1,
//         title: "Sample Note 1",
//         content: "Content of sample note 1",
//         category: "Home",
//         completed: false,
//       },
//       {
//         id: 2,
//         title: "Sample Note 2",
//         content: "Content of sample note 2",
//         category: "Work",
//         completed: false,
//       },
//       {
//         id: 3,
//         title: "Sample Note 3",
//         content: "Content of sample note 3",
//         category: "Personal",
//         completed: false,
//       },
//     ];
//     setNotes(initialNotes);
//   }, []);

//   function addNote(newNote) {
//     setNotes((prevNotes) => [...prevNotes, { ...newNote, completed: false }]);
//     setShowCreateArea(false);
//   }

//   function deleteNote(id) {
//     setNotes((prevNotes) => {
//       const newNotes = prevNotes.filter((noteItem, index) => index !== id);
//       setCompletedCount(newNotes.filter((note) => note.completed).length);
//       return newNotes;
//     });
//   }

//   function toggleComplete(id) {
//     setNotes((prevNotes) => {
//       const updatedNotes = prevNotes.map((note, index) => {
//         if (index === id) {
//           return { ...note, completed: !note.completed };
//         }
//         return note;
//       });
//       setCompletedCount(updatedNotes.filter((note) => note.completed).length);
//       return updatedNotes;
//     });
//   }

//   function closeModal() {
//     setShowCreateArea(false);
//   }

//   const filteredNotes = notes.filter((note) => {
//     if (filter !== "All" && note.category !== filter) {
//       return false;
//     }
//     if (searchTerm.trim() === "") {
//       return true;
//     }
//     return (
//       note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       note.content.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   });

//   const progress = notes.length > 0 ? (completedCount / notes.length) * 100 : 0;

//   return (
//     <div className="notesBar" id="notesBar">
//       <div className="notesBarButton">
//         <button
//           id="AllButton"
//           type="button"
//           className={activeButton === "All" ? "active" : ""}
//           onClick={() => handleButtonClick("All")}
//         >
//           All
//         </button>
//         <button
//           id="HomeButton"
//           type="button"
//           className={activeButton === "Home" ? "active" : ""}
//           onClick={() => handleButtonClick("Home")}
//         >
//           Home
//         </button>
//         <button
//           id="WorkButton"
//           type="button"
//           className={activeButton === "Work" ? "active" : ""}
//           onClick={() => handleButtonClick("Work")}
//         >
//           Work
//         </button>
//         <button
//           id="PersonalButton"
//           type="button"
//           className={activeButton === "Personal" ? "active" : ""}
//           onClick={() => handleButtonClick("Personal")}
//         >
//           Personal
//         </button>
//         <div id="space"></div>
//         <button
//           id="AddButton"
//           type="button"
//           onClick={() => setShowCreateArea(true)}
//         >
//           Add Note
//         </button>
//       </div>

//       <div className="notesCounter" id="notesCounter">
//         <p>
//           You have completed {completedCount}/{notes.length} notes
//         </p>
//         <ProgressBar value={progress} />
//       </div>

//       {showCreateArea && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={closeModal}>
//               &times;
//             </span>
//             <CreateArea onAdd={addNote} />
//           </div>
//         </div>
//       )}

//       <div className="notesPreview" id="notesPreview">
//         {filteredNotes.map((noteItem, index) => (
//           <Note
//             key={index}
//             id={index}
//             title={noteItem.title}
//             content={noteItem.content}
//             category={noteItem.category}
//             completed={noteItem.completed}
//             onDelete={deleteNote}
//             onToggleComplete={toggleComplete}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default NotesBar;

import React, { useState, useEffect } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";
import ProgressBar from "./ProgressBar";

function NotesBar({ searchTerm }) {
  const [notes, setNotes] = useState([]);
  const [showCreateArea, setShowCreateArea] = useState(false);
  const [filter, setFilter] = useState("All");
  const [completedCount, setCompletedCount] = useState(0);

  const [activeButton, setActiveButton] = useState("All");
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setFilter(buttonName);
  };

  // Load notes from local storage when the component mounts
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes"));
    if (storedNotes && storedNotes.length > 0) {
      setNotes(storedNotes);
      setCompletedCount(storedNotes.filter((note) => note.completed).length);
    } else {
      // If no notes are stored, initialize with sample notes
      const initialNotes = [
        {
          id: 1,
          title: "Sample Note 1",
          content: "Content of sample note 1",
          category: "Home",
          completed: false,
        },
        {
          id: 2,
          title: "Sample Note 2",
          content: "Content of sample note 2",
          category: "Work",
          completed: false,
        },
        {
          id: 3,
          title: "Sample Note 3",
          content: "Content of sample note 3",
          category: "Personal",
          completed: false,
        },
      ];
      setNotes(initialNotes);
    }
  }, []);

  // Update local storage whenever notes change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote(newNote) {
    setNotes((prevNotes) => [...prevNotes, { ...newNote, completed: false }]);
    setShowCreateArea(false);
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      const newNotes = prevNotes.filter((noteItem, index) => index !== id);
      setCompletedCount(newNotes.filter((note) => note.completed).length);
      return newNotes;
    });
  }

  function toggleComplete(id) {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note, index) => {
        if (index === id) {
          return { ...note, completed: !note.completed };
        }
        return note;
      });
      setCompletedCount(updatedNotes.filter((note) => note.completed).length);
      return updatedNotes;
    });
  }

  function closeModal() {
    setShowCreateArea(false);
  }

  const filteredNotes = notes.filter((note) => {
    if (filter !== "All" && note.category !== filter) {
      return false;
    }
    if (searchTerm.trim() === "") {
      return true;
    }
    return (
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const progress = notes.length > 0 ? (completedCount / notes.length) * 100 : 0;

  return (
    <div className="notesBar" id="notesBar">
      <div className="notesBarButton">
        <button
          id="AllButton"
          type="button"
          className={activeButton === "All" ? "active" : ""}
          onClick={() => handleButtonClick("All")}
        >
          All
        </button>
        <button
          id="HomeButton"
          type="button"
          className={activeButton === "Home" ? "active" : ""}
          onClick={() => handleButtonClick("Home")}
        >
          Home
        </button>
        <button
          id="WorkButton"
          type="button"
          className={activeButton === "Work" ? "active" : ""}
          onClick={() => handleButtonClick("Work")}
        >
          Work
        </button>
        <button
          id="PersonalButton"
          type="button"
          className={activeButton === "Personal" ? "active" : ""}
          onClick={() => handleButtonClick("Personal")}
        >
          Personal
        </button>
        <div id="space"></div>
        <button
          id="AddButton"
          type="button"
          onClick={() => setShowCreateArea(true)}
        >
          Add Note
        </button>
      </div>

      <div className="notesCounter" id="notesCounter">
        <p>
          You have completed {completedCount}/{notes.length} notes
        </p>
        <ProgressBar value={progress} />
      </div>

      {showCreateArea && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <CreateArea onAdd={addNote} />
          </div>
        </div>
      )}

      <div className="notesPreview" id="notesPreview">
        {filteredNotes.map((noteItem, index) => (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            category={noteItem.category}
            completed={noteItem.completed}
            onDelete={deleteNote}
            onToggleComplete={toggleComplete}
          />
        ))}
      </div>
    </div>
  );
}

export default NotesBar;
