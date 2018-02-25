This module logs to the console, a list of people who are within 100km of a central point. For the
sake of demonstration, the central point has been hard coded to be in Berlin. The function reads
from a text file which has each line formatted as a separate JSON object. Distance is determined
by latitude and longitude of the person compared to the central point.

# Setup
1. Run `npm i`
2. Run `npm run test` for test functionality
3. Run printNearbyCustomers.js in node with the text file as the second argument like so:
`node printNearbyCustomers.js gestfile1.txt`
