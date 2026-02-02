// app.js — Minimal notes app using localStorage
const NOTES_KEY = 'uzbek_notes_v1';

function loadNotes(){
  try{return JSON.parse(localStorage.getItem(NOTES_KEY)) || []}catch(e){return []}
}
function saveNotes(notes){localStorage.setItem(NOTES_KEY, JSON.stringify(notes))}

function renderNotes(){
  const notes = loadNotes();
  const container = document.getElementById('notes');
  container.innerHTML = '';
  if(!notes.length){
    container.innerHTML = `<div class="col-12"><div class="alert alert-secondary">No notes yet. Click "New Note" to add one.</div></div>`;
    return;
  }
  notes.forEach((n, i)=>{
    const col = document.createElement('div');
    col.className = 'col-sm-6 col-lg-4';
    col.innerHTML = `
      <div class="card note-card">
        <div class="card-body">
          <h5 class="card-title">${escapeHtml(n.title || 'Untitled')}</h5>
          <p class="card-text note-body">${escapeHtml(n.content || '')}</p>
          <div class="d-flex justify-content-between align-items-center mt-3">
            <small class="text-muted">${new Date(n.created).toLocaleString()}</small>
            <div>
              <button class="btn btn-sm btn-outline-danger me-2" data-action="delete" data-index="${i}">Delete</button>
            </div>
          </div>
        </div>
      </div>`;
    container.appendChild(col);
  })
}

function escapeHtml(str){
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Event wiring
document.addEventListener('DOMContentLoaded', ()=>{
  renderNotes();

  const newBtn = document.getElementById('new-note-btn');
  const modalEl = document.getElementById('noteModal');
  const noteForm = document.getElementById('note-form');
  const notesContainer = document.getElementById('notes');

  const modal = new bootstrap.Modal(modalEl);

  newBtn.addEventListener('click', ()=>{
    noteForm.reset();
    modal.show();
  });

  noteForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const title = noteForm.querySelector('#note-title').value.trim();
    const content = noteForm.querySelector('#note-content').value.trim();
    const notes = loadNotes();
    notes.unshift({title, content, created: Date.now()});
    saveNotes(notes);
    modal.hide();
    renderNotes();
  });

  notesContainer.addEventListener('click', (e)=>{
    const btn = e.target.closest('button[data-action]');
    if(!btn) return;
    const idx = Number(btn.getAttribute('data-index'));
    if(btn.getAttribute('data-action') === 'delete'){
      const notes = loadNotes();
      notes.splice(idx,1);
      saveNotes(notes);
      renderNotes();
    }
  });
});
