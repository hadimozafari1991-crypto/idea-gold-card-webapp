const WEBAPP_URL = "https://script.google.com/macros/s/WEB-APP-ID/exec"; 
// 👆 اینو با URL واقعی خودت عوض کن

async function sendData() {
    const uid = document.getElementById("uid").value.trim();
    const amount = document.getElementById("amount").value.trim();
    const resultBox = document.getElementById("result");

    if (!uid || !amount) {
        resultBox.style.display = "block";
        resultBox.innerHTML = "⚠️ لطفاً UID و مبلغ را وارد کنید";
        return;
    }

    resultBox.style.display = "block";
    resultBox.innerHTML = "⏳ در حال ارسال...";

    const data = {
        uid: uid,
        purchaseAmount: Number(amount)
    };

    try {
        const response = await fetch(WEBAPP_URL, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.error) {
            resultBox.innerHTML = "❌ " + result.error;
        } else {
            resultBox.innerHTML =
                `✓ ثبت شد!<br>
                 مرحله فعلی: ${result.stage}<br>
                 مبلغ تخفیف: ${result.discount.toLocaleString()} تومان<br>
                 مبلغ پرداخت نهایی: ${result.finalPrice.toLocaleString()} تومان`;
        }

    } catch (err) {
        resultBox.innerHTML = "❌ خطا هنگام ارسال اطلاعات";
    }
}