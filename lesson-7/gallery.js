  // JS Gallery
  const imgOptions = {
      threshold: 1,
      rootmargin: "0px 0px -300px 0px"
  };

  const imgObserver = new IntersectionObserver((entries, imgObserver) => {
      entries.forEach(entry => {
          if (!entry.isIntersecting) {
              return;
          } else {
              preloadImage(entry.target);
              imgObserver.unobserve(entry.target);
          }
      })
  }, imgOptions)

  let imagesToLoad = document.querySelectorAll('img[data-src]');
  const loadImages = (image) => {
      image.setAttribute('src', image.getAttribute('data-src'));
      image.onload = () => {
          image.removeAttribute('data-src');
      };
  };

  if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((items, observer) => {
          items.forEach((item) => {
              if (item.isIntersecting) {
                  loadImages(item.target);
                  observer.unobserve(item.target);
              }
          });
      });
      imagesToLoad.forEach((img) => {
          observer.observe(img);
      });
  } else {
      imagesToLoad.forEach((img) => {
          loadImages(img);
      });
  }


  // Font 
  WebFont.load({
      google: {
          families: ['Work Sans', 'Neuton', 'Asul']
      }
  });

  // Date for the footer
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let lastModifiedDate = new Date(document.lastModified);
  let result = `${weekdays[lastModifiedDate.getDay()]}, ${lastModifiedDate.getDate()} ${months[lastModifiedDate.getMonth()]} ${lastModifiedDate.getFullYear()}`;
  document.getElementById('lastUpdate').innerHTML = result;


  // Toggle nav 
  function toggle() {
      document.getElementById('nav-menu').classList.toggle('hide');
  }

  // Friday banner
  const currentDate = new Date();
  let today = currentDate.getDay();
  let element = document.getElementById('friday-banner');
  if (today == 5) {
      element.style.display = "block";
  }