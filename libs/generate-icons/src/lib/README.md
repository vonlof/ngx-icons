# Generate icons

In your project create a separate typescript library, so it is easy to share the icons of the whole (nx) project.
When the devkit is installed, go to the `project.json` of the newly created lib. Create a new nx target as follow:

```
....
"generate-icons": {
  "executor": "nx:run-commands",
  "options": {

    // Direct command
    "commands": ["vonlof generate-icons --src=libs/icons/src/lib/svg --output=libs/icons/src/lib/generated --generate-files=true"],

    // or with a config file
    "commands": ["vonlof generate-icons --src=libs/icons/iconrc.json"],
    "parallel": false
  }
},
....
```

In this case add a source folder `libs/icons/src/lib/svg` and a some icons. Then simply run the command, all the typescript files are now generated.
