/* ==========================================================================
   UBDetsurf Industries — site behaviour (vanilla JS, no dependencies).
   Loaded with `defer` on every page. Everything here is progressive
   enhancement: pages, navigation and the mailto links work without it.
   ========================================================================== */
(function () {
  "use strict";

  /* Company e-mail addresses (verified on the original website). */
  var SALES_EMAIL = "infosales@ubdetsurf.com";
  var CAREERS_EMAIL = "infosales@ubdetsurf.com"; // TODO: confirm a dedicated HR address (see CONTENT_AUDIT.md)

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
  }

  /* ---------- mailto helper ----------
     Every value goes through encodeURIComponent so spaces, accents,
     ampersands and line breaks survive in the mail client. */
  function buildMailto(to, subject, lines) {
    var body = lines.join("\r\n").replace(/\r?\n/g, "\r\n");
    return "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  function val(form, name) {
    var el = form.elements[name];
    return el ? String(el.value || "").trim() : "";
  }

  function showStatus(form, html) {
    var box = form.querySelector(".form-status");
    if (!box) return;
    box.innerHTML = html;
    box.hidden = false;
  }

  /* Opening a mail app is not the same as sending an e-mail, so the message
     below never claims the enquiry was sent. */
  function statusMessage(to, href) {
    return (
      "<strong>Your email app should now be opening.</strong>" +
      "Review the message and press Send &mdash; nothing has been sent yet. " +
      "If nothing opened, use the button below to try again, or copy the text and email it to <a href=\"mailto:" + to + "\">" + to + "</a>." +
      "<br><a class=\"btn btn--green\" data-mailto href=\"" + href.replace(/&/g, "&amp;") + "\">Open email draft again</a> " +
      "<button type=\"button\" class=\"btn btn--outline\" data-copy>Copy message text</button>"
    );
  }

  function wireCopy(form, text) {
    var btn = form.querySelector("[data-copy]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var done = function () { btn.textContent = "Copied"; };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () { window.prompt("Copy this text:", text); });
      } else {
        window.prompt("Copy this text:", text);
      }
    });
  }

  /* ---------- Contact / enquiry form ---------- */
  var enquiry = document.getElementById("enquiry-form");
  if (enquiry) {
    enquiry.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!enquiry.reportValidity()) return;
      var interest = val(enquiry, "interest") || "General enquiry";
      var company = val(enquiry, "company");
      var subject = "Enquiry – " + interest + " – UBDetsurf Industries";
      var lines = [
        "Hello UBDetsurf team,",
        "",
        "I would like to make an enquiry.",
        "",
        "Name: " + val(enquiry, "first_name") + " " + val(enquiry, "last_name"),
        "Company: " + company,
        "Email: " + val(enquiry, "email"),
        "Phone: " + val(enquiry, "phone"),
        "Area of interest: " + interest,
        "",
        "Message:",
        val(enquiry, "message"),
        "",
        "Regards,",
        val(enquiry, "first_name")
      ];
      var enquiryHref = buildMailto(SALES_EMAIL, subject, lines);
      window.location.href = enquiryHref;
      showStatus(enquiry, statusMessage(SALES_EMAIL, enquiryHref));
      wireCopy(enquiry, "To: " + SALES_EMAIL + "\nSubject: " + subject + "\n\n" + lines.join("\n"));
    });

    /* Enquiry-type cards pre-select the interest and jump to the form. */
    document.querySelectorAll("[data-interest]").forEach(function (card) {
      card.addEventListener("click", function () {
        var select = enquiry.elements["interest"];
        if (select) select.value = card.getAttribute("data-interest");
      });
    });
  }

  /* ---------- Careers application ---------- */
  var careers = document.getElementById("careers-form");
  if (careers) {
    careers.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!careers.reportValidity()) return;
      var subject = "Career Application – UBDetsurf Industries";
      var lines = [
        "Hello HR team,",
        "",
        "I would like to apply at UBDetsurf Industries.",
        "",
        "Applicant name: " + val(careers, "name"),
        "Position applied for: " + (val(careers, "role") || "General application"),
        "Contact number: " + val(careers, "phone"),
        "Email address: " + val(careers, "email"),
        "Educational qualification: " + val(careers, "qualification"),
        "Relevant experience: " + val(careers, "experience"),
        "Brief introduction: " + val(careers, "intro"),
        "",
        "IMPORTANT: please attach your CV to this email before sending.",
        "",
        "Regards,",
        val(careers, "name")
      ];
      var careersHref = buildMailto(CAREERS_EMAIL, subject, lines);
      window.location.href = careersHref;
      showStatus(careers, statusMessage(CAREERS_EMAIL, careersHref) + "<br><strong>Remember to attach your CV</strong> (PDF or Word) before you press Send.");
      wireCopy(careers, "To: " + CAREERS_EMAIL + "\nSubject: " + subject + "\n\n" + lines.join("\n"));
    });
  }

  /* ---------- Certificate lightbox (links open the image without JS) ---------- */
  var certLinks = document.querySelectorAll("[data-lightbox]");
  if (certLinks.length && typeof HTMLDialogElement === "function") {
    var dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Certificate preview");
    dialog.innerHTML = '<img alt=""><button type="button" class="btn btn--green lightbox__close">Close</button>';
    document.body.appendChild(dialog);
    var dialogImg = dialog.querySelector("img");
    dialog.querySelector("button").addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
    certLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var thumb = link.querySelector("img");
        dialogImg.src = link.getAttribute("href");
        dialogImg.alt = thumb ? thumb.alt : "";
        dialog.showModal();
      });
    });
  }

  /* ---------- Products page: click-to-open sheets and molecule search ----------
     Runs before the reveal code. Without JavaScript every sheet stays visible. */
  (function(){
var reco=document.getElementById('recommendations');if(!reco||!document.getElementById('mol-q'))return;
var sheets=[].slice.call(reco.querySelectorAll('.sheet')),cards=[].slice.call(document.querySelectorAll('.pcard[data-sheet]')),tabs=[].slice.call(reco.querySelectorAll('.chip-nav a'));
if(!sheets.length)return;reco.querySelector('.sheet-close').hidden=false;document.documentElement.classList.add('js-sheets');
sheets.forEach(function(x){x.removeAttribute('data-reveal');x.classList.remove('reveal-ready')});
function clearMarks(){reco.querySelectorAll('mark.found').forEach(function(m){m.replaceWith(m.textContent)})}
function open(id,target){clearMarks();reco.classList.add('is-open');
 sheets.forEach(function(x){x.classList.toggle('is-shown',x.id===id)});
 tabs.forEach(function(a){a.setAttribute('aria-current',String(a.hash==='#'+id))});
 cards.forEach(function(c){c.classList.toggle('is-active',c.dataset.sheet===id)});
 reco.querySelectorAll('[data-reveal]').forEach(function(e){e.classList.remove('reveal-ready')});
 if(target){var m=document.createElement('mark');m.className='found';while(target.firstChild)m.appendChild(target.firstChild);target.appendChild(m)}
 (target||reco).scrollIntoView({block:target?'center':'start'})}
document.addEventListener('click',function(e){var a=e.target.closest('a');if(!a||!a.hash)return;var id=a.hash.slice(1);
 if(sheets.some(function(x){return x.id===id})&&(a.matches('.pcard')||a.closest('.chip-nav'))){e.preventDefault();history.replaceState(null,'','#'+id);open(id)}});
reco.querySelector('.sheet-close').onclick=function(){reco.classList.remove('is-open');cards.forEach(function(c){c.classList.remove('is-active')});history.replaceState(null,'',location.pathname);document.querySelector('.pgrid').scrollIntoView()};
function fromHash(){var id=location.hash.slice(1);if(sheets.some(function(x){return x.id===id}))open(id)}
addEventListener('hashchange',fromHash);addEventListener('load',fromHash);
function norm(t){return t.toLowerCase().replace(/[^a-z0-9]/g,'')}
var index=[];sheets.forEach(function(sh){var group='';sh.querySelectorAll('tbody tr').forEach(function(tr){if(tr.classList.contains('subhead')){group=tr.textContent.trim();return}
 var product=tr.querySelector('.col-product').textContent.trim();
 tr.querySelectorAll('.molecules li').forEach(function(li){index.push({sheet:sh.id,type:sh.querySelector('h3').textContent.trim(),group:group,product:product,name:li.textContent.trim(),key:norm(li.textContent),li:li})})})});
var q=document.getElementById('mol-q'),out=document.querySelector('.finder__results'),status=document.querySelector('.finder__status');
function el(tag,text,cls){var e=document.createElement(tag);e.textContent=text;if(cls)e.className=cls;return e}
q.addEventListener('input',function(){out.textContent='';var words=q.value.trim().split(/\s+/).map(norm).filter(Boolean),all=norm(q.value);
 if(all.length<3){status.textContent=all.length?'Type at least 3 characters.':'';return}
 var hits=index.filter(function(r){return r.key.indexOf(all)>-1||words.every(function(w){return r.key.indexOf(w)>-1})});
 if(!hits.length){status.textContent='No match in our lists. ';var a=el('a','Ask our team');a.href='contact-us.html#enquiry';status.appendChild(a);return}
 status.textContent=hits.length+(hits.length===1?' match':' matches');var last='';
 hits.forEach(function(r){if(r.type!==last){out.appendChild(el('h4',r.type));last=r.type}
  var b=el('button','','hit');b.type='button';b.appendChild(el('b','Product: '+r.product));b.appendChild(el('span',r.name+(r.group?' ('+r.group+')':'')));b.onclick=function(){open(r.sheet,r.li)};out.appendChild(b)})});
})();

  /* ---------- Gentle reveal for below-the-fold blocks ----------
     Only elements that start off-screen are hidden, so nothing flashes and
     the LCP element is never touched. Skipped for reduced-motion users. */
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduce && "IntersectionObserver" in window) {
    var targets = document.querySelectorAll("[data-reveal]");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    targets.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("reveal-ready");
        io.observe(el);
      }
    });
  }

  /* ---------- Journey line fills as the page scrolls (About page) ---------- */
  var journey = document.querySelector(".journey");
  if (journey && !reduce) {
    var fillJourney = function () {
      var box = journey.getBoundingClientRect();
      var done = (window.innerHeight * 0.7 - box.top) / box.height;
      journey.style.setProperty("--journey-fill", Math.max(0, Math.min(1, done)).toFixed(3));
    };
    window.addEventListener("scroll", fillJourney, { passive: true });
    window.addEventListener("resize", fillJourney);
    fillJourney();
  }

  /* ---------- Home slideshow ----------
     Changes every 5s; waits while the pointer is over the header; stops once a
     visitor picks a photo; never auto-plays with reduced motion. */
  var slides = document.querySelectorAll(".hero-slide");
  if (slides.length > 1) {
    var hero = document.querySelector(".hero--slides");
    var dotBar = hero.querySelector(".hero-dots");
    var dots = dotBar.querySelectorAll(".hero-dot");
    var current = 0, timer = null, autoPlay = !reduce;
    var showSlide = function (n) {
      current = n;
      slides.forEach(function (el, i) { el.classList.toggle("is-active", i === n); });
      dots.forEach(function (el, i) { el.setAttribute("aria-current", String(i === n)); });
    };
    var run = function (on) {
      clearInterval(timer);
      if (on && autoPlay) timer = setInterval(function () { showSlide((current + 1) % slides.length); }, 5000);
    };
    dots.forEach(function (el, i) {
      el.addEventListener("click", function () { autoPlay = false; run(false); showSlide(i); });
    });
    hero.addEventListener("mouseenter", function () { run(false); });
    hero.addEventListener("mouseleave", function () { run(true); });
    dotBar.hidden = false;
    showSlide(0);
    run(true);
  }
})();
