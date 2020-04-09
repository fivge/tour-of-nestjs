const url = 'http://localhost:3000/photo/upload/any';
const input = document.getElementById('fileinput');

const upload = file => {
  // A File object is a special kind of blob.
  // XlsxPopulate.fromDataAsync(file[0]).then(function(workbook) {
  //   console.log(file[0]);
  //   console.log(workbook);
  // });

  const formData = new FormData();
  for (const name in file) {
    console.log('name', name);
    formData.append(name, file[name]);
    console.log('formData', formData);
  }

  fetch(url, { method: 'POST', body: formData })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(error => console.log(error));
};

// Event handler executed when a file is selected
const onSelectFile = () => upload(input.files);

input.addEventListener('change', onSelectFile, false);
