export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export const securityQuestions: Question[] = [
  {
    id: 1,
    question: "While working from home, you receive a phone call from an engineer at Microsoft stating that there is an issue with your computer; what should you do?",
    options: [
      "Follow their instructions as they explain how to enable remote assistance.",
      "Explain that they have reached the wrong department and suggest they call IT.",
      "Listen carefully because you want your computer to stay secure and up to date.",
      "Tell this person that you need to check this out with your IT/security team before doing anything, and hang up."
    ],
    correctAnswer: "Tell this person that you need to check this out with your IT/security team before doing anything, and hang up.",
    explanation: "This is a classic social engineering attack. Legitimate companies like Microsoft never cold-call users about computer issues. Always verify through official channels."
  },
  {
    id: 2,
    question: "When you are surfing the internet, and a window unexpectedly opens asking for your personal information, what should you do?",
    options: [
      "Enter your work information, so you can access the page.",
      "Close the website, because protecting your personal information is very important.",
      "Turn off your cookies so that your activity is not tracked.",
      "Enter your personal information, so you can access the page."
    ],
    correctAnswer: "Close the website, because protecting your personal information is very important.",
    explanation: "Unexpected pop-ups requesting personal information are typically malicious. Never enter personal or work information in such pop-ups."
  },
  {
    id: 3,
    question: "You receive a calendar invite with a meeting link that directs you to join a meeting you don't remember accepting. What is the best course of action?",
    options: [
      "Don't click the link on your calendar; go to the official web conferencing site directly, and enter the meeting number there.",
      "Click the link to see if it is a meeting, and if anything suspicious occurs, report it to IT security.",
      "Delete the calendar event, and carry on with your day.",
      "Forward the calendar event to a coworker to ask their opinion on whether it seems suspicious to them."
    ],
    correctAnswer: "Don't click the link on your calendar; go to the official web conferencing site directly, and enter the meeting number there.",
    explanation: "This prevents potential malicious links while still allowing legitimate meeting access through official channels."
  },
  {
    id: 4,
    question: "Which of the following links for Microsoft's website would you feel least secure clicking on?",
    options: [
      "https://office.microsoft.com",
      "https://www.outlook.msftemail.com",
      "https://www.microsoft.com/outlook",
      "http://www.microsoft.com"
    ],
    correctAnswer: "https://www.outlook.msftemail.com",
    explanation: "This domain contains 'msftemail.com' which is not Microsoft's official domain. Legitimate Microsoft domains use 'microsoft.com'."
  },
  {
    id: 5,
    question: "You receive text messages from an unknown phone number saying they are from the financial planning team and want to discuss your upcoming employment benefit options. What should you do?",
    options: [
      "Report the text to HR and/or IT to validate its authenticity.",
      "Call the number to verify they are a legitimate financial company.",
      "Do not reply, and delete the text message.",
      "Text the number back, asking for additional information about your options."
    ],
    correctAnswer: "Report the text to HR and/or IT to validate its authenticity.",
    explanation: "Always verify unsolicited communications through official channels rather than engaging directly with unknown contacts."
  },
  {
    id: 6,
    question: "Which of the following is an example of two-factor authentication?",
    options: [
      "Entering your credentials and completing a reCAPTCHA puzzle to prove you are not a robot.",
      "Logging in using your username and password twice.",
      "Using your thumbprint to unlock your mobile device.",
      "Logging in using your credentials and authorizing a push notification to an app on your smartphone."
    ],
    correctAnswer: "Logging in using your credentials and authorizing a push notification to an app on your smartphone.",
    explanation: "True 2FA requires two different factors: something you know (password) and something you have (smartphone with push notification)."
  },
  {
    id: 7,
    question: "Which of the following is not a possible outcome of employees sharing passwords?",
    options: [
      "Coworkers are able to tell who made changes to a shared spreadsheet containing customer data.",
      "A terminated coworker can still access organizational information because they know the common usernames and passwords.",
      "A hacker gains access to multiple systems within the organization because of the shared credentials.",
      "The IT team cannot identify the source of unauthorized network access because multiple individuals use the same credentials."
    ],
    correctAnswer: "Coworkers are able to tell who made changes to a shared spreadsheet containing customer data.",
    explanation: "Shared passwords make it impossible to track individual accountability, so this would NOT be a possible outcome."
  },
  {
    id: 8,
    question: "Which of the following social media friend requests seems most suspicious?",
    options: [
      "A request from someone that you recognize, but the account is new and has very little activity",
      "A request from someone you don't recognize with no shared connections or original content",
      "A request from someone you don't recognize, but they have some common connections and a mix of original and shared content",
      "A request from someone you recognize who has several common connections and a mix of original and shared content"
    ],
    correctAnswer: "A request from someone you don't recognize with no shared connections or original content",
    explanation: "Complete strangers with no connections and no original content are the most suspicious as they lack any legitimacy indicators."
  },
  {
    id: 9,
    question: "Which of the following behaviors will help protect you from a phishing attack?",
    options: [
      "Emailing the sender to verify links in unexpected emails",
      "Trusting that antivirus software will protect you",
      "Always thinking before you click",
      "All of the above"
    ],
    correctAnswer: "Always thinking before you click",
    explanation: "Critical thinking before clicking is the most effective defense against phishing attacks."
  },
  {
    id: 10,
    question: "Which of the following is false while working from home?",
    options: [
      "Your workplace security policies no longer apply.",
      "All breaches to your organization's security policy need to be reported.",
      "You should turn off all home listening devices (such as Alexa or Siri).",
      "You need to be extra careful about which websites you visit."
    ],
    correctAnswer: "Your workplace security policies no longer apply.",
    explanation: "Workplace security policies still apply when working from home. This statement is FALSE."
  },
  {
    id: 11,
    question: "What is the first question you should always ask yourself before posting anything on social media?",
    options: [
      "If this information were to be seen by my coworkers, what would they say?",
      "If this information were to go viral, would it benefit my organization with increased publicity?",
      "If this information were to be seen by my family, what would they say?",
      "If this information were to be seen by someone I don't trust, how could it be used?"
    ],
    correctAnswer: "If this information were to be seen by someone I don't trust, how could it be used?",
    explanation: "This question addresses potential security risks and malicious use of information by threat actors."
  },
  {
    id: 12,
    question: "When is it safe to open an unexpected email attachment?",
    options: [
      "When it arrives from a trusted source during normal business hours and passes an antivirus scan successfully.",
      "After verifying using a different communication method.",
      "When it arrives from a trusted source.",
      "After it passes an antivirus scan successfully."
    ],
    correctAnswer: "After verifying using a different communication method.",
    explanation: "Even trusted sources can be compromised. Always verify through alternative communication channels."
  },
  {
    id: 13,
    question: "Which of the following actions reduces your risk from malware on a mobile device?",
    options: [
      "Installing security patches delivered by text message",
      "Reviewing all prompts to change app permissions.",
      "Using auto-login features so hackers cannot see you enter passwords",
      "All of the above"
    ],
    correctAnswer: "Reviewing all prompts to change app permissions.",
    explanation: "Carefully reviewing app permission requests helps prevent malicious apps from accessing sensitive data."
  },
  {
    id: 14,
    question: "Which of the following is an example of tailgating?",
    options: [
      "When someone follows you past the front desk carrying coffee without scanning their badge.",
      "When someone creates an online profile that follows your activity very closely",
      "When someone gives you a flash drive labeled 'Confidential Salary Information' that really contains malware",
      "When someone poses as a contractor and asks questions about your organization's security systems."
    ],
    correctAnswer: "When someone follows you past the front desk carrying coffee without scanning their badge.",
    explanation: "Tailgating is the physical security breach of following someone through a secure entry without proper authentication."
  },
  {
    id: 15,
    question: "Whose actions best help to protect the organization from online and social engineering threats?",
    options: [
      "Leadership's actions because they are a bigger target.",
      "My actions because they are the only ones I can control.",
      "The IT and Security teams' actions because that's their job.",
      "Everyone's actions because we all share the responsibility."
    ],
    correctAnswer: "Everyone's actions because we all share the responsibility.",
    explanation: "Cybersecurity is a shared responsibility across all employees, not just IT or leadership."
  },
  {
    id: 16,
    question: "Which of the following email types should be reported as suspicious?",
    options: [
      "Any email from an unknown sender",
      "Any email from a known sender containing an attachment",
      "Any email from any sender with an unexpected attachment",
      "Any email from a known sender containing a link"
    ],
    correctAnswer: "Any email from any sender with an unexpected attachment",
    explanation: "Unexpected attachments from any sender should be treated as suspicious, regardless of the sender's apparent trustworthiness."
  },
  {
    id: 17,
    question: "You receive an email about an unexpected package that could not be delivered, asking you to call the number provided to rearrange delivery. What should you do?",
    options: [
      "Stop, think, and check if the email and phone number are legitimate before taking any action.",
      "Call the number listed in the email to confirm the delivery address.",
      "Email them back to ask who or where the package came from.",
      "All of the above"
    ],
    correctAnswer: "Stop, think, and check if the email and phone number are legitimate before taking any action.",
    explanation: "This is a common phishing tactic. Always verify through official channels rather than using contact information in suspicious emails."
  },
  {
    id: 18,
    question: "Your manager leaves you a voicemail asking for your password to get an urgently needed file. What should you do?",
    options: [
      "Give your password over the phone since this is an urgent request.",
      "Remind your manager of organizational password policies and procedures.",
      "Call your manager back to make sure the request is legitimate.",
      "Email your password to your manager to make sure no one overhears it."
    ],
    correctAnswer: "Call your manager back to make sure the request is legitimate.",
    explanation: "Never share passwords, even with managers. Verify the request through direct communication and remind them of proper procedures."
  },
  {
    id: 19,
    question: "Which of the following actions should you avoid when using free Wi-Fi?",
    options: [
      "Checking your email",
      "Checking the latest news",
      "Watching a YouTube video",
      "Browsing a restaurant menu"
    ],
    correctAnswer: "Checking your email",
    explanation: "Email often contains sensitive information and should not be accessed over unsecured public Wi-Fi networks."
  },
  {
    id: 20,
    question: "Content posted to social media websites often reaches a broader audience than intended. Which of the following can you configure to control who sees your content?",
    options: [
      "Cookie settings",
      "Publicity settings",
      "Notification settings",
      "Privacy settings"
    ],
    correctAnswer: "Privacy settings",
    explanation: "Privacy settings control who can see your posts, profile information, and other content on social media platforms."
  },
  {
    id: 21,
    question: "A website is safe to browse if...",
    options: [
      "It is a known, legitimate site and has been approved by IT.",
      "The URL begins with 'https://'.",
      "Access to the site has not been blocked by IT.",
      "The link was included in an email from a friend or colleague."
    ],
    correctAnswer: "It is a known, legitimate site and has been approved by IT.",
    explanation: "IT approval ensures the site meets organizational security standards. HTTPS alone doesn't guarantee safety."
  },
  {
    id: 22,
    question: "A coworker whom you've never interacted with before sends you an email asking you to click a link. When is it safe to open unexpected links?",
    options: [
      "After verifying using a different communication method.",
      "After the email passes the spam filter or firewall that the IT Security team put in place to protect us",
      "When the email arrives from a trusted source during normal business hours",
      "When the email arrives during normal business hours and is marked as an internal communication"
    ],
    correctAnswer: "After verifying using a different communication method.",
    explanation: "Always verify unexpected link requests through alternative communication channels, even from internal sources."
  },
  {
    id: 23,
    question: "You receive an email requesting that you purchase an online Amazon gift card for an important client and forward it to your boss right away. They are meeting with the client right now and need this done before the meeting is over to close the big deal. What should you do?",
    options: [
      "Verify it's your boss by contacting them via phone or text message.",
      "You don't want to cause any delay, so purchase the gift card and forward it in a timely fashion.",
      "Reply to the email asking your boss if they are sure, thus confirming before taking an action.",
      "Delete the message as it is likely a scam."
    ],
    correctAnswer: "Verify it's your boss by contacting them via phone or text message.",
    explanation: "This is a classic CEO fraud/business email compromise attack. Always verify through direct communication."
  },
  {
    id: 24,
    question: "Which of the following social media friend requests seems least suspicious?",
    options: [
      "A request from someone you recognize; the account is new and has very little activity.",
      "A request from someone you don't recognize, but you have connections in common, and they post a mixture of original and reposted content.",
      "A request from someone you recognize and share common connections with, who posts a mixture of original and reposted content.",
      "A request from someone you don't recognize is not necessarily suspicious when you want to grow your network."
    ],
    correctAnswer: "A request from someone you recognize and share common connections with, who posts a mixture of original and reposted content.",
    explanation: "This option has the most legitimacy indicators: recognition, common connections, and authentic-looking content."
  },
  {
    id: 25,
    question: "You open an email and accidentally download an unknown attachment. What should you do?",
    options: [
      "Report the email as suspicious and inform IT.",
      "Report the email as suspicious and delete the attachment.",
      "Delete the email, and empty the system's trash can.",
      "Contact the sender of the email to ask about the attached file."
    ],
    correctAnswer: "Report the email as suspicious and inform IT.",
    explanation: "IT needs to be informed immediately to assess potential malware infection and take appropriate remediation steps."
  },
  {
    id: 26,
    question: "Which of the following links for Google's website would you feel least secure clicking on?",
    options: [
      "https://mail.google.com",
      "https://www.google.com/mail",
      "http://www.gmail.com",
      "https://gmail.net-login.com"
    ],
    correctAnswer: "https://gmail.net-login.com",
    explanation: "This is a suspicious domain trying to impersonate Gmail. Legitimate Google domains use google.com or gmail.com."
  },
  {
    id: 27,
    question: "Which of the following is an example of acting as a 'human firewall'?",
    options: [
      "Leaving your system unlocked when you step away for a moment",
      "Holding the door for someone who has their hands full",
      "Stopping someone to ask for their badge before letting them into the office",
      "Checking that the fire exits are clear"
    ],
    correctAnswer: "Stopping someone to ask for their badge before letting them into the office",
    explanation: "Acting as a human firewall means being the human element that enforces security policies, like verifying credentials."
  },
  {
    id: 28,
    question: "When traveling for work, which of the following should you do?",
    options: [
      "Move all the work files needed for your trip to your personal file sharing network so you can access them without compromising your organization's network.",
      "Leave your work devices at home to ensure they are secure, and only use your personal devices.",
      "Make sure your manager and/or IT know you will be traveling and review the appropriate policy(s).",
      "All of the above"
    ],
    correctAnswer: "Make sure your manager and/or IT know you will be traveling and review the appropriate policy(s).",
    explanation: "Proper travel protocol includes informing management and following organizational security policies for travel."
  },
  {
    id: 29,
    question: "Which of these is not an example of a possible tailgating attack?",
    options: [
      "A delivery person drops off a food order at the front door and leaves.",
      "Someone you recognize asks you to let them in.",
      "A delivery person carrying boxes asks you to hold the door.",
      "All of these are examples of tailgating attacks."
    ],
    correctAnswer: "A delivery person drops off a food order at the front door and leaves.",
    explanation: "This person is not attempting to gain unauthorized access to the building, just making a delivery and leaving."
  },
  {
    id: 30,
    question: "Which of the following email types should be reported to IT Security?",
    options: [
      "A marketing email you do not wish to receive",
      "A personal email sent to your work address by mistake",
      "An email from the mayor asking for your cell phone number",
      "An unexpected email from your supervisor requesting you to follow up on a task that you've been assigned"
    ],
    correctAnswer: "An email from the mayor asking for your cell phone number",
    explanation: "Unsolicited requests for personal information, especially from unexpected sources, should be reported as suspicious."
  },
  {
    id: 31,
    question: "Which of the following is an example of two-factor authentication?",
    options: [
      "Having unique, long, and complex passwords for every account",
      "Making sure to stop, look, and think before clicking on links",
      "Entering the password twice in order to verify it",
      "Using an OTP (one-time password) app or device"
    ],
    correctAnswer: "Using an OTP (one-time password) app or device",
    explanation: "OTP represents the 'something you have' factor in combination with your password ('something you know')."
  },
  {
    id: 32,
    question: "Which of the following is not a possible outcome of employees sharing passwords?",
    options: [
      "A hacker gains access to multiple systems within the organization because of the shared credentials.",
      "The IT team cannot identify the source of unauthorized network access because multiple individuals use the same credentials.",
      "A terminated coworker can still access organizational information because they know the common usernames and passwords.",
      "Coworkers are able to tell who made changes to a shared spreadsheet containing customer data."
    ],
    correctAnswer: "Coworkers are able to tell who made changes to a shared spreadsheet containing customer data.",
    explanation: "Shared passwords eliminate individual accountability, making it impossible to track who made specific changes."
  },
  {
    id: 33,
    question: "While working from home, you receive a phone call from your internet provider stating that there is an issue with your computer. What should you do?",
    options: [
      "Follow their instructions as they explain how to enable remote assistance.",
      "Tell this person that you need to check this out with your IT/security team before doing anything, and hang up.",
      "Explain that they have reached the wrong department and suggest they call IT.",
      "Listen carefully because you want your computer to stay secure and up to date."
    ],
    correctAnswer: "Tell this person that you need to check this out with your IT/security team before doing anything, and hang up.",
    explanation: "Internet providers don't typically call about computer issues. This is likely a social engineering attack."
  },
  {
    id: 34,
    question: "Where are cybercriminals most likely to learn information about you or your organization to make their attacks more effective?",
    options: [
      "From reading our emails",
      "From overhearing work-related conversations in a public place",
      "From press releases and news articles",
      "From social media posts"
    ],
    correctAnswer: "From social media posts",
    explanation: "Social media is a rich source of personal and organizational information that cybercriminals use for social engineering attacks."
  },
  {
    id: 35,
    question: "If you are traveling and must connect to public Wi-Fi, which is the most important precaution to take?",
    options: [
      "Only visit sites that start with 'https://'.",
      "Connect to a Virtual Private Network (VPN) to protect the data you send.",
      "Use a private or incognito browser window, and disable cookies.",
      "Use a well-known and trusted company to connect to Wi-Fi."
    ],
    correctAnswer: "Connect to a Virtual Private Network (VPN) to protect the data you send.",
    explanation: "A VPN encrypts all traffic, providing the strongest protection when using public Wi-Fi networks."
  },
  {
    id: 36,
    question: "Which of the following is an example of acting as a 'human firewall'?",
    options: [
      "Using the same strong password that you use for your bank account for your work email",
      "Logging in for a colleague who can't log in to do their work",
      "Leaving your system unlocked when you step away for a moment",
      "Using unique passwords for each system that you log into"
    ],
    correctAnswer: "Using unique passwords for each system that you log into",
    explanation: "Using unique passwords prevents credential reuse attacks and demonstrates personal cybersecurity responsibility."
  },
  {
    id: 37,
    question: "Which of the following statements is true?",
    options: [
      "Both mobile and desktop devices pose security risks.",
      "Mobile devices are more secure than desktop devices.",
      "Both mobile and desktop devices pose the same security risks.",
      "Mobile devices are less secure than desktop devices."
    ],
    correctAnswer: "Both mobile and desktop devices pose security risks.",
    explanation: "All computing devices have inherent security risks that need to be managed through proper security practices."
  },
  {
    id: 38,
    question: "You find a flash drive labeled 'Payroll' on the floor at work. What should you do?",
    options: [
      "Plug it in so you can verify who it belongs to.",
      "Try to identify the owner.",
      "Follow your organization's policy for disposing of flash drives.",
      "Hand it into Accounting or Payroll."
    ],
    correctAnswer: "Follow your organization's policy for disposing of flash drives.",
    explanation: "Unknown USB devices can contain malware. Never plug them into work computers. Follow organizational security policies."
  },
  {
    id: 39,
    question: "Which of the following is a possible outcome of accessing network resources using a shared complex password?",
    options: [
      "Network security is decreased because shared passwords are more easily guessed by hackers.",
      "Network security is increased because multiple users have to protect the password.",
      "Network security is decreased because IT can't determine who used the password.",
      "Network security is increased because the password is strong."
    ],
    correctAnswer: "Network security is decreased because IT can't determine who used the password.",
    explanation: "Shared passwords eliminate accountability and make it impossible to track individual user actions."
  },
  {
    id: 40,
    question: "Which of the following will not increase your safety while browsing the internet?",
    options: [
      "Examining a link before opening it",
      "Installing security updates as they become available",
      "Limiting the types of posts you share on social media",
      "Using websites that begin with 'http://'"
    ],
    correctAnswer: "Using websites that begin with 'http://'",
    explanation: "HTTP websites are not encrypted and are less secure than HTTPS websites. This does NOT increase safety."
  },
  {
    id: 41,
    question: "You receive an email containing a lot of internal information and an unexpected attachment. What should you do?",
    options: [
      "Reply and ask for more detail to validate its authenticity before opening the attachment.",
      "Delete the email as it might be dangerous, and warn your colleagues.",
      "Don't open the attachment, and report the email using your organization's procedure.",
      "Scan the attachment using your antivirus software first, then open it."
    ],
    correctAnswer: "Don't open the attachment, and report the email using your organization's procedure.",
    explanation: "Report suspicious emails with unexpected attachments to IT security without opening the attachment."
  },
  {
    id: 42,
    question: "You suspect that someone has tampered with your work computer. What should you do?",
    options: [
      "Disconnect the device, inform your manager immediately, and take the device to IT.",
      "File an incident report form, and examine it closely while you wait for a response.",
      "Go to the nearest computer repair store and have someone look it over.",
      "Switch it off and on again. If it works, it's probably fine."
    ],
    correctAnswer: "Disconnect the device, inform your manager immediately, and take the device to IT.",
    explanation: "Suspected compromise requires immediate isolation and professional IT investigation to prevent further damage."
  },
  {
    id: 43,
    question: "You get a text message from an executive in your organization asking for your password to a system you have access to. The message states they urgently need access for a meeting with the CEO in an hour. What is the best course of action?",
    options: [
      "Reply to the text message asking for more details to make sure it is them.",
      "Do not reply to the text. Report it immediately.",
      "Forward the message to your manager and ask them to validate it.",
      "Delete the text message and ignore it."
    ],
    correctAnswer: "Do not reply to the text. Report it immediately.",
    explanation: "This is a clear social engineering attack. Executives should never request passwords via text. Report immediately."
  },
  {
    id: 44,
    question: "Which of the following social media friend requests seems most suspicious?",
    options: [
      "A request from someone you don't recognize with no shared connections or original content",
      "A request from someone you recognize who has several common connections and a mix of original and shared content",
      "A request from someone that you recognize, but the account is new and has very little activity",
      "A request from someone you don't recognize, but they have some common connections and a mix of original and shared content"
    ],
    correctAnswer: "A request from someone you don't recognize with no shared connections or original content",
    explanation: "Complete strangers with no legitimacy indicators (connections, content) are the most suspicious."
  },
  {
    id: 45,
    question: "When is it safe to open an unexpected email attachment?",
    options: [
      "After verifying using a different communication method.",
      "When it arrives from a trusted source.",
      "When it arrives from a trusted source during normal business hours and passes an antivirus scan successfully.",
      "After it passes an antivirus scan successfully."
    ],
    correctAnswer: "After verifying using a different communication method.",
    explanation: "Always verify unexpected attachments through alternative communication channels, even from trusted sources."
  },
  {
    id: 46,
    question: "Which of the following links for Google's website would you feel least secure clicking on?",
    options: [
      "https://mail.google.com",
      "https://www.google.com/mail",
      "http://www.gmail.com",
      "https://gmail.net-login.com"
    ],
    correctAnswer: "https://gmail.net-login.com",
    explanation: "This domain tries to impersonate Gmail with 'net-login.com' which is not Google's official domain."
  },
  {
    id: 47,
    question: "You find a flash drive labeled 'Payroll' on the floor at work. What should you do?",
    options: [
      "Plug it in so you can verify who it belongs to.",
      "Try to identify the owner.",
      "Follow your organization's policy for disposing of flash drives.",
      "Hand it into Accounting or Payroll."
    ],
    correctAnswer: "Follow your organization's policy for disposing of flash drives.",
    explanation: "Unknown USB devices are a common malware delivery method. Never plug unknown devices into work computers."
  },
  {
    id: 48,
    question: "Which of the following statements is true about mobile and desktop device security?",
    options: [
      "Both mobile and desktop devices pose security risks.",
      "Mobile devices are more secure than desktop devices.",
      "Both mobile and desktop devices pose the same security risks.",
      "Mobile devices are less secure than desktop devices."
    ],
    correctAnswer: "Both mobile and desktop devices pose security risks.",
    explanation: "All computing devices have inherent security vulnerabilities that need to be managed."
  },
  {
    id: 49,
    question: "You suspect that someone has tampered with your work computer. What should you do?",
    options: [
      "Disconnect the device, inform your manager immediately, and take the device to IT.",
      "File an incident report form, and examine it closely while you wait for a response.",
      "Go to the nearest computer repair store and have someone look it over.",
      "Switch it off and on again. If it works, it's probably fine."
    ],
    correctAnswer: "Disconnect the device, inform your manager immediately, and take the device to IT.",
    explanation: "Suspected tampering requires immediate isolation and professional IT investigation."
  },
  {
    id: 50,
    question: "You get a text message from an executive asking for your password for urgent CEO meeting access. What is the best course of action?",
    options: [
      "Reply to the text message asking for more details to make sure it is them.",
      "Do not reply to the text. Report it immediately.",
      "Forward the message to your manager and ask them to validate it.",
      "Delete the text message and ignore it."
    ],
    correctAnswer: "Do not reply to the text. Report it immediately.",
    explanation: "This is a clear social engineering attack. Executives should never request passwords. Report immediately."
  }
];

// Function to shuffle array and select random questions
export const getRandomQuestions = (count: number = 15): Question[] => {
  const shuffled = [...securityQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};