
// Variables to track dynamic form elements
        let educationCount = 1;
        let experienceCount = 1;
        let projectCount = 1;
        let certificateCount = 1;
        let achievementCount = 1;
        
        // DOM Elements
        const addEducationBtn = document.getElementById('add-education');
        const educationContainer = document.getElementById('education-container');
        
        const addExperienceBtn = document.getElementById('add-experience');
        const experienceContainer = document.getElementById('experience-container');
        
        const addProjectBtn = document.getElementById('add-project');
        const projectContainer = document.getElementById('project-container');
        
        const addCertificateBtn = document.getElementById('add-certificate');
        const certificateContainer = document.getElementById('certificate-container');

        const addAchievementBtn = document.getElementById('add-achievement'); // Added achievement button
        const achievementContainer = document.getElementById('achievement-container'); // Added achievement container
        
        const saveBtn = document.getElementById('save-btn');
        const previewBtn = document.getElementById('preview-btn');
        
        const portfolioModal = document.getElementById('portfolioModal');
        const portfolioContent = document.getElementById('portfolioContent');
        
        const photoUpload = document.getElementById('photoUpload');
        const photoPreview = document.getElementById('photoPreview');
        
        // Event Listeners for dynamic elements
        addEducationBtn.addEventListener('click', addEducationField);
        addExperienceBtn.addEventListener('click', addExperienceField);
        addProjectBtn.addEventListener('click', addProjectField);
        addCertificateBtn.addEventListener('click', addCertificateField);
        addAchievementBtn.addEventListener('click', addAchievementField); // Added achievement event listener
        
        saveBtn.addEventListener('click', saveData);
    
        document.getElementById('photoInput').addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            const base64Image = e.target.result;

            // Show preview
            const img = document.getElementById('photoPreview');
            img.src = base64Image;
            img.style.display = 'block';

            // Store in localStorage
            const resumeData = JSON.parse(localStorage.getItem('resumeData')) || {};
            resumeData.personalInfo = resumeData.personalInfo || {};
            resumeData.personalInfo.photo = base64Image;
            localStorage.setItem('resumeData', JSON.stringify(resumeData));
            document.getElementById('photoPreviewContainer').style.display='block';
            document.getElementById('photoPreviewContainer').src=base64Image;
        };
        reader.readAsDataURL(file);
    }
});



       
        // Initialize form with saved data if available
        document.addEventListener('DOMContentLoaded', function() {
            loadSavedData();
        });
        
        // Helper function to create dynamic form elements
        function addEducationField() {
            const educationDiv = document.createElement('div');
            educationDiv.className = 'education-item';
            educationDiv.innerHTML = `
                <div class="form-group">
                    <label for="education-degree-${educationCount}">Degree</label>
                    <select id="education-degree-${educationCount}">
                        <option value="10th">10th Grade</option>
                        <option value="12th">12th Grade</option>
                        <option value="bachelor">Bachelor's Degree</option>
                        <option value="master">Master's Degree</option>
                        <option value="phd">PhD</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="education-institution-${educationCount}">Institution Name</label>
                    <input type="text" id="education-institution-${educationCount}" placeholder="Enter school/college name">
                </div>
                
                <div class="form-group">
                    <label for="education-grade-${educationCount}">Grade/Percentage/CGPA</label>
                    <input type="text" id="education-grade-${educationCount}" placeholder="e.g. 95%, 9.2 CGPA, etc.">
                </div>
                
                <div class="form-group">
                    <label for="education-year-${educationCount}">Year of Completion</label>
                    <input type="text" id="education-year-${educationCount}" placeholder="e.g. 2015-2016">
                </div>
                
                <button class="remove-btn" onclick="this.parentNode.remove()">Remove</button>
            `;
            educationContainer.appendChild(educationDiv);
            educationCount++;
        }
        
        function addExperienceField() {
            const experienceDiv = document.createElement('div');
            experienceDiv.className = 'experience-item';
            experienceDiv.innerHTML = `
                <div class="form-group">
                    <label for="experience-role-${experienceCount}">Role/Position</label>
                    <input type="text" id="experience-role-${experienceCount}" placeholder="e.g. Software Developer Intern">
                </div>
                
                <div class="form-group">
                    <label for="experience-company-${experienceCount}">Company Name</label>
                    <input type="text" id="experience-company-${experienceCount}" placeholder="Enter company name">
                </div>
                
                <div class="form-group">
                    <label for="experience-duration-${experienceCount}">Duration</label>
                    <input type="text" id="experience-duration-${experienceCount}" placeholder="e.g. June 2020 - August 2020">
                </div>
                
                <div class="form-group">
                    <label for="experience-desc-${experienceCount}">Description</label>
                    <textarea id="experience-desc-${experienceCount}" placeholder="Describe your responsibilities and achievements"></textarea>
                </div>
                
                <button class="remove-btn" onclick="this.parentNode.remove()">Remove</button>
            `;
            experienceContainer.appendChild(experienceDiv);
            experienceCount++;
        }
        
        function addProjectField() {
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project-item';
            projectDiv.innerHTML = `
                <div class="form-group">
                    <label for="project-name-${projectCount}">Project Name</label>
                    <input type="text" id="project-name-${projectCount}" placeholder="Enter project name">
                </div>
                
                <div class="form-group">
                    <label for="project-link-${projectCount}">Project Link (if any)</label>
                    <input type="url" id="project-link-${projectCount}" placeholder="https://example.com/project">
                </div>
                
                <div class="form-group">
                    <label for="project-desc-${projectCount}">Description</label>
                    <textarea id="project-desc-${projectCount}" placeholder="Describe the project and your contributions"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="project-tech-${projectCount}">Technologies Used</label>
                    <input type="text" id="project-tech-${projectCount}" placeholder="e.g. React, Node.js, MongoDB">
                </div>
                
                <button class="remove-btn" onclick="this.parentNode.remove()">Remove</button>
            `;
            projectContainer.appendChild(projectDiv);
            projectCount++;
        }
        
        function addCertificateField() {
            const certificateDiv = document.createElement('div');
            certificateDiv.className = 'certificate-item';
            certificateDiv.innerHTML = `
                <div class="form-group">
                    <label for="certificate-name-${certificateCount}">Certificate Name</label>
                    <input type="text" id="certificate-name-${certificateCount}" placeholder="Enter certificate name">
                </div>
                
                <div class="form-group">
                    <label for="certificate-issuer-${certificateCount}">Issuing Organization</label>
                    <input type="text" id="certificate-issuer-${certificateCount}" placeholder="e.g. Coursera, Udemy">
                </div>
                
                <div class="form-group">
                    <label for="certificate-date-${certificateCount}">Date Obtained</label>
                    <input type="text" id="certificate-date-${certificateCount}" placeholder="e.g. May 2020">
                </div>
                
                <div class="form-group">
                    <label for="certificate-link-${certificateCount}">Certificate Link (if any)</label>
                    <input type="url" id="certificate-link-${certificateCount}" placeholder="https://example.com/certificate">
                </div>
                
                <button class="remove-btn" onclick="this.parentNode.remove()">Remove</button>
            `;
            certificateContainer.appendChild(certificateDiv);
            certificateCount++;
        }

        function addAchievementField() {
            const achievementDiv = document.createElement('div');
            achievementDiv.className = 'achievement-item';
            achievementDiv.innerHTML = `
                <div class="form-group">
                    <label for="achievement-title-${achievementCount}">Achievement Title</label>
                    <input type="text" id="achievement-title-${achievementCount}" placeholder="e.g. Gold Medalist, Topper">
                </div>
                
                <div class="form-group">
                    <label for="achievement-description-${achievementCount}">Description</label>
                    <textarea id="achievement-description-${achievementCount}" placeholder="Describe your achievement"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="achievement-year-${achievementCount}">Year</label>
                    <input type="text" id="achievement-year-${achievementCount}" placeholder="e.g. 2022">
                </div>
                
                <button class="remove-btn" onclick="this.parentNode.remove()">Remove</button>
            `;
            achievementContainer.appendChild(achievementDiv);
            achievementCount++;
        }
        
        // Save all form data to localStorage
        function saveData() {
            const resumeData = {
                personalInfo: {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    linkedin: document.getElementById('linkedin').value,
                    github: document.getElementById('github').value,
                    photo: photoPreview.src || '',
                    title: document.getElementById('title').value
                },
                summary: document.getElementById('summary').value,
                education: [],
                skills: getSelectedSkills(),
                otherSkills: document.getElementById('other-skills').value,
                experience: [],
                projects: [],
                certificates: [],
                achievements: [], // Added achievements array
                languagesKnown: getSelectedLanguages(), // Added languagesKnown
                hobbies: document.getElementById('hobbies').value, // Added hobbies
                codingProfiles: {
                    leetcode: {
                        url: document.getElementById('leetcode').value,
                        solved: document.getElementById('leetcode-solved').value
                    },
                    codechef: {
                        url: document.getElementById('codechef').value,
                        solved: document.getElementById('codechef-solved').value
                    },
                    geeksforgeeks: {
                        url: document.getElementById('geeksforgeeks').value,
                        solved: document.getElementById('geeksforgeeks-solved').value
                    },
                    codeforces: {
                        url: document.getElementById('codeforces').value,
                        solved: document.getElementById('codeforces-solved').value
                    },
                    hackerrank: {
                        url: document.getElementById('hackerrank').value,
                        solved: document.getElementById('hackerrank-solved').value
                    }
                }
            };
            
            // Get education data
            const educationItems = document.querySelectorAll('#education-container .education-item');
            educationItems.forEach((item, index) => {
                resumeData.education.push({
                    degree: document.getElementById(`education-degree-${index}`).value,
                    institution: document.getElementById(`education-institution-${index}`).value,
                    grade: document.getElementById(`education-grade-${index}`).value,
                    year: document.getElementById(`education-year-${index}`).value
                });
            });
            
            // Get experience data
            const experienceItems = document.querySelectorAll('#experience-container .experience-item');
            experienceItems.forEach((item, index) => {
                resumeData.experience.push({
                    role: document.getElementById(`experience-role-${index}`).value,
                    company: document.getElementById(`experience-company-${index}`).value,
                    duration: document.getElementById(`experience-duration-${index}`).value,
                    description: document.getElementById(`experience-desc-${index}`).value
                });
            });
            
            // Get project data
            const projectItems = document.querySelectorAll('#project-container .project-item');
            projectItems.forEach((item, index) => {
                resumeData.projects.push({
                    name: document.getElementById(`project-name-${index}`).value,
                    link: document.getElementById(`project-link-${index}`).value,
                    description: document.getElementById(`project-desc-${index}`).value,
                    technologies: document.getElementById(`project-tech-${index}`).value
                });
            });
            
            // Get certificate data
            const certificateItems = document.querySelectorAll('#certificate-container .certificate-item');
            certificateItems.forEach((item, index) => {
                resumeData.certificates.push({
                    name: document.getElementById(`certificate-name-${index}`).value,
                    issuer: document.getElementById(`certificate-issuer-${index}`).value,
                    date: document.getElementById(`certificate-date-${index}`).value,
                    link: document.getElementById(`certificate-link-${index}`).value
                });
            });

            // Get achievement data
            const achievementItems = document.querySelectorAll('#achievement-container .achievement-item');
            achievementItems.forEach((item, index) => {
                resumeData.achievements.push({
                    title: document.getElementById(`achievement-title-${index}`).value,
                    description: document.getElementById(`achievement-description-${index}`).value,
                    year: document.getElementById(`achievement-year-${index}`).value
                });
            });
            
            // Save to localStorage
            localStorage.setItem('resumeData', JSON.stringify(resumeData));
            alert('Data saved successfully!');
        }
        
        // Get selected skills from checkboxes
        function getSelectedSkills() {
            const checkboxes = document.querySelectorAll('input[name="skills"]:checked');
            return Array.from(checkboxes).map(cb => cb.value);
        }

        // Get selected languages from checkboxes
        function getSelectedLanguages() {
            const checkboxes = document.querySelectorAll('input[name="languages"]:checked');
            return Array.from(checkboxes).map(cb => cb.value);
        }
        
        // Load saved data from localStorage
        function loadSavedData() {
            const savedData = localStorage.getItem('resumeData');
            if (savedData) {
                const resumeData = JSON.parse(savedData);
                
                // Load personal info
                document.getElementById('name').value = resumeData.personalInfo.name || '';
                document.getElementById('email').value = resumeData.personalInfo.email || '';
                document.getElementById('linkedin').value = resumeData.personalInfo.linkedin || '';
                document.getElementById('github').value = resumeData.personalInfo.github || '';
                document.getElementById('title').value = resumeData.personalInfo.title || '';

                if (resumeData.personalInfo.photo) {
                    photoPreview.src = resumeData.personalInfo.photo;
                    photoPreview.style.display = 'block';
                    document.querySelector('.photo-placeholder').style.display = 'none';
                }


                
                // Load summary
                document.getElementById('summary').value = resumeData.summary || '';
                
                // Load education
                if (resumeData.education && resumeData.education.length > 0) {
                    // Remove the initial empty education item
                    educationContainer.innerHTML = '';
                    
                    resumeData.education.forEach((edu, index) => {
                        if (index > 0) {
                            addEducationField();
                        }
                        document.getElementById(`education-degree-${index}`).value = edu.degree || 'bachelor';
                        document.getElementById(`education-institution-${index}`).value = edu.institution || '';
                        document.getElementById(`education-grade-${index}`).value = edu.grade || '';
                        document.getElementById(`education-year-${index}`).value = edu.year || '';
                    });
                }
                
                // Load skills
                if (resumeData.skills && resumeData.skills.length > 0) {
                    const checkboxes = document.querySelectorAll('input[name="skills"]');
                    checkboxes.forEach(checkbox => {
                        checkbox.checked = resumeData.skills.includes(checkbox.value);
                    });
                }
                
                document.getElementById('other-skills').value = resumeData.otherSkills || '';
                
                // Load experience
                if (resumeData.experience && resumeData.experience.length > 0) {
                    // Remove the initial empty experience item
                    experienceContainer.innerHTML = '';
                    
                    resumeData.experience.forEach((exp, index) => {
                        if (index > 0) {
                            addExperienceField();
                        }
                        document.getElementById(`experience-role-${index}`).value = exp.role || '';
                        document.getElementById(`experience-company-${index}`).value = exp.company || '';
                        document.getElementById(`experience-duration-${index}`).value = exp.duration || '';
                        document.getElementById(`experience-desc-${index}`).value = exp.description || '';
                    });
                }
                
                // Load projects
                if (resumeData.projects && resumeData.projects.length > 0) {
                    // Remove the initial empty project item
                    projectContainer.innerHTML = '';
                    
                    resumeData.projects.forEach((proj, index) => {
                        if (index > 0) {
                            addProjectField();
                        }
                        document.getElementById(`project-name-${index}`).value = proj.name || '';
                        document.getElementById(`project-link-${index}`).value = proj.link || '';
                        document.getElementById(`project-desc-${index}`).value = proj.description || '';
                        document.getElementById(`project-tech-${index}`).value = proj.technologies || '';
                    });
                }
                
                // Load certificates
                if (resumeData.certificates && resumeData.certificates.length > 0) {
                    // Remove the initial empty certificate item
                    certificateContainer.innerHTML = '';
                    
                    resumeData.certificates.forEach((cert, index) => {
                        if (index > 0) {
                            addCertificateField();
                        }
                        document.getElementById(`certificate-name-${index}`).value = cert.name || '';
                        document.getElementById(`certificate-issuer-${index}`).value = cert.issuer || '';
                        document.getElementById(`certificate-date-${index}`).value = cert.date || '';
                        document.getElementById(`certificate-link-${index}`).value = cert.link || '';
                    });
                }

                // Load achievements
                if (resumeData.achievements && resumeData.achievements.length > 0) {
                    // Remove the initial empty achievement item
                    achievementContainer.innerHTML = '';
                    
                    resumeData.achievements.forEach((ach, index) => {
                        if (index > 0) {
                            addAchievementField();
                        }
                        document.getElementById(`achievement-title-${index}`).value = ach.title || '';
                        document.getElementById(`achievement-description-${index}`).value = ach.description || '';
                        document.getElementById(`achievement-year-${index}`).value = ach.year || '';
                    });
                }

                // Load languages
                if (resumeData.languagesKnown && resumeData.languagesKnown.length > 0) {
                    const checkboxes = document.querySelectorAll('input[name="languages"]');
                    checkboxes.forEach(checkbox => {
                        checkbox.checked = resumeData.languagesKnown.includes(checkbox.value);
                    });
                }

                // Load hobbies
                document.getElementById('hobbies').value = resumeData.hobbies || '';
                
                // Load coding profiles
                if (resumeData.codingProfiles) {
                    document.getElementById('leetcode').value = resumeData.codingProfiles.leetcode?.url || '';
                    document.getElementById('leetcode-solved').value = resumeData.codingProfiles.leetcode?.solved || '';
                    
                    document.getElementById('codechef').value = resumeData.codingProfiles.codechef?.url || '';
                    document.getElementById('codechef-solved').value = resumeData.codingProfiles.codechef?.solved || '';
                    
                    document.getElementById('geeksforgeeks').value = resumeData.codingProfiles.geeksforgeeks?.url || '';
                    document.getElementById('geeksforgeeks-solved').value = resumeData.codingProfiles.geeksforgeeks?.solved || '';
                    
                    document.getElementById('codeforces').value = resumeData.codingProfiles.codeforces?.url || '';
                    document.getElementById('codeforces-solved').value = resumeData.codingProfiles.codeforces?.solved || '';
                    
                    document.getElementById('hackerrank').value = resumeData.codingProfiles.hackerrank?.url || '';
                    document.getElementById('hackerrank-solved').value = resumeData.codingProfiles.hackerrank?.solved || '';
                }
            }
        }



