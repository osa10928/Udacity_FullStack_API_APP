# Neighborhood Map App
This repo features an application designed to show specific locations of a neighborhood using the Google Maps API. The locations in the neighbohood are pre-selected and are marked by Google Maps Markers. Additionally the app features a filter section that allows for the filtering of the map locations, and InfoWindows which open when a location on the map is selected. Download the repo and follow subsequent instructions in order to see an example.

### Details About App
This application uses the jQuery library to perform ajax calls related to information in the Info window and the Knockout.js framework to handle all DOM manipulations. This app utilizes npm as a package manager so getting up and running takes only a couple of steps.  

## Specifications
Use npm to install the package.json dependencies.
`npm >= 5.5.1`

## Setup
1. Clone/download the repository.
2. Navigate to the repository directory on your command line interface.
3. Install the dependencies by running `npm install`
4. Create a bundle.js file by running `webpack`
5. Serve app to your browser by running `npm run dev`
6. Open browser and navigate to localhost:8080

The application should now render on your browser. If not a helpful troubleshooting instructions should display otherwise.

## Application Goals
The goals of this applications were threefold:
1. Become comfortable with making ajax request
2. Become comfortable with handling ajax return especially error handling
3. Introduce myself to and utilyze the knockout framework


## Special Thanks
Special thanks to the team at Udacity for providing extremely beneficial instruction and guidance. Thank you to Google for providing such useful API's and documentation. Thanks to the team at Knockout.js for providing yet another framework for me to gain experience from.
