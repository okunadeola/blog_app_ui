import { toast } from "react-toastify";
// import swal from "sweetalert";


// export const confirm = (message) => {
//   const res = swal({
//     title: "Are you sure?",
//     text: message,
//     icon: "warning",
//     buttons: true,
//     dangerMode: true,
//   }).then(async (willExecute) => willExecute);

//   return res;
// };





export const inform = (message) => {
  const res = toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
  return res;
}



export const informSuccess = (message) => {
  const res = toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
  return res;
}