export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: string;
  category: 'password' | 'phishing' | 'social' | 'physical' | 'data';
}

export const securityQuestions: Question[] = [
  {
    id: 1,
    question: "What makes a password strong and secure?",
    options: [
      "Using your name and birth year",
      "At least 12 characters with mix of letters, numbers, and symbols",
      "Using the same password for all accounts",
      "Writing it down and keeping it visible"
    ],
    correct: "At least 12 characters with mix of letters, numbers, and symbols",
    category: "password"
  },
  {
    id: 2,
    question: "You receive an urgent email from your 'bank' asking you to click a link to verify your account. What should you do?",
    options: [
      "Click the link immediately to avoid account closure",
      "Forward the email to colleagues for their opinion",
      "Delete the email and contact your bank directly through official channels",
      "Reply to the email asking for more information"
    ],
    correct: "Delete the email and contact your bank directly through official channels",
    category: "phishing"
  },
  {
    id: 3,
    question: "What is two-factor authentication (2FA)?",
    options: [
      "Using two different passwords",
      "An additional security layer requiring a second form of verification",
      "Having two email accounts",
      "Logging in twice to the same account"
    ],
    correct: "An additional security layer requiring a second form of verification",
    category: "password"
  },
  {
    id: 4,
    question: "Someone calls claiming to be from IT support and asks for your password to 'fix your computer'. What should you do?",
    options: [
      "Give them your password since they're from IT",
      "Ask them to call back later",
      "Hang up and contact IT through official channels to verify",
      "Give them a fake password to test them"
    ],
    correct: "Hang up and contact IT through official channels to verify",
    category: "social"
  },
  {
    id: 5,
    question: "What should you do when you're finished working on a shared or public computer?",
    options: [
      "Just close the browser window",
      "Log out of all accounts and clear browser data",
      "Leave everything open for the next person",
      "Only log out of important accounts"
    ],
    correct: "Log out of all accounts and clear browser data",
    category: "physical"
  },
  {
    id: 6,
    question: "Which of these is a sign of a phishing email?",
    options: [
      "Professional company logo and formatting",
      "Urgent language and threats of account closure",
      "Personalized greeting with your full name",
      "Sent during business hours"
    ],
    correct: "Urgent language and threats of account closure",
    category: "phishing"
  },
  {
    id: 7,
    question: "What is the safest way to connect to the internet when working remotely?",
    options: [
      "Use any available public Wi-Fi",
      "Use your company's VPN connection",
      "Connect to your neighbor's Wi-Fi",
      "Use hotel Wi-Fi without any protection"
    ],
    correct: "Use your company's VPN connection",
    category: "data"
  },
  {
    id: 8,
    question: "You find a USB drive in the parking lot. What should you do?",
    options: [
      "Plug it into your work computer to see what's on it",
      "Take it home and check it on your personal computer",
      "Turn it in to security without plugging it in anywhere",
      "Share it with colleagues to help find the owner"
    ],
    correct: "Turn it in to security without plugging it in anywhere",
    category: "physical"
  },
  {
    id: 9,
    question: "How often should you update your passwords?",
    options: [
      "Never, if they're strong enough",
      "Every few years",
      "Regularly, especially if there's been a security breach",
      "Only when you forget them"
    ],
    correct: "Regularly, especially if there's been a security breach",
    category: "password"
  },
  {
    id: 10,
    question: "What information should you never share on social media?",
    options: [
      "Your favorite movies",
      "Work schedules, location details, and personal information",
      "Photos of your lunch",
      "Your opinions on current events"
    ],
    correct: "Work schedules, location details, and personal information",
    category: "social"
  },
  {
    id: 11,
    question: "What should you do if you suspect your computer has been infected with malware?",
    options: [
      "Continue working and ignore it",
      "Try to fix it yourself by downloading antivirus software",
      "Disconnect from the network and contact IT support immediately",
      "Restart your computer and hope it goes away"
    ],
    correct: "Disconnect from the network and contact IT support immediately",
    category: "data"
  },
  {
    id: 12,
    question: "When is it safe to share your login credentials?",
    options: [
      "With your manager when they ask",
      "With trusted colleagues",
      "Never - credentials should never be shared",
      "Only during emergencies"
    ],
    correct: "Never - credentials should never be shared",
    category: "password"
  },
  {
    id: 13,
    question: "What is 'shoulder surfing' in cybersecurity?",
    options: [
      "Surfing the internet over someone's shoulder",
      "Looking over someone's shoulder to steal sensitive information",
      "A type of computer virus",
      "A social media activity"
    ],
    correct: "Looking over someone's shoulder to steal sensitive information",
    category: "physical"
  },
  {
    id: 14,
    question: "How should you handle sensitive company data?",
    options: [
      "Store it on personal devices for easy access",
      "Share it freely with anyone who asks",
      "Follow company data classification and handling policies",
      "Upload it to personal cloud storage"
    ],
    correct: "Follow company data classification and handling policies",
    category: "data"
  },
  {
    id: 15,
    question: "What should you do if you receive a suspicious attachment in an email?",
    options: [
      "Open it to see what it contains",
      "Forward it to colleagues to get their opinion",
      "Don't open it and report it to IT security",
      "Save it to your desktop for later"
    ],
    correct: "Don't open it and report it to IT security",
    category: "phishing"
  }
];