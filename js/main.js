(function () {
  'use strict';

  /* --- Share on WhatsApp --- */
  var shareWhatsApp = document.getElementById('shareWhatsApp');
  if (shareWhatsApp) {
    shareWhatsApp.addEventListener('click', function () {
      var url = encodeURIComponent(window.location.href);
      var text = encodeURIComponent('Check out Selma\'s contact card ');
      window.open('https://wa.me/?text=' + text + url, '_blank', 'noopener,noreferrer');
    });
  }

  /* --- Share on Twitter / X --- */
  var shareTwitter = document.getElementById('shareTwitter');
  if (shareTwitter) {
    shareTwitter.addEventListener('click', function () {
      var url = encodeURIComponent(window.location.href);
      var text = encodeURIComponent('Selma — Digital Contact Card');
      window.open(
        'https://twitter.com/intent/tweet?text=' + text + '&url=' + url,
        '_blank',
        'noopener,noreferrer,width=600,height=400'
      );
    });
  }

  /* --- Copy link to clipboard --- */
  var copyLink = document.getElementById('copyLink');
  var copyToast = document.getElementById('copyToast');
  if (copyLink && copyToast) {
    var toastTimer = null;
    copyLink.addEventListener('click', function () {
      var url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          showToast('Link copied!');
        }).catch(function () {
          fallbackCopy(url);
        });
      } else {
        fallbackCopy(url);
      }
    });

    function fallbackCopy(text) {
      var textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast('Link copied!');
      } catch (e) {
        showToast('Failed to copy');
      }
      document.body.removeChild(textarea);
    }

    function showToast(msg) {
      copyToast.textContent = msg;
      copyToast.classList.add('card__toast--visible');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(function () {
        copyToast.classList.remove('card__toast--visible');
      }, 2000);
    }
  }

  /* --- Save Contact (download vCard) --- */
  var saveContact = document.getElementById('saveContact');
  if (saveContact) {
    saveContact.addEventListener('click', function () {
      var vcard = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'FN:Selma',
        'ORG:Acme Studio',
        'TITLE:Product Designer',
        'TEL;TYPE=CELL:+1234567890',
        'EMAIL:selma@example.com',
        'URL:' + window.location.href,
        'NOTE:Connect with me!',
        'END:VCARD'
      ].join('\n');

      var blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var link = document.createElement('a');
      link.href = url;
      link.download = 'selma-contact.vcf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    });
  }

  /* --- Register Service Worker (offline cache) --- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/tindi-selma/sw.js').catch(function () {
        /* service worker not registered — page still works fine */
      });
    });
  }
})();
