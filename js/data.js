// =========== PROJECT DATA ===========
const projectData = {
    foodforeveryone: {
        title: "Food For Everyone",
        image: "assets/images/cover.png",
        description: "Web application designed to help restaurants distribute leftover products after operating hours to reduce food waste.",
        longDescription: "Food For Everyone is a comprehensive web application designed to help restaurants and other food businesses distribute their leftover products after their operating hours have ended. This platform aims to reduce financial losses for businesses in the food and beverage sector, while simultaneously assisting low-income communities in the surrounding area.",
        technologies: ["Laravel 11 Breeze", "PHP", "JavaScript", "CSS", "HTML", "MySQL", "Laragon"],
        features: [
            "Restaurant registration and profile management",
            "Real-time food inventory tracking",
            "Location-based food distribution system",
            "Community recipient registration",
            "Automated notification system for available food",
            "Admin dashboard for monitoring distributions",
            "Food waste analytics and reporting",
            "Rating and feedback system"
        ],
        challenges: "Main challenges included implementing real-time inventory updates, creating an efficient matching algorithm between food availability and community needs, and ensuring food safety protocols are maintained throughout the distribution process.",
        results: "Successfully connected 50+ restaurants with local communities, reducing food waste by an estimated 30% and providing meals for over 1000 families during the project period.",
        duration: "Oct 2024 - Feb 2025",
        role: "Full Stack Developer (Backend & Frontend)",
        github: "https://github.com/YanStephen29/food-for-everyone",
        demo: null
    },
    iotparking: {
        title: "IoT Smart Parking Detector",
        image: "assets/images/smart-parking.jpg",
        description: "IoT-based smart parking system providing real-time monitoring of parking space availability with automated access control.",
        longDescription: "The objective of this project is to develop a smart parking system using the Internet of Things (IoT) to provide real-time monitoring of parking space availability. This system is engineered to optimize parking efficiency by delivering instant information to users about vacant slots and controlling vehicle access automatically via sensors and actuators.",
        technologies: ["Python", "HTML", "Firebase", "AES 128 Security", "Thonny IDE", "IoT Sensors", "Microcontrollers"],
        features: [
            "Real-time parking space detection using IoT sensors",
            "Automated vehicle access control system",
            "Web-based monitoring dashboard",
            "Mobile app for finding available spaces",
            "Data encryption with AES 128 security",
            "Historical parking data analytics",
            "Alert system for maintenance issues",
            "Multi-level parking support"
        ],
        challenges: "Key challenges included ensuring sensor accuracy in various weather conditions, optimizing battery life for wireless sensors, implementing secure data transmission, and creating a responsive user interface that works reliably with real-time data updates.",
        results: "Successfully deployed in test environment with 99.2% sensor accuracy, reduced average parking search time by 60%, and achieved 95% user satisfaction in usability testing.",
        duration: "Mar 2025 - Jun 2025",
        role: "Backend Developer & IoT Engineer",
        github: "https://github.com/YanStephen29/iot-smart-parking",
        demo: null
    },
    peduliyuk: {
        title: "PeduliYuk Mobile App",
        image: "assets/images/cover_py.jpg",
        description: "Flutter-based mobile application developed to mitigate fast fashion impact by connecting donors with non-profit organizations.",
        longDescription: "PeduliYuk is a Flutter-based mobile application developed to mitigate the impact of fast fashion in Indonesia. It streamlines the process of donating pre-loved items by connecting the public with non-profit organizations. The app features an integrated system to simplify the entire cycle of donation, distribution, and social aid tracking.",
        technologies: ["Flutter", "Dart", "PHP", "MySQL", "REST API"],
        features: [
            "User-friendly donation item cataloging with photos",
            "NGO registration and verification system",
            "Real-time donation tracking and status updates",
            "Location-based NGO discovery",
            "In-app messaging between donors and NGOs",
            "Donation history and impact analytics",
            "Item condition assessment tools",
            "Push notifications for donation updates"
        ],
        challenges: "Main challenges included designing an intuitive user flow for both donors and NGOs, implementing efficient image compression for item photos, creating a robust matching algorithm between donations and NGO needs, and ensuring data privacy compliance.",
        results: "Successfully facilitated over 500 donations, connected 25+ verified NGOs with the community, and achieved 4.7/5 app store rating with positive feedback on user experience and social impact.",
        duration: "Apr 2025 - Jul 2025",
        role: "Full Stack Mobile Developer (Backend & Frontend)",
        github: "https://github.com/YanStephen29/peduliyuk-app",
        demo: null
    },
    wasteml: {
        title: "Waste Classification ML",
        image: "assets/images/ml4.jpg",
        description: "Deep learning system for automatic waste classification into six categories using CNN architectures and transfer learning.",
        longDescription: "This project develops a waste classification system utilizing deep learning techniques. Its objective is to automatically categorize waste images into six distinct classes: cardboard, glass, metal, paper, plastic, and trash. The performance of three popular pre-trained Convolutional Neural Network (CNN) architectures is evaluated and compared using transfer learning: VGG19, ResNet50, and EfficientNetB0.",
        technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "NumPy", "Pandas", "Matplotlib", "VSCode", "VGG19", "ResNet50", "EfficientNetB0"],
        features: [
            "Multi-class waste image classification (6 categories)",
            "Transfer learning with pre-trained CNN models",
            "Comparative analysis of VGG19, ResNet50, and EfficientNetB0",
            "Real-time image preprocessing and augmentation",
            "Model performance evaluation and metrics",
            "Confusion matrix and accuracy visualization",
            "Batch prediction capabilities",
            "Model export for deployment"
        ],
        challenges: "Key challenges included handling imbalanced dataset across waste categories, optimizing model performance for real-world diverse waste images, implementing effective data augmentation techniques, and comparing different architectures to find the best performing model for deployment.",
        results: "Achieved 94.2% accuracy with EfficientNetB0 (best performing model), 91.8% with ResNet50, and 89.5% with VGG19. Successfully classified over 10,000 test images with reliable performance across all waste categories.",
        duration: "May 2025 - Jul 2025",
        role: "Machine Learning Engineer",
        github: "https://github.com/YanStephen29/waste-classification-ml",
        demo: null
    }
};

// =========== ORGANIZATION DATA ===========
const orgData = {
    external: {
        title: "Head of External Relations Department",
        organization: "Computer Science Student Association",
        period: "December 2024 - Present",
        description: "Supervising division heads and seeking organizational development opportunities through strategic partnerships.",
        longDescription: "As Head of External Relations Department, I supervise and instruct the division heads of Partnership Relations and Community Service while seeking opportunities for organizational development by establishing relationships with companies and other student associations.",
        responsibilities: [
            "Supervising and instructing division heads of Partnership Relations and Community Service",
            "Seeking opportunities for organizational development",
            "Establishing relationships with companies and other student associations",
            "Coordinating external relations strategies",
            "Managing partnership development initiatives",
            "Overseeing community service programs"
        ],
        achievements: [
            "Conducted community service at 1 orphanage",
            "Organized charity event during Ramadan month",
            "Established partnerships with companies providing internship opportunities for next generation students",
            "Built cooperation with several related parties",
            "Achieved 80% member effectiveness"
        ],
        skills: ["Leadership", "Partnership Development", "Community Relations", "Strategic Planning", "Team Management"],
        impact: "Enhanced organizational external relations and created valuable opportunities for student development through strategic partnerships and community engagement."
    },
    atcs8: {
        title: "Chief Executive",
        organization: "Academic Training Computer Science 8.0",
        period: "November 2024 - May 2025",
        description: "Leading the complete project management and strategic direction of the academic training event.",
        longDescription: "As Chief Executive of Academic Training Computer Science 8.0, I supervised and held full responsibility for the event committee throughout the entire project lifecycle while devising the core concept, structure, and objectives for the event.",
        responsibilities: [
            "Supervising the entire event committee throughout project lifecycle",
            "Holding full responsibility for project management",
            "Devising core concept, structure, and objectives for the event",
            "Strategic planning and implementation",
            "Budget management and resource allocation",
            "Stakeholder coordination and communication"
        ],
        achievements: [
            "Achieved participant graduation rate of more than 70%",
            "Met desired targets from both participants and faculty",
            "Successfully managed complex event logistics",
            "Led diverse team of committee members",
            "Delivered comprehensive training program",
            "Established strong industry partnerships"
        ],
        skills: ["Executive Leadership", "Project Management", "Strategic Planning", "Team Coordination", "Event Management"],
        impact: "Successfully delivered a comprehensive academic training program that enhanced technical skills and career readiness for computer science students."
    },
    citeup: {
        title: "Head of Logistics Department",
        organization: "Cite Up 2023",
        period: "March 2024 - September 2024",
        description: "Managing logistics operations and ensuring timely project execution for the event.",
        longDescription: "As Head of Logistics Department for Cite Up 2023, I managed the job descriptions and tasks for the consumption and equipment divisions while ensuring the project timeline was followed according to the predetermined schedule.",
        responsibilities: [
            "Managing job descriptions and tasks for consumption and equipment divisions",
            "Ensuring project timeline adherence to predetermined schedule",
            "Coordinating logistics operations",
            "Supervising equipment and supply management",
            "Managing team workflow and efficiency",
            "Quality control and timeline management"
        ],
        achievements: [
            "Achieved 80% work effectiveness",
            "Gained full respect from every division member",
            "Achieved 0% equipment shortage on event day",
            "Successfully coordinated complex logistics operations",
            "Maintained high team morale and performance",
            "Delivered flawless event execution"
        ],
        skills: ["Logistics Management", "Team Leadership", "Project Coordination", "Resource Planning", "Quality Control"],
        impact: "Ensured seamless event execution through effective logistics management and strong team leadership, achieving zero equipment shortages on the critical event day."
    },
    partnership: {
        title: "Head of Partnership and Cooperation Division",
        organization: "Computer Science Student Association",
        period: "February 2024 - November 2024",
        description: "Establishing strategic partnerships and collaboration opportunities for organizational development.",
        longDescription: "As Head of Partnership and Cooperation Division, I sought potential partners to create development opportunities for the association while initiating contact and responding to inquiries from external parties interested in collaboration.",
        responsibilities: [
            "Seeking potential partners to create development opportunities for the association",
            "Initiating contact and responding to inquiries from external parties",
            "Organizing events with parties that agreed to collaborate",
            "Attending events with other universities' computer science departments",
            "Searching for companies to conduct industrial visits",
            "Developing partnership strategies and proposals"
        ],
        achievements: [
            "Established good relationships with 4 universities and departments in the same field",
            "Secured cooperation and benefits with 4 companies",
            "Conducted industrial visits to technology companies",
            "Connected and collaborated with chemistry department",
            "Expanded organizational network significantly",
            "Created valuable learning opportunities for members"
        ],
        skills: ["Partnership Development", "Business Relations", "Networking", "Strategic Communication", "Event Coordination"],
        impact: "Successfully expanded the association's industry network and created valuable opportunities for member professional development through strategic partnerships."
    },
    atcs7: {
        title: "Public Relations Team Member",
        organization: "Academic Training Computer Science 7.0",
        period: "November 2023 - May 2024",
        description: "Coordinating communications and managing relationships with speakers and participants.",
        longDescription: "As a Public Relations Team Member for Academic Training Computer Science 7.0, I was responsible for contacting speakers and participants to coordinate schedules and presentation materials while assisting and supervising them throughout the event.",
        responsibilities: [
            "Contacting speakers and participants to coordinate schedules and presentation materials",
            "Assisting and supervising speakers and participants throughout the event",
            "Contacting and informing faculty about the event",
            "Confirming attendance of speakers and invited guests",
            "Managing communication channels",
            "Coordinating event logistics and participant needs"
        ],
        achievements: [
            "Successfully obtained speakers appropriate to the themes to be presented",
            "Achieved 60% member graduation rate in this event",
            "Maintained effective communication with all stakeholders",
            "Ensured smooth coordination between speakers and participants",
            "Built strong relationships with faculty and external speakers",
            "Contributed to successful event execution"
        ],
        skills: ["Public Relations", "Communication", "Event Coordination", "Stakeholder Management", "Administrative Support"],
        impact: "Facilitated effective communication and coordination that contributed to a successful academic training event with meaningful learning outcomes for participants."
    }
};
