(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* nav */
  var nav=document.getElementById('nav');
  if(nav)addEventListener('scroll',function(){nav.classList.toggle('scrolled',scrollY>40)},{passive:true});
  var burger=document.getElementById('burger'),links=document.getElementById('navLinks');
  if(burger&&links){
    burger.addEventListener('click',function(){var o=links.classList.toggle('open');burger.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);});
    links.addEventListener('click',function(e){if(e.target.tagName==='A'){links.classList.remove('open');burger.classList.remove('open');}});
  }

  /* reveal */
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.14});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});

  /* agent-flow traveling signal */
  var flow=document.querySelector('.agent-flow');
  if(flow&&!reduce){
    var steps=flow.querySelectorAll('.agent-step'),idx=0,timer=null;
    function tick(){steps.forEach(function(s,i){s.classList.toggle('lit',i===idx);});idx=(idx+1)%(steps.length+1);}
    function run(){if(!timer){tick();timer=setInterval(tick,950);}}
    function halt(){if(timer){clearInterval(timer);timer=null;steps.forEach(function(s){s.classList.remove('lit');});}}
    var vis=false;
    var fio=new IntersectionObserver(function(es){vis=es[0].isIntersecting;if(vis)run();else halt();},{threshold:.12});
    fio.observe(flow);
    document.addEventListener('visibilitychange',function(){if(document.hidden)halt();else if(vis)run();});
  }
})();
