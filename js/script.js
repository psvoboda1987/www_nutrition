window.onload = function () {
  if (document.getElementById('nutrition-slider')) {
    NutritionSlider().start()
  }
}

function NutritionSlider() {
  const nutritionSlider = {
    next: document.getElementById('next'),
    prev: document.getElementById('prev'),
    slides: document.getElementsByClassName('slide'),
    index: 0,
    timeout: 1000, // micro seconds
    checkStorage: function () {
      if (localStorage.getItem('slide_index')) {
        this.index = localStorage.getItem('slide_index')
      }
    },
    showFirstSlide: function () {
      this.showSlide()
    },
    initButtons: function () {
      this.next.addEventListener('click', () => {
        if (this.index === (this.slideCount - 1)) return
        this.index++
        this.hideSlides()
        this.showSlide()
        this.saveSlidePosition()
        console.log(localStorage.getItem('slide_index'))
      })

      this.prev.addEventListener('click', () => {
        if (this.index === 0) return
        this.index--
        this.hideSlides()
        this.showSlide()
        this.saveSlidePosition()
        console.log(localStorage.getItem('slide_index'))
      })
    },
    saveSlidePosition: function () {
      localStorage.setItem('slide_index', this.index)
    },
    showSlide: function () {
      this.show(this.slides[this.index])
    },
    hideSlides: function () {
      for (const slide of this.slides) {
        this.hide(slide)
      }
    },
    show: function (element) {
      if (element.classList.contains('hide')) {
        setTimeout(() => {
          element.classList.remove('hide');
          element.classList.add('visible');
        }, this.timeout)
      }
    },
    hide: function (element) {
      setTimeout(() => {
        element.classList.remove('visible');
        element.classList.add('hide');
      }, this.timeout)
    },
    start: function () {
      nutritionSlider.slideCount = nutritionSlider.slides.length
      this.initButtons()
      this.checkStorage()
      this.hideSlides()
      this.showFirstSlide()
    }
  }
  return nutritionSlider
}
