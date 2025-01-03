
const btnLogout = document.querySelector('#btn-logout');

btnLogout.addEventListener('click',() => {
    Swal.fire({
        title: "¿Estas seguro de cerrar sesion?",
        icon: "question",
        showCancelButton:true,
        focusConfirm: false,
        confirmButtonText: "Si",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('token');
            window.location.href = './login.html'; 
        }
    });
})

