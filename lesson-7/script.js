const imgOptions = {
    threshold: 1,
    rootmargin: "0px 0px -300px 0px"
  };
  
  
  const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) {
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
  
  if('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items, observer) => {
      items.forEach((item) => {
        if(item.isIntersecting) {
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

