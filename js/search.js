// search.js — simple client-side filter for sections
document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('search');
  if (!input) return;
  const items = Array.from(document.querySelectorAll('#notes .note-section'));

  function normalize(s){return (s||'').toLowerCase();}

  function filter(){
    const q = normalize(input.value.trim());
    if (!q){
      items.forEach(it => { it.style.display = ''; if(it.querySelector('details')) it.querySelector('details').open = false; });
      return;
    }

    let firstShown = null;
    items.forEach(it => {
      const titleEl = it.querySelector('.note-summary');
      const contentEl = it.querySelector('.note-content');
      const title = normalize(titleEl ? titleEl.textContent : '');
      const body = normalize(contentEl ? contentEl.textContent : '');
      const match = title.includes(q) || body.includes(q);
      it.style.display = match ? '' : 'none';
      const details = it.querySelector('details');
      if(match && details){ details.open = true; if(!firstShown) firstShown = details; }
    });
    // optionally open first match (already done) and focus search input kept as-is
  }

  input.addEventListener('input', filter);
  input.addEventListener('keydown', (e)=>{ if (e.key === 'Escape'){ input.value=''; filter(); } });
});
