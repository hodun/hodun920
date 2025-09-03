document.addEventListener('DOMContentLoaded', () => {
  let lastScroll = 0;
  const header = document.querySelector('.header');
  const sidebar = document.querySelector('.sidebar');
  const navToggle = document.querySelector('.nav-toggle');
  let collapsed = false;

  function handleScroll() {
    const current = window.pageYOffset || document.documentElement.scrollTop;
    if (current > lastScroll) {
      header.classList.add('hide');
      if (!collapsed) sidebar.classList.add('hide');
    } else {
      header.classList.remove('hide');
      if (!collapsed) sidebar.classList.remove('hide');
    }
    lastScroll = current <= 0 ? 0 : current;
  }

  function toggleSidebar() {
    collapsed = !collapsed;
    sidebar.classList.toggle('collapsed');
    document.body.classList.toggle('sidebar-collapsed', collapsed);
    if (!collapsed) sidebar.classList.remove('hide');
  }

  window.addEventListener('scroll', handleScroll);
  navToggle.addEventListener('click', toggleSidebar);

  // load article content if on article page
  const container = document.getElementById('article-content');
  if (container && typeof ARTICLES !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const data = ARTICLES[id];
    if (data) {
      let html = `<h1>${data.title}</h1>`;
      html += `<img class="article-image" src="${data.image}" alt="${data.title}">`;
      data.paragraphs.forEach(p => {
        html += `<p>${p}</p>`;
      });
      container.innerHTML = html;
    } else {
      container.innerHTML = '<p>자료를 찾을 수 없습니다.</p>';
    }
  }
});
