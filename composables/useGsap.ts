import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)
export const useGsap = () => {

 const tl = gsap.timeline();
 const targets = {
  loader: "main#loader",
  landingImg: "#home-landing img.landing__img"
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
  _animateLandingContent_()
  // img
  // tl.to(targets.landingImg, {
  //  scale: 1,
  //  rotate: 0.001,
  //  duration: 1.75,
  //  ease: "expo.inOut"
  // }, "<")
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
 const ________scrollTo_______ = ({ uTarget = 0 }: { uTarget: number }) => {
  gsap.to(window, { scrollTo: uTarget, duration: 1, ease: "power4.inOut" })

 }
 return { __pageTransitionEnter__, __showElementOnScroll__, _animateLandingContent_, ________scrollTo_______ }

}