
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
    // AUTOS DATA
    const autos = [
      {titulo: "Fiat Cronos", precio: "$8.200.000", img: "https://cronos.fiat.com.ar//asset/versoes/like/negro.png"},
      {titulo: "Renault Kwid", precio: "$7.900.000", img: "https://tormonline.com.ar/contenido/vehiculos/renault-kwid-electrico-transparente.png"},
      {titulo: "Fiat Mobi", precio: "$6.800.000", img: "https://mobi.fiat.com.ar/images/Versions/trekking/000000.webp"},
      {titulo: "Peugeot 208", precio: "$9.400.000", img: "https://peugeotgiama.com.ar/wp-content/uploads/2023/04/BlueQuasar-450x250-1.png"},
      {titulo: "Chevrolet Onix", precio: "$8.600.000", img: "https://www.chevroletmegui.com.ar/content/dam/chevrolet/sa/ar/es/master/home/cars/onix/onix-2026/warranty-box/onix-wb.png?imwidth=1920"},
      {titulo: "Volkswagen Gol", precio: "$7.100.000", img: "https://www.planx5.com/web/sites/default/files/publico/styles/autos_usados_detalle/public/PRD/nuevo-gol.png?itok=FQ6iT_3Q"},
      {titulo: "Toyota Yaris", precio: "$9.900.000", img: "https://media.toyota.com.ar/91383439-f8b6-4536-a15c-532487e2c86d.png"},
      {titulo: "Ford Ka", precio: "$8.000.000", img: "https://www.ford.com.ar/content/ford/ar/es_ar/home/posventa/mantenimiento-garantia/ka/nuevo-ka/jcr:content/par/billboard/imageComponent/image.imgs.full.high.png"},
      {titulo: "Honda Fit", precio: "$10.300.000", img: "https://www.pngplay.com/wp-content/uploads/13/Honda-Fit-PNG-Images-HD.png"},
      {titulo: "Suzuki Swift", precio: "$9.700.000", img: "https://suzuki-lm.com.mx/assets/images/products/swift-sport/swift-sport.png"},
      {titulo: "Nissan March", precio: "$8.900.000", img: "https://cactuscar.com/wp-content/uploads/2025/09/cactus-nissan-march.png"},
      {titulo: "Citroën C3", precio: "$9.200.000", img: "https://citroenmarseille.com.ar/wp-content/uploads/2021/10/FEEL-PACK_SPRING_BLUE_BITONO_BLANCO.png"},
      {titulo: "Hyundai HB20", precio: "$10.200.000", img: "https://www.nachoinciarte.com/wp-content/uploads/2018/11/HB20-1.png"},
      {titulo: "Kia Rio", precio: "$8.850.000", img: "https://www.pngplay.com/wp-content/uploads/13/Kia-Rio-Transparent-Images.png"},
      {titulo: "Volkswagen Polo", precio: "$9.500.000", img: "https://www.greenncap.com/wp-content/uploads/VW-Polo_2020_0024-478x320.png"},
      {titulo: "Peugeot 301", precio: "$10.700.000", img: "https://www.monzarentacar.com/wp-content/uploads/2018/09/peugeot-301-automatic.png"},
    ];
    // RENDER CARDS
    const cardsDiv = document.getElementById('cardsContainer');
    autos.forEach((auto, idx) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${auto.img}" alt="${auto.titulo}" class="card-img">
        <div class="card-title">${auto.titulo}</div>
        <div class="card-price">${auto.precio}</div>
        <button class="btn-comprar">Comprar</button>
      `;
      cardsDiv.appendChild(card);
    });
    // Carrito de compras básico
    document.querySelectorAll('.btn-comprar').forEach(btn => {
      btn.addEventListener('click', function(e){
        e.preventDefault();
        mostrarError();
      });
    });
    function mostrarError(){
      document.getElementById('modalError').style.display = 'flex';
    }
    function cerrarError(){
      document.getElementById('modalError').style.display = 'none';
    }
    // Permitir cerrar modal con ESC
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') cerrarError();
    });