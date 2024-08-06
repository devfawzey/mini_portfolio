import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)
export const useGsap = () => {
 const currentTabIndex = useState('tab-id', () => -3)
 const isAnimate = useState('is-animate', () => false)
 const tl = gsap.timeline();
 const targets = {
  loader: "main#loader",
  landingImg: ".bg-dots"
 }

 const __pageTransitionEnter__ = () => {
  /**
   * sets
   * loader -100
   * img scale(1)
   */


  // sets
  // tl.set(targets.landingImg, {
  //  scale: 1.5,
  //  rotate: 0.001,
  // })
  // loader
  tl.to(targets.loader, { yPercent: -100, ease: "expo.inOut", duration: 1.75, delay: 0.5, })
  // img
  tl.to(targets.landingImg, {
   scale: 1,
   duration: 1.75,
   ease: "expo.inOut"
  }, "<")
  _animateLandingContent_()
 }
 const __pageTransitionLeave__ = () => { }
 const ____zoomImgOnScroll____ = () => { }
 const _animateLandingContent_ = () => {
  const target = "[once-in]"
  // set first
  // tl.set(target, {
  //  y: '50vh'
  // })
  tl.to(target, {
   y: "0vh",
   // opacity: 1,
   duration: 1.75,
   stagger: .05,
   ease: "expo.inOut", onComplete() {
    __showElementOnScroll__()
    // animateHeaderInicator()
   }
  }, "<")
 }
 const __showElementOnScroll__ = () => {
  const targets: NodeListOf<HTMLElement> = document.querySelectorAll('[fade-scroll]')

  const observer = new IntersectionObserver((entries) => {
   entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('appear')
   })
  }, { root: null, threshold: .1, rootMargin: "0px" })

  targets.forEach((target) => observer.observe(target))

 }
 const ________scrollTo_______ = ({ uTarget = 0 }: { uTarget: number | string }) => {
  tl.to(window, { scrollTo: uTarget, duration: 1, ease: "power4.inOut" })

 }
 const animateHeaderInicator = (activeTab: string = 'home-page') => {
  console.log('animate')
  // if (true) return;
  if (isAnimate.value) return;
  isAnimate.value = true
  const baseWidth = 48 // iconWidth && indicatorWidth
  const baseDuration = 1
  const baseEase = "expo.inOut"//"power4.inOut" //
  const headerWrapper = document.querySelector("header#header .header__wrapper")
  const target = document.querySelector(`.head-icon[data-section='${activeTab}']`) as HTMLElement
  const offsetLeft = target?.offsetLeft ?? 0
  const offsetRight = -(4 - Number(target.dataset.index)) * 48
  const nextTabIndex = Number(target.dataset.index)
  const isRightDirection = Number(nextTabIndex) - Number(currentTabIndex.value) >= 0
  const isInitIndicator = Number(nextTabIndex) - Number(currentTabIndex.value) === 0
  // const offsetObtion = { x: offsetLeft }

  // if (nextTabIndex == currentTabIndex.value) return;

  if (isRightDirection) {
   const curretnOffsetLeft = currentTabIndex.value * 48
   // if right direction
   tl.set("#indicator", {
    x: curretnOffsetLeft,
    left: 0, right: 'auto'
   })
   tl.to("#indicator", {
    width: baseWidth + (nextTabIndex - currentTabIndex.value) * baseWidth,
    duration: baseDuration - 0.5,
    ease: baseEase, onComplete() {
     currentTabIndex.value = nextTabIndex
    }
   })
   tl.to("#indicator", {
    x: offsetLeft,
    duration: baseDuration,
    ease: baseEase
   })
   tl.to("#indicator", {
    width: baseWidth,
    duration: baseDuration,
    ease: baseEase
   }, "<")
  } else {
   // if left direction
   const currentOffsetRight = -(4 - currentTabIndex.value) * 48
   tl.set("#indicator", {
    right: 0, left: 'auto',
    x: currentOffsetRight
   })
   tl.to("#indicator", {
    width: baseWidth + (currentTabIndex.value - nextTabIndex) * baseWidth,
    duration: baseDuration - 0.5,
    ease: baseEase, onComplete() {
     currentTabIndex.value = nextTabIndex
    }
   })
   tl.to("#indicator", {
    x: offsetRight,
    duration: baseDuration,
    ease: baseEase
   })
   tl.to("#indicator", {
    width: baseWidth,
    duration: baseDuration,
    ease: baseEase
   }, "<")
  }
  const scrollTarget = "#" + target.dataset.section
  tl.to(window, {
   scrollTo: scrollTarget, duration: baseDuration,
   ease: baseEase
  }, "<")

  tl.call(() => {
   isAnimate.value = false
  })

 }

 const changeIndicatorActiveTabOnScroll = (fn: (title: string) => void) => {
  const targets: NodeListOf<HTMLElement> = document.querySelectorAll('section')
  const observer = new IntersectionObserver(useDebounceFn((entries) => {
   entries.forEach((entry: any) => {
    if (!entry.isIntersecting) return;
    console.log(entry.target.id)
    fn(entry.target.id)
   })
  }, 250), { root: null, rootMargin: "0px", threshold: 0 })

  targets.forEach((target) => observer.observe(target))
 }

 return { __pageTransitionEnter__, changeIndicatorActiveTabOnScroll, __showElementOnScroll__, _animateLandingContent_, ________scrollTo_______, animateHeaderInicator }

}