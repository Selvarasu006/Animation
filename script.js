
function isDesktop() {
  return window.innerWidth >= 1024 && !("ontouchstart" in window)
}


function throttle(func, limit) {
  let inThrottle
  return function () {
    const args = arguments
    
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}


function initScrollImageChange() {
 
  if (!isDesktop()) {
    console.log("Mobile/tablet detected - scroll image change disabled")
    return
  }

  const textBlocks = document.querySelectorAll(".text-block")
  const images = document.querySelectorAll(".scroll-image")
  let currentActiveImage = 1

  function updateActiveImage() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const windowHeight = window.innerHeight

   
    let activeBlock = null
    let activeImageNumber = 1

    textBlocks.forEach((block, index) => {
      const rect = block.getBoundingClientRect()
      const blockTop = rect.top + scrollTop
      const blockBottom = blockTop + rect.height

      
      const triggerPoint = scrollTop + windowHeight * 0.5

      if (triggerPoint >= blockTop && triggerPoint <= blockBottom) {
        activeBlock = block
        activeImageNumber = Number.parseInt(block.dataset.image)
      }
    })

   
    if (activeImageNumber !== currentActiveImage) {
      
      textBlocks.forEach((block) => block.classList.remove("active"))
      images.forEach((img) => img.classList.remove("active"))

   
      if (activeBlock) {
        activeBlock.classList.add("active")
      }

      const activeImage = document.querySelector(`img[data-image="${activeImageNumber}"]`)
      if (activeImage) {
        activeImage.classList.add("active")
      }

      currentActiveImage = activeImageNumber

     
      console.log(`Active image changed to: ${activeImageNumber}`)
    }
  }

 
  const throttledUpdate = throttle(updateActiveImage, 50)
  window.addEventListener("scroll", throttledUpdate)

  
  updateActiveImage()

  
  window.addEventListener(
    "resize",
    throttle(() => {
      if (!isDesktop()) {
        window.removeEventListener("scroll", throttledUpdate)
        console.log("Switched to mobile - scroll functionality disabled")
      }
    }, 250),
  )
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing scroll image change...")
  initScrollImageChange()
})


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})


let scrollCount = 0
window.addEventListener("scroll", () => {
  scrollCount++
  if (scrollCount % 100 === 0) {
    console.log(`Scroll events processed: ${scrollCount}`)
  }
})