import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

iziToast.settings({
    position: "topRight",
})

const snackbar = {
    form: document.querySelector('.form'),
    inputDelay: document.querySelector('input[name=delay]'),
    submitButtom: document.querySelector('.form>button'),
    makePromise(event) {
        event.preventDefault();
        const promiseType = document.querySelector('input[name=state]:checked').value;
        const delay = snackbar.inputDelay.value;
        
        new Promise((resolve, reject) => {
            const timeoutId = setTimeout(() => {
                if (promiseType == 'fulfilled') {
                    resolve();
                } else {
                    reject();
                }
            }, delay);
        })
            .then(() => {
                iziToast.success({
                    title: 'Fulfilled',
                    message: `promise in ${delay} ms` ,
                })
            })
            .catch(() => {
                iziToast.warning({
                    title: 'Rejected',
                    message: `promise in ${delay} ms`,
                })
            })
    }
}

snackbar.form.addEventListener('submit', snackbar.makePromise)
