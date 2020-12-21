### Speakthenews

------------
Text-to-speech tool for a few of my favourite news sites ([nytimes](https://www.nytimes.com "nytimes"), [washington post](https://www.washingtonpost.com "washington post"), [politico](https://www.politico.com "politico"), and [the economist](https://www.economist.com "the economist")). 

Create playlists containing news urls you want to listen to, use controls to move forward and backwards in the narration(controls are only supported in chrome for web).

The backend is written in flask-restful and is available [here](https://github.com/olamileke/speakthenews-be "here"). 

View the live application [here](https://speakthenews.netlify.app "here").

To run this application locally, you must have node installed. Get that [here](https://nodejs.org "here"). 

Next up, navigate into the directory of your choice on your system and clone this repository by running

```
git clone https://github.com/olamileke/speakthenews-fe.git
```

When cloning is complete, navigate into the application directory by running

```
cd speakthenews-fe
```

At this point, we need to install all the packages needed by the app to run. Do this by running

```
npm install
```

This will install all the packages defined in the package.json file in the application root.

Navigate to the src/app/services directory and set the baseUrl option in api.js on line 7 to http://localhost:5000/ or whatever url the cloned backend is running on. Alternatively, you can leave it as it is so that it continues to point to the url of the deployed backend *https://speakthenews.herokuapp.com/api/v1/*.

Still in the terminal, run

```
npm start
```
When the application is done compiling, access it at localhost:3000.



