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
})();
