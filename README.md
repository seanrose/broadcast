broadcast
=========
## Before you get started

You'll need to add a `settings.json` file at the root:

	{
		"BOX_VIEW_API_KEY": "API key for Box View",
		"kadira": {
    			"appId": "Kadira App ID",
    			"appSecret": "Kadira App Secret"
    		},
		"public": {
	    	"googleAnalytics": {
	            "id": "Google analytics tracking ID",
	            "host": "host of your app (e.g. for me it's broadcast.meteor.com)"
	        },
	    	"filePickerKey": "API key for filepicker.io"
	  	}
	}
	
## Signup Links (all of these are free)
- Box View API key: http://box.com/developer_signup
- Kadira: https://ui.kadira.io/sign-up?plan=free
- Google Analytics: https://www.google.com/analytics/
- Filepicker: https://developers.inkfilepicker.com/register/

## Running the App

From the root of the project, after configuring `settings.json`, run this command:

	meteor --settings settings.json

## For More Info About Meteor

http://docs.meteor.com/
