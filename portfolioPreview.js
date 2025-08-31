
document.addEventListener('DOMContentLoaded', () => {

    const storedImage = localStorage.getItem('profileImage');
    if (storedImage) {
        const portfolioImg = document.getElementById('portfolio-photo');
        portfolioImg.src = storedImage;
        portfolioImg.alt = "Profile Picture";
    }

  const storedData = localStorage.getItem('resumeData');
  if (storedData) {
    const parsedData = JSON.parse(storedData);
    document.getElementById('myName').innerText = parsedData.personalInfo.name;
    document.getElementById('myEmail').innerText = parsedData.personalInfo.email;
    document.getElementById('myEmail').href = `mailto:${parsedData.personalInfo.email}`;
    document.getElementById('myLinkedIn').href = parsedData.personalInfo.linkedin;
    document.getElementById('myGithub').href = parsedData.personalInfo.github;

    if (parsedData?.personalInfo?.photo) {
        const profileImg = document.getElementById('portfolio-photo');
        profileImg.src = parsedData.personalInfo.photo;
        profileImg.style.display = 'block'; // if hidden by default
    }


    // adding the profile summary
    document.getElementById('profileSummaryContent').innerText=parsedData.summary;

    //adding the education
    let eduList = "";
    parsedData.education.forEach(element => {
        eduList += `<li>${element.degree} | ${element.institution} | ${element.grade} | (${element.year})</li>`;
    });
    document.getElementById('educationContent').innerHTML = `<ul style="margin-left: 20px;">${eduList}</ul>`;

    //adding the skills
    const skillLogo={
     
           HTML : `<i class="devicon-html5-plain colored" title="HTML"></i>`,
           CSS : `<i class="devicon-css3-plain colored" title="CSS"></i>`,
           JavaScript: `<i class="devicon-javascript-plain colored" title="JavaScript"></i>`,
            Python: `<i class="devicon-python-plain colored" title="Python"></i>`,
            Java : `<i class="devicon-java-plain colored" title="Java"></i>`,
            C : `<i class="devicon-c-plain colored" title="C"></i>`,
            'C++' : `<i class="devicon-cplusplus-plain colored" title="C++"></i>`,
            'C#' : `<i class="devicon-csharp-plain colored" title="C#"></i>`,
            PHP : `<i class="devicon-php-plain colored" title="PHP"></i>`,
            Ruby : `<i class="devicon-ruby-plain colored" title="Ruby"></i>`,
            Go : `<i class="devicon-go-plain colored" title="Go"></i>`,
            Swift : `<i class="devicon-swift-plain colored" title="Swift"></i>`,
            Kotlin : `<i class="devicon-kotlin-plain colored" title="Kotlin"></i>`,
            SQL : `<i class="devicon-mysql-plain colored" title="SQL (MySQL)"></i>`,

    
            React : `<i class="devicon-react-original colored" title="React"></i>`,
            Angular : `<i class="devicon-angularjs-plain colored" title="Angular"></i>`,
            Vue : `<i class="devicon-vuejs-plain colored" title="Vue.js"></i>`,

            //  Backend / Frameworks
            'Node.js' : `<i class="devicon-nodejs-plain colored" title="Node.js"></i>`,
            Express : `<i class="devicon-express-original colored" title="Express.js" style="color: white;"></i> `,
            Django : `<i class="devicon-django-plain colored" title="Django"></i>`,
            Flask : `<i class="devicon-flask-original colored" title="Flask"></i>`,
            Spring : `<i class="devicon-spring-plain colored" title="Spring"></i>`,

            //  Tools / Platforms 
            Git : `<i class="devicon-git-plain colored" title="Git"></i>`,
            Docker : `<i class="devicon-docker-plain colored" title="Docker"></i>`,
            AWS : `<i class="devicon-amazonwebservices-original colored" title="AWS"></i>`,
            Azure : `<i class="devicon-azure-plain colored" title="Azure"></i>`,
            Linux : `<i class="devicon-linux-plain colored" title="Linux"></i>`,
            Bash: `<i class="devicon-bash-plain colored" title="Bash"></i>`,

    }
    let skillList = "";
    parsedData.skills.forEach(element => {
        let logo=skillLogo[element];
        skillList += `<li>${logo} ${element}</li>`;
    });
    document.getElementById('skillsContent').innerHTML = `<ul style="margin-left: 20px;">${skillList}</ul>`;



    // adding professional experience
    let experienceList = "";
    parsedData.experience.forEach(element => {
        experienceList += `
            <li style="margin-bottom: 1rem;">
                <div style="font-weight: bold; font-size: 1.1rem;">${element.role}</div>
                <div style="color: #666; font-size: 0.9rem; margin-top: 2px;">
                    ${element.company} | ${element.duration}
                </div>
                <div style="margin-left: 15px; margin-top: 5px;">
                    ${element.description}
                </div>
            </li>
        `;
    });
    document.getElementById('professionalExperienceContent').innerHTML = `<ul style="list-style-type: disc; padding-left: 20px;">${experienceList}</ul>`;


    //adding projects 
    let projectList = "";
    parsedData.projects.forEach(project => {
        projectList += `
            <li style="margin-bottom: 1.2rem;">
                <div style="font-weight: bold; font-size: 1.1rem;">
                    ${project.name}
                    ${project.link ? `<a href="${project.link}" target="_blank" style="font-size: 0.8rem; color: #007bff; margin-left: 10px;">[View]</a>` : ""}
                </div>
                <div style="color: #2c2c2c; font-size: 0.92rem; margin-top: 2px;">
                    <span style="font-weight: 600;">Technologies:</span> ${project.technologies}
                </div>
                <div style="margin-left: 15px; margin-top: 5px;">
                    ${project.description}
                </div>
            </li>
        `;
    });
    document.getElementById('projectsContent').innerHTML = `<ul style="list-style-type: disc; padding-left: 20px;">${projectList}</ul>`;

    //adding certificates
    let certificateList = "";
    parsedData.certificates.forEach(cert => {
        certificateList += `
            <li style="margin-bottom: 1.2rem; list-style: none;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 28px;
                        height: 28px;
                        border-radius: 50%;
                        background-color: #e0f0ff;
                    ">
                        <i class="fas fa-certificate" style="color: #007bff;"></i>
                    </span>
                    <div style="font-weight: bold; font-size: 1.05rem;">
                        ${cert.name}
                        ${cert.link ? `<a href="${cert.link}" target="_blank" style="font-size: 0.85rem; color: #007bff; margin-left: 10px;">[View]</a>` : ""}
                    </div>
                </div>
                <div style="color: #2c2c2c; font-size: 0.9rem; margin-left: 38px; margin-top: 3px;">
                    ${cert.issuer} | ${cert.date}
                </div>
            </li>
        `;
    });
    document.getElementById('certificatesContent').innerHTML = `<ul style="padding-left: 0;">${certificateList}</ul>`;


    //adding achievements
    let achievementList = "";
    parsedData.achievements.forEach(achievement => {
        achievementList += `
            <li style="margin-bottom: 1.2rem; list-style: none;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 28px;
                        height: 28px;
                        border-radius: 50%;
                        background-color: #ffeac1;
                    ">
                        <i class="fas fa-trophy" style="color: #ff9900;"></i>
                    </span>
                    <div style="font-weight: bold; font-size: 1.05rem;">
                        ${achievement.title} <span style="color: #555; font-size: 0.9rem;">(${achievement.year})</span>
                    </div>
                </div>
                ${achievement.description
                    ? `<div style="margin-left: 38px; margin-top: 3px; font-size: 0.92rem; color: #2c2c2c;">
                        ${achievement.description}
                    </div>`
                    : ""
                }
            </li>
        `;
    });
    document.getElementById('achievementsContent').innerHTML = `<ul style="padding-left: 0;">${achievementList}</ul>`;


    //adding coding profiles
    const codingProfiles = parsedData.codingProfiles;

    let codingProfilesHTML = "";

    const platforms = {
        leetcode: "LeetCode",
        codechef: "CodeChef",
        geeksforgeeks: "GeeksforGeeks",
        codeforces: "Codeforces",
        hackerrank: "HackerRank"
    };

    Object.keys(platforms).forEach(platform => {
        const data = codingProfiles[platform];
        if (data && data.url) {
            codingProfilesHTML += `
                <li style="margin-bottom: 1.2rem; list-style: none;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="
                            display: inline-flex;
                            align-items: center;
                            justify-content: center;
                            width: 28px;
                            height: 28px;
                            border-radius: 50%;
                            background-color: #dbeafe;
                        ">
                            <i class="fas fa-code" style="color: #2563eb;"></i>
                        </span>
                        <div>
                            <strong><a href="${data.url}" target="_blank" style="text-decoration: none; color: #111;">${platforms[platform]}</a></strong>
                            ${data.solved ? `<div style="font-size: 0.9rem; color: #444; margin-top: 2px;">Solved: ${data.solved} problems</div>` : ""}
                        </div>
                    </div>
                </li>
            `;
        }
    });

    document.getElementById("codingProfilesContent").innerHTML = `<ul style="padding-left: 0;">${codingProfilesHTML}</ul>`;

    // adding Languages known
    const languages = parsedData.languagesKnown;

    let languageHTML = "";
    languages.forEach(lang => {
        languageHTML += `
            <div style="margin-bottom: 6px; font-size: 1rem; color: #222;">
                ${lang}
            </div>
        `;
    });

    document.getElementById("languagesContent").innerHTML = languageHTML;

    //adding hobbies
    const hobbiesString = parsedData.hobbies; 

    if (hobbiesString && hobbiesString.trim() !== "") {
        const hobbiesArray = hobbiesString.split(',').map(hobby => hobby.trim());

        let hobbiesHTML = "";
        hobbiesArray.forEach(hobby => {
            hobbiesHTML += `
                <div style="margin-bottom: 6px; font-size: 1rem; color: #222;">
                    ${hobby}
                </div>
            `;
        });

        document.getElementById("hobbiesContent").innerHTML = hobbiesHTML;
    }



  } else {
        alert("No data found");
    }

});
