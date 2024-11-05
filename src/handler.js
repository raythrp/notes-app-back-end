const { nanoid } = require('nanoid');
const notes = require('./notes.js');

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    noteId: id,
    title: title,
    tags: tags,
    body: body,
    createdAt: createdAt,
    updatedAt: updatedAt
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id);

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Note added',
      data: {
        noteId: id,
        title: title,
        tags: tags,
        body: body,
        createdAt: createdAt,
        updatedAt: updatedAt
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Note is not added'
  });
  response.code(500);
  return response;
};

const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes
  }
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((note) => note.noteId === id);

  if (note.length === 1) {
    return {
      status: 'success',
      data: {
        note
      }
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Note not found'
  });
  response.code(404);
  return response;
};

const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.noteId === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title: title,
      tags: tags,
      body: body,
      updatedAt: updatedAt
    };

    const response = h.response({
      status: 'success',
      message: `Note with ID: ${id} updated`,
      data: {
        title: title,
        tags: tags,
        body: body,
        updatedAt: updatedAt
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: `Note with ID: ${id} is not found`,
  });
  response.code(404);
  return response;
};

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.noteId === id);

  if (index !== -1) {
    let deletedNote = notes[index];
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Note deleted',
      deletedData: {
        noteId: id,
        title: deletedNote.title,
        tags: deletedNote.tags,
        body: deletedNote.body,
      }
    });
    response.code(200);
    deletedNote = '';
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: `Note with ID: ${id} is not found`,
  });
  response.code(404);
  return response;
};

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler };