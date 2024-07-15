let alumniProfiles = [];
const addProfileButton = document.getElementById('addProfileButton');
const formContainer = document.getElementById('formContainer');
const cancelButton = document.getElementById('cancelButton');

// Function to save data to a text file (simulated using localStorage)
function saveDataToTxt() {
    let dataToSave = JSON.stringify(alumniProfiles);
    localStorage.setItem("alumniData", dataToSave);
}

// Function to load data from a text file (simulated using localStorage)
function loadDataFromTxt() {
    let data = localStorage.getItem("alumniData");
    if (data) {
        alumniProfiles = JSON.parse(data);
    }
}

// Function to create a new profile
function createProfile(profile) {
    const newId = alumniProfiles.length;
    alumniProfiles.push({ id: newId, ...profile });
    saveDataToTxt();
    renderProfiles();
}

// Function to update a profile
function updateProfile(id, updatedProfile) {
    alumniProfiles[id] = { ...alumniProfiles[id], ...updatedProfile };
    saveDataToTxt();
    renderProfiles();
}

// Function to delete a profile
function deleteProfile(id) {
    alumniProfiles = alumniProfiles.filter((profile) => profile.id !== id);
    alumniProfiles.forEach((profile, index) => (profile.id = index));
    saveDataToTxt();
    renderProfiles();
}

// Function to edit a profile
function editProfile(id) {
    const profile = alumniProfiles.find((profile) => profile.id === id);
    document.getElementById("profileId").value = id;
    document.getElementById("alumniName").value = profile.name;
    document.getElementById("alumniMajor").value = profile.major;
    document.getElementById("alumniYear").value = profile.year;
    document.getElementById("alumniJob").value = profile.job;
    
    // Display the current photo in the preview
    const previewContainer = document.getElementById("previewContainer");
    previewContainer.innerHTML = `<img src="${profile.photoUrl}" alt="Preview Image" id="previewImage">`;

    showForm();
}

// Function to preview photo before upload
function previewPhoto(event) {
    const previewContainer = document.getElementById("previewContainer");
    previewContainer.innerHTML = "";

    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imgElement = document.createElement("img");
            imgElement.src = e.target.result;
            imgElement.alt = "Preview Image";
            imgElement.id = "previewImage";
            previewContainer.appendChild(imgElement);
        };
        reader.readAsDataURL(file);
    }
}

// Function to add or update profile with photo
function addOrUpdateProfile(event) {
    event.preventDefault();
    const id = document.getElementById("profileId").value;
    const name = document.getElementById("alumniName").value;
    const major = document.getElementById("alumniMajor").value;
    const year = document.getElementById("alumniYear").value;
    const job = document.getElementById("alumniJob").value;

    // Get photo from preview
    const previewImage = document.getElementById("previewImage");
    let photoUrl = previewImage ? previewImage.src : "";

    if (id) {
        updateProfile(parseInt(id), { name, major, year, job, photoUrl });
    } else {
        createProfile({ name, major, year, job, photoUrl });
    }

    resetForm();
    hideForm();
}

// Function to reset form
function resetForm() {
    document.getElementById("alumniForm").reset();
    document.getElementById("profileId").value = "";
    document.getElementById("previewContainer").innerHTML = "";
}

// Function to render profiles
function renderProfiles() {
    const profileGrid = document.getElementById("profileGrid");
    profileGrid.innerHTML = "";

    alumniProfiles.forEach((profile) => {
        profileGrid.innerHTML += `
            <div class="profile">
                <img src="${profile.photoUrl || 'default_avatar.png'}" alt="${profile.name}">
                <h2>${profile.name}</h2>
                <p>Lulusan ${profile.major}, Angkatan ${profile.year}</p>
                <p>Saat ini bekerja sebagai ${profile.job}</p>
                <button onclick="editProfile(${profile.id})">Edit</button>
                <button onclick="deleteProfile(${profile.id})">Delete</button>
            </div>
        `;
    });
}

// Function to show form
function showForm() {
    formContainer.style.display = 'block';
    addProfileButton.style.display = 'none';
}

// Function to hide form
function hideForm() {
    formContainer.style.display = 'none';
    addProfileButton.style.display = 'flex';
}

// Event listeners
addProfileButton.addEventListener('click', showForm);
cancelButton.addEventListener('click', () => {
    hideForm();
    resetForm();
});
document.getElementById("alumniForm").addEventListener("submit", addOrUpdateProfile);
document.getElementById("alumniPhoto").addEventListener("change", previewPhoto);

// Initialize: load data from text file when page loads
loadDataFromTxt();
// Render profiles when page first loads
renderProfiles();