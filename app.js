document.getElementById("purchaseForm").addEventListener("submit", function(e){
  e.preventDefault();

  const uid = document.getElementById("uid").value;
  const name = document.getElementById("name").value;
  const purchaseAmount = Number(document.getElementById("amount").value);

  // ===== جایگذاری URL وب‌اپ Google Apps Script =====
  const googleScriptURL = "https://script.google.com/macros/s/AKfycbwrq82-cUpL-x72ADtjYRjIykEFtqDOxRp91wo1xm1s7RsGfu4sKsm-mMjE_tkOzw/exec";

  fetch(googleScriptURL, {
    method: "POST",
    body: JSON.stringify({uid, name, purchaseAmount}),
    headers: { "Content-Type": "application/json" }
  })
  .then(res => res.json())
  .then(data => {
    if(data.error){
      document.getElementById("result").innerText = "خطا: " + data.error;
    } else {
      document.getElementById("result").innerText = 
        `تراکنش ثبت شد!\nتخفیف: ${data.discount}٪\nقابل پرداخت: ${data.finalPayable}`;
    }
  })
  .catch(err => {
    console.error(err);
    document.getElementById("result").innerText = "خطا در اتصال به سرور!";
  });
});
