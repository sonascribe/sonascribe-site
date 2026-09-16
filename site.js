const nav=document.querySelector('.nav');
const syncNav=()=>nav?.classList.toggle('nav--scrolled',window.scrollY>8);
addEventListener('scroll',syncNav,{passive:true});syncNav();
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const languageLink=document.querySelector('[data-language-switch]');
languageLink?.addEventListener('click',async event=>{
  if(!('fetch' in window)||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  event.preventDefault();languageLink.setAttribute('aria-busy','true');const targetHref=languageLink.href;
  try{
    const response=await fetch(targetHref);if(!response.ok)throw new Error('Language page unavailable');
    const nextDocument=new DOMParser().parseFromString(await response.text(),'text/html');
    const nextScript=new URL(nextDocument.querySelector('script[src]').getAttribute('src'),targetHref).href;
    document.documentElement.lang=nextDocument.documentElement.lang;document.title=nextDocument.title;
    document.head.querySelector('meta[name="description"]')?.setAttribute('content',nextDocument.head.querySelector('meta[name="description"]')?.content||'');
    document.body.replaceWith(nextDocument.body);history.pushState({},'',targetHref);
    localStorage.setItem('sonascribe-language',document.documentElement.lang.startsWith('en')?'en':'zh');
    const script=document.createElement('script');script.src=nextScript;document.body.append(script);scrollTo(0,0);
  }catch(error){location.href=targetHref;}
});
addEventListener('popstate',()=>location.reload());
