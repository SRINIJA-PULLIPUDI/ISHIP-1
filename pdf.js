function reload(){
    document.getElementsByTagName("header")[0].style = "transform:translateY(0px)";
}
function Fix() {
    var header = document.getElementById("Header");
    var sticky = header.offsetTop;
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

const userIcon = document.getElementById('user');
const sidebar = document.getElementsByClassName('profile')[0];
const closeArrow = document.getElementsByClassName('back')[0];

userIcon.addEventListener('click', () => {
    sidebar.classList.add('hidden10');
});

closeArrow.addEventListener('click', () => {
    sidebar.classList.remove('hidden10');
});

document.addEventListener('click', (e) => {
    if (
    !sidebar.contains(e.target) && 
    !userIcon.contains(e.target)
    ) {
    sidebar.classList.remove('hidden10');
    }
});
 
const container = document.getElementById('cardContainer');
const fileInput = document.getElementById('fileInput');
const STORAGE_KEY = 'uploadedFiles';

let filesData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    function saveToStorage() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filesData));
    }
    function createCard(file, index) {
      const card = document.createElement('div');
      card.className = 'card';

       // Image files
      if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = file.data;
        img.style.cssText = 'max-width: 100%; max-height: 100%; border-radius: 10px; object-fit: cover; position: absolute; top: 0; left: 0; width: 100%; height: 100%';
        card.appendChild(img);
      }

       // PDF preview using saved thumbnail
      else if (file.type === 'application/pdf' && file.thumbnail) {
        const img = document.createElement('img');
        img.src = file.thumbnail;
        img.style.cssText = 'max-width: 100%; max-height: 100%; border-radius: 10px; object-fit: cover; position: absolute; top: 0; left: 0; width: 100%; height: 100%';
        card.appendChild(img);
      }
      const nameEl = document.createElement('div');
      nameEl.className = 'file-name';
      nameEl.textContent = file.name;

      const icon = document.createElement('div');
      icon.className = 'icon';

      const editIcon = document.createElement('i');
      editIcon.className = 'fa fa-edit';
      editIcon.onclick = function(e) {
        e.stopPropagation();
        const newName = prompt("Rename file:", nameEl.textContent);
        if (newName) {
          nameEl.textContent = newName;
          filesData[index].name = newName;
          saveToStorage();
         }
      };

  const deleteIcon = document.createElement('i');
  deleteIcon.className = 'fa fa-trash';
  deleteIcon.onclick = function(e) {
    e.stopPropagation();
    if (confirm("Delete this file?")) {
      filesData.splice(index, 1);
      saveToStorage();
      renderCards();
    }
  };

  card.onclick = () => {
    const newTab = window.open();
    newTab.document.title = file.name;
    if (file.type.startsWith('image/') || file.type === 'application/pdf') {
      newTab.document.writeln(`<iframe src="${file.data}" style="width:100%; height:100%;" frameborder="0"></iframe>`);
    } else {
      newTab.document.writeln(`<p>Preview not supported.</p>`);
    }
  };

  icon.appendChild(editIcon);
  icon.appendChild(deleteIcon);
  card.appendChild(icon);
  card.appendChild(nameEl);

  container.insertBefore(card, container.lastElementChild);
}

   

function renderCards() {
    container.querySelectorAll('.card:not(.plus)').forEach(card => card.remove());
    filesData.forEach((file, index) => createCard(file, index));
}

function handleFile(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (filesData.length >= 6) {
    showModal();
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    if (file.type === 'application/pdf') {
      const pdfData = e.target.result;

      const loadingTask = pdfjsLib.getDocument({ data: atob(pdfData.split(',')[1]) });
      loadingTask.promise.then(pdf => {
        return pdf.getPage(1);
      }).then(page => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        return page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
          const thumbnail = canvas.toDataURL();
          const fileObject = {
            name: file.name,
            type: file.type,
            data: pdfData,
            thumbnail: thumbnail
          };
          filesData.push(fileObject);
          saveToStorage();
          renderCards();
        });
      }).catch(err => {
        alert('Failed to render PDF.');
        console.error(err);
      });

    } else if (file.type.startsWith('image/')) {
      const fileObject = {
        name: file.name,
        type: file.type,
        data: e.target.result
      };
      filesData.push(fileObject);
      saveToStorage();
      renderCards();
    }
  };

  if (file.type.startsWith('image/') || file.type === 'application/pdf') {
    reader.readAsDataURL(file);
  } else {
    alert("Only images and PDFs are supported.");
  }

  fileInput.value = '';
}

renderCards();
function showModal() {
  const modal = document.getElementById('premiumModal');
  modal.style.display = 'flex';
}
function closeModal() {
  const modal = document.getElementById('premiumModal');
  modal.style.display = 'none';
}
document.getElementById('premiumModal').addEventListener('click', closeModal);

function displayUserInfo(usernameId, emailId) {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) {
    window.location.href = 'login.html';
    return;
  }else{
    if (usernameId) document.getElementsByClassName('name')[0].innerText = user.username;
    if (emailId) document.getElementsByClassName('email')[0].innerText = user.email;
    if (usernameId) document.getElementsByClassName('welcomeuser')[0].innerText = user.username;
  }
}