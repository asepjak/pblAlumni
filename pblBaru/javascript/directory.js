document.addEventListener('DOMContentLoaded', function() {
    const companySearch = document.getElementById('company-search');
    const searchBtn = document.getElementById('search-btn');
    const industryFilter = document.getElementById('industry-filter');
    const locationFilter = document.getElementById('location-filter');
    const companyList = document.getElementById('profileGrid'); // Updated to match the HTML
    const addCompanyButton = document.getElementById('addProfileButton'); // Updated to match the HTML
    const formContainer = document.getElementById('formContainer'); // Updated to match the HTML
    const companyForm = document.getElementById('alumniForm'); // Updated to match the HTML
    const cancelButton = document.getElementById('cancelButton'); // Updated to match the HTML

    // Sample company data
    let companies = [
        { id: 1, name: 'Tech Company 1', industry: 'tech', location: 'jakarta', description: 'A leading tech company', website: 'https://www.techcompany1.com' },
        { id: 2, name: 'Finance Company 1', industry: 'finance', location: 'surabaya', description: 'Financial services provider', website: 'https://www.financecompany1.com' },
        // More profiles can be added here
    ];

    function displayCompanies(filteredCompanies) {
        companyList.innerHTML = '';
        filteredCompanies.forEach(company => {
            const companyElement = createCompanyElement(company);
            companyList.appendChild(companyElement);
        });
    }

    function createCompanyElement(company) {
        const companyElement = document.createElement('div');
        companyElement.className = 'company-profile'; // Updated to match the HTML
        companyElement.setAttribute('data-company', company.name);
        companyElement.setAttribute('data-industry', company.industry);
        companyElement.setAttribute('data-location', company.location);
        companyElement.innerHTML = `
            <h3>${company.name}</h3>
            <p>Industri: ${company.industry.charAt(0).toUpperCase() + company.industry.slice(1)}</p>
            <p>Lokasi: ${company.location.charAt(0).toUpperCase() + company.location.slice(1)}</p>
            <p>Website: <a href="${company.website}">${company.website}</a></p>
            <button onclick="editCompany(${company.id})">Edit</button>
            <button onclick="deleteCompany(${company.id})">Hapus</button>
        `;
        return companyElement;
    }

    function filterCompanies() {
        const searchTerm = companySearch.value.toLowerCase();
        const selectedIndustry = industryFilter.value;
        const selectedLocation = locationFilter.value;

        const filteredCompanies = companies.filter(company => {
            const matchesSearch = company.name.toLowerCase().includes(searchTerm);
            const matchesIndustry = selectedIndustry ? company.industry === selectedIndustry : true;
            const matchesLocation = selectedLocation ? company.location === selectedLocation : true;
            return matchesSearch && matchesIndustry && matchesLocation;
        });

        displayCompanies(filteredCompanies);
    }

    function showForm(company) {
        formContainer.style.display = 'block';
        if (company) {
            document.getElementById('profileId').value = company.id;
            document.getElementById('alumniName').value = company.name;
            document.getElementById('alumniMajor').value = company.industry;
            document.getElementById('alumniYear').value = company.location;
            document.getElementById('alumniJob').value = company.website || '';
            document.getElementById('previewContainer').innerHTML = company.logo ? `<img src="${company.logo}" alt="Logo">` : '';
        } else {
            companyForm.reset();
            document.getElementById('profileId').value = '';
            document.getElementById('previewContainer').innerHTML = '';
        }
    }

    function addOrUpdateCompany(event) {
        event.preventDefault();
        const companyId = document.getElementById('profileId').value;
        const companyName = document.getElementById('alumniName').value;
        const companyIndustry = document.getElementById('alumniMajor').value;
        const companyLocation = document.getElementById('alumniYear').value;
        const companyWebsite = document.getElementById('alumniJob').value;
        const companyLogo = document.getElementById('alumniPhoto').files[0];

        let logoUrl = '';
        if (companyLogo) {
            const reader = new FileReader();
            reader.onload = function(e) {
                logoUrl = e.target.result;

                if (companyId) {
                    const companyIndex = companies.findIndex(company => company.id == companyId);
                    companies[companyIndex] = { id: companyId, name: companyName, industry: companyIndustry, location: companyLocation, website: companyWebsite, description: '', logo: logoUrl };
                } else {
                    const newCompany = { id: Date.now(), name: companyName, industry: companyIndustry, location: companyLocation, website: companyWebsite, description: '', logo: logoUrl };
                    companies.push(newCompany);
                }

                formContainer.style.display = 'none';
                filterCompanies();
            };
            reader.readAsDataURL(companyLogo);
        } else {
            if (companyId) {
                const companyIndex = companies.findIndex(company => company.id == companyId);
                companies[companyIndex] = { id: companyId, name: companyName, industry: companyIndustry, location: companyLocation, website: companyWebsite, description: '', logo: logoUrl };
            } else {
                const newCompany = { id: Date.now(), name: companyName, industry: companyIndustry, location: companyLocation, website: companyWebsite, description: '', logo: logoUrl };
                companies.push(newCompany);
            }

            formContainer.style.display = 'none';
            filterCompanies();
        }
    }

    function editCompany(id) {
        const company = companies.find(company => company.id == id);
        showForm(company);
    }

    function deleteCompany(id) {
        companies = companies.filter(company => company.id != id);
        filterCompanies();
    }

    searchBtn.addEventListener('click', filterCompanies);
    industryFilter.addEventListener('change', filterCompanies);
    locationFilter.addEventListener('change', filterCompanies);
    companySearch.addEventListener('input', filterCompanies);
    addCompanyButton.addEventListener('click', () => showForm(null));
    companyForm.addEventListener('submit', addOrUpdateCompany);
    cancelButton.addEventListener('click', () => formContainer.style.display = 'none');

    // Initial display
    displayCompanies(companies);
});
