// Global variables
let companyProfiles = [];
const profileGrid = document.getElementById('profileGrid');
const addProfileButton = document.getElementById('addProfileButton');
const formContainer = document.getElementById('formContainer');
const companyForm = document.getElementById('companyForm');
const cancelButton = document.getElementById('cancelButton');
const companySearch = document.getElementById('companySearch');
const industryFilter = document.getElementById('industryFilter');
const locationFilter = document.getElementById('locationFilter');
const searchBtn = document.getElementById('searchBtn');

// Load data from localStorage
const loadDataFromLocalStorage = () => {
    try {
        const data = localStorage.getItem('companyData');
        if (data) {
            companyProfiles = JSON.parse(data);
        }
    } catch (error) {
        console.error('Error loading data from localStorage:', error);
    }
};

// Save data to localStorage
const saveDataToLocalStorage = () => {
    try {
        localStorage.setItem('companyData', JSON.stringify(companyProfiles));
    } catch (error) {
        console.error('Error saving data to localStorage:', error);
    }
};

// Create a new profile
const createProfile = (profile) => {
    const newId = companyProfiles.length > 0 
        ? Math.max(...companyProfiles.map(p => p.id)) + 1 
        : 0;
    companyProfiles.push({ id: newId, ...profile });
    saveDataToLocalStorage();
    renderProfiles();
    updateFilters();
};

// Update an existing profile
const updateProfile = (id, updatedProfile) => {
    const index = companyProfiles.findIndex(profile => profile.id === id);
    if (index !== -1) {
        companyProfiles[index] = { ...companyProfiles[index], ...updatedProfile };
        saveDataToLocalStorage();
        renderProfiles();
        updateFilters();
    }
};

// Delete a profile
const deleteProfile = (id) => {
    companyProfiles = companyProfiles.filter(profile => profile.id !== id);
    saveDataToLocalStorage();
    renderProfiles();
    updateFilters();
};

// Render profiles to the page
const renderProfiles = () => {
    const searchTerm = companySearch.value.toLowerCase();
    const selectedIndustry = industryFilter.value;
    const selectedLocation = locationFilter.value;

    const filteredProfiles = companyProfiles.filter(profile =>
        profile.name.toLowerCase().includes(searchTerm) &&
        (selectedIndustry === "" || profile.industry === selectedIndustry) &&
        (selectedLocation === "" || profile.location === selectedLocation)
    );

    profileGrid.innerHTML = filteredProfiles.map(profile => `
        <div class="company-profile">
            <img src="${profile.logoUrl || 'default_logo.png'}" alt="${profile.name} logo">
            <h3>${profile.name}</h3>
            <p>Industri: ${profile.industry}</p>
            <p>Lokasi: ${profile.location}</p>
            <p>Website: <a href="${profile.website}" target="_blank">${profile.website}</a></p>
            <button class="edit-button" data-id="${profile.id}">Edit</button>
            <button class="delete-button" data-id="${profile.id}">Delete</button>
        </div>
    `).join('');
};

// Update the industry and location filters
const updateFilters = () => {
    const industries = [...new Set(companyProfiles.map(profile => profile.industry))];
    const locations = [...new Set(companyProfiles.map(profile => profile.location))];

    industryFilter.innerHTML = '<option value="">Semua Industri</option>' + 
        industries.map(industry => `<option value="${industry}">${industry}</option>`).join('');

    locationFilter.innerHTML = '<option value="">Semua Lokasi</option>' + 
        locations.map(location => `<option value="${location}">${location}</option>`).join('');
};

// Show the form for adding or editing a profile
const showForm = () => {
    formContainer.hidden = false;
    addProfileButton.hidden = true;
};

// Hide the form and reset the form fields
const hideForm = () => {
    formContainer.hidden = true;
    addProfileButton.hidden = false;
    companyForm.reset();
    document.getElementById('profileId').value = '';
    document.getElementById('previewContainer').innerHTML = '';
};

// Preview photo before uploading
const previewPhoto = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            document.getElementById('previewContainer').innerHTML = `
                <img src="${e.target.result}" alt="Preview" style="max-width: 200px; max-height: 200px;">
            `;
        };
        reader.readAsDataURL(file);
    }
};

// Handle form submission for adding or updating a profile
const handleFormSubmit = (event) => {
    event.preventDefault();
    const id = parseInt(document.getElementById('profileId').value);
    const name = document.getElementById('companyName').value;
    const industry = document.getElementById('companyIndustry').value;
    const location = document.getElementById('companyLocation').value;
    const website = document.getElementById('companyWebsite').value;
    const logoFile = document.getElementById('companyLogo').files[0];

    const processProfileData = (logoUrl) => {
        const profileData = { name, industry, location, website, logoUrl };
        if (id) {
            updateProfile(id, profileData);
        } else {
            createProfile(profileData);
        }
        hideForm();
    };

    if (logoFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            processProfileData(e.target.result);
        };
        reader.readAsDataURL(logoFile);
    } else {
        processProfileData(null);
    }
};

// Edit a profile
const editProfile = (id) => {
    const profile = companyProfiles.find(profile => profile.id === id);
    if (profile) {
        document.getElementById('profileId').value = id;
        document.getElementById('companyName').value = profile.name;
        document.getElementById('companyIndustry').value = profile.industry;
        document.getElementById('companyLocation').value = profile.location;
        document.getElementById('companyWebsite').value = profile.website;

        if (profile.logoUrl) {
            document.getElementById('previewContainer').innerHTML = `
                <img src="${profile.logoUrl}" alt="Preview" style="max-width: 200px; max-height: 200px;">
            `;
        }

        showForm();
    }
};

// Debounce function for search input
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

// Event listeners
addProfileButton.addEventListener('click', showForm);
cancelButton.addEventListener('click', hideForm);
companyForm.addEventListener('submit', handleFormSubmit);
document.getElementById('companyLogo').addEventListener('change', previewPhoto);
companySearch.addEventListener('input', debounce(renderProfiles, 300));
industryFilter.addEventListener('change', renderProfiles);
locationFilter.addEventListener('change', renderProfiles);
searchBtn.addEventListener('click', renderProfiles);

// Event delegation for dynamic elements
profileGrid.addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-button')) {
        editProfile(parseInt(event.target.dataset.id));
    } else if (event.target.classList.contains('delete-button')) {
        if (confirm('Are you sure you want to delete this profile?')) {
            deleteProfile(parseInt(event.target.dataset.id));
        }
    }
});

// Initialize the page
loadDataFromLocalStorage();
renderProfiles();
updateFilters();