

/**
 * @param {string} pageId  
 */
function showPage(pageId) {
  
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });


  var target = document.getElementById('page-' + pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('.nav-btn').forEach(function(btn) {
    if (btn.dataset.page === pageId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  if (pageId === 'televisions') {
    buildBarChart();
  }
}




var tvData = [
  { label: '32"',  watts: 40  },
  { label: '43"',  watts: 65  },
  { label: '55"',  watts: 95  },
  { label: '65"',  watts: 130 },
  { label: '75"',  watts: 165 },
  { label: '85"',  watts: 210 }
];

var chartRendered = false;


function buildBarChart() {
  if (chartRendered) return;
  chartRendered = true;

  var container = document.getElementById('barChart');
  if (!container) return;

  var maxWatts  = Math.max.apply(null, tvData.map(function(d) { return d.watts; }));
  var chartHeight = 200; // px — usable bar height

  container.innerHTML = '';

  tvData.forEach(function(item, index) {
    var targetHeight = Math.round((item.watts / maxWatts) * chartHeight);


    var col = document.createElement('div');
    col.className = 'bar-col';

   
    var valueEl = document.createElement('div');
    valueEl.className = 'bar-value';
    valueEl.textContent = item.watts + 'W';

    var fill = document.createElement('div');
    fill.className = 'bar-fill';
    fill.style.height = '0px';
    fill.setAttribute('title', item.label + ' TV — ' + item.watts + 'W');

   
    var labelEl = document.createElement('div');
    labelEl.className = 'bar-label';
    labelEl.textContent = item.label;

    col.appendChild(valueEl);
    col.appendChild(fill);
    col.appendChild(labelEl);
    container.appendChild(col);

   
    setTimeout(function() {
      fill.style.transition = 'height 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
      fill.style.height = targetHeight + 'px';
    }, 100 + index * 70);
  });
}


document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && document.activeElement.classList.contains('nav-btn')) {
    document.activeElement.click();
  }
});


(function init() {
  var params = new URLSearchParams(window.location.search);
  var page   = params.get('page');
  var validPages = ['home', 'televisions', 'about'];
  if (validPages.indexOf(page) !== -1) {
    showPage(page);
  }
})();
