const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sideMenu = document.getElementById('sideMenu');
    const closeSideMenu = document.getElementById('closeSideMenu');
    hamburgerBtn.addEventListener('click', () => {
      sideMenu.classList.add('open');
    });
    closeSideMenu.addEventListener('click', () => {
      sideMenu.classList.remove('open');
    });

    document.addEventListener('click', (e) => {
      if (!sideMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
        sideMenu.classList.remove('open');
      }
    });

    sideMenu.addEventListener('wheel', (e) => { e.stopPropagation(); });




  document.getElementById('btnMotor').addEventListener('click', function(e) {
    e.preventDefault();
    var audio = document.getElementById('audioMotor');
    audio.currentTime = 0;
    audio.play();
  });