# Neighborhood Map App
This repo features an application designed to show specific locations of a neighborhood using the Google Maps API. The locations in the neighbohood are pre-selected and are marked by Google Maps Markers. Additionally the app features a filter section that allows for the filtering of the map locations, and InfoWindows which open when a location on the map is selected. Download the repo and follow subsequent instructions in order to see an example.

### Utilities and Environment
This application uses the jQuery library to perform ajax calls related to information in the Infowindow and the Knockout.js framework to handle all DOM manipulations. To manage these dependencies the app uses npm as a package manager and webpack as a module bundler. To ensure a clean workspace/environment this repo also ships with a Vagrant file so this app can easily run on a Virtual Machine (recommended).

## Specifications
Use node and npm to install the package.json dependencies.
`node >= 8.9.3`
`npm >= 5.5.1`

## Setup
### VM/Vagrant Instructions
1. Clone/download the repository.
2. cd into the repository and run `vagrant up` to launch a new Virtual Machine
3. cd into the shared folder by running `cd /vagrant`
4. Run 'npm install' to install application dependencies into node_modules directory.
5. Run 'npm run build' to build bundle.js file
6. Run 'npm run dev' to serve application to localhost:8080. Navigate to localhost:8080 on your browser.

### Local Computer Instructions
1. Clone/download the repository.
2. cd into the repository. If you don't already have node and npm installed globally, install them now.
3. Run 'npm install' to install application dependencies into node_modules directory.
4. Run 'npm run build' to build bundle.js file
5. Run 'npm run dev' to serve application to localhost:8080. Navigate to localhost:8080 on your browser.

The application should now render on your browser. If not a helpful troubleshooting instructions should display otherwise.

## Application Goals
The goals of this applications were threefold:
1. Become comfortable with making ajax request
2. Become comfortable with handling ajax return especially error handling
3. Introduce myself to and utilyze the knockout framework


## Special Thanks
Special thanks to the team at Udacity for providing extremely beneficial instruction and guidance. Thank you to Google for providing such useful API's and documentation. Thanks to the team at Knockout.js for providing yet another framework for me to gain experience from.
