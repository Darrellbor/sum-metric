### Sum Metric Service
## Problem 
Build a lightweight metric logging and reporting service that sums metrics by time window for the most recent hour. 

## Solution Approach
* Implemented a singly linked list as the choice data structure to store the data
* Utilized node-storage to persist data for each call to the api
* Removes any node passed an hour
* Returns sum of metric values within the hour

## How To Run
* Run ``` npm install ``` to install all packages and dependencies
* Run ``` npm start ``` to run the server locally.

