const url = 'http://localhost:3000/product/upload/any';
const input = document.getElementById('fileinput');
const button = document.getElementById('fileupload');

const upload = file => {
  // A File object is a special kind of blob.
  // XlsxPopulate.fromDataAsync(file[0]).then(function(workbook) {
  //   console.log(file[0]);
  //   console.log(workbook);
  // });

  const formData = new FormData();

  for (const name in file) {
    formData.append(name, file[name]);
  }

  fetch(url, { method: 'POST', body: formData })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.log(error));
};

button.onclick = () => upload(input.files);
