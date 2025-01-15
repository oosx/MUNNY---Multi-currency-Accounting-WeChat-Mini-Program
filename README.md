# Munny - Cloud-based Expense Tracker

A WeChat Mini Program for expense tracking built with WeChat Cloud Development platform.

## Features

- 📝 Quick expense recording
- 📊 Income/Expense statistics
- 📅 Bill management
- ☁️ Cloud data synchronization

## Cloud Development Features

This project utilizes WeChat Cloud Development's three core capabilities:

- **Database**: A JSON document database that can be operated from both the Mini Program frontend and cloud functions
- **File Storage**: Direct upload/download of cloud files from the Mini Program frontend
- **Cloud Functions**: Server-side code running in the cloud with WeChat's built-in authentication

## Getting Started

### Prerequisites

- WeChat Developer Tools
- Node.js (v12.0.0 or above)
- WeChat Cloud Development Environment

### Setup

1. Clone the repository
   /bash
   /git clone https://github.com/oosx/MUNNY---Multi-currency-Accounting-WeChat-Mini-Program.git
   /cd your-repo-name

2. Import project in WeChat Developer Tools

3. Configure the project

   - Copy `project.config.example.json` to `project.config.json`
   - Update `appid` in `project.config.json` with your Mini Program AppID
   - Copy `config.example.js` to `config.js`
   - Fill in your cloud environment ID in `config.js`

4. Cloud Development Setup
   - Enable Cloud Development in WeChat Developer Tools

## Project Structure

miniprogram/
├── pages/ # Page files
│ ├── record/ # Recording page
│ ├── statistics/ # Statistics page
│ └── bills/ # Bills page
├── images/ # Image resources
├── style/ # Style files
└── utils/ # Utility function

## Development Notes

- Built with WeChat Mini Program Cloud Development
- Follows ES6+ standards
- Uses Promises for asynchronous operations

## Important Notes

- Do not commit `project.config.json` and `project.private.config.json`
- Keep sensitive information (cloud environment ID, AppID) secure
- Regular cloud data backup recommended

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
